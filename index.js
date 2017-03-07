"use strict"

function __jsonLength(json, visited){
    if(typeof json === "undefined"){
        return 0;
    }else if(json === null){
        return 4; // null
    }else if(typeof json === "number"){
        return String(json).length;
    }else if(typeof json === "string" || json instanceof String){
        return json.length + 2;
    }else if(json instanceof Date){
        return json.toISOString().length + 2;
    }else if(json instanceof RegExp){
        return 0;
    }else if(typeof json === "function"){
        return 0;
    }else if(typeof json === "array" || Array.isArray(json)){
        if(visited.length && visited.indexOf(json) >= 0){
            throw new Error("Counting text length of JSON of circular structure");
        }

        visited.push(json);
        let sum = 0;
        const count = json.length;
        for(let i=0 ; i<count ; i++){
            const element = json[i];
            const length = __jsonLength(element, visited);
            // console.log(length, element)
            if(length > 0){
                sum += length + 1; // add comma
            }else{
                sum += 5 // null,
            }
        }

        if(count > 1){
            return sum + 1; // [ ... ] with removing trailing comma
        }else{
            return sum + 2; // [ ... ]
        }
        
    }else if(typeof json === "object"){
        if(visited.length && visited.indexOf(json) >= 0){
            throw new Error("Counting text length of JSON of circular structure");
        }

        visited.push(json);
        let sum = 0;
        let count = 0;
        const keys = Object.keys(json);
        for(let i=0 ; i<keys.length ; i++){
            const key = keys[i];
            const length = __jsonLength(json[key], visited);
            // console.log(length, key , property)
            if(length > 0){
                count++;
                sum += key.length + length + 4; // "..": ...,
            }
        };
        
        if(count > 0){
            return sum + 1; // { ... } with removing trailing comma
        }else{
            return sum + 2; // { ... }
        }
        
    }else{
        console.log("error does not match any type ", json);
        return 0;
    }
}

function jsonLength(json){
    // const visited = new Set();
    return __jsonLength(json, []);
}

module.exports = jsonLength;