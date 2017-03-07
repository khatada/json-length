"use strict"

const jsonLength = require("./index.js");

const LOOP = 100000;

function longText(){
    let text = "";
    for(let j=0; j<2000; j++){
        text += Math.random().toString(36).substr(-5);
    }
    return text;
}


const now = new Date();
const text = longText();

function create(){
    const json = {
        aaa: "abcdefg",
        bbb: now,
        ccc: {
            ddd: [1,2,3,4,5,6,7,8,9,0],
            eee: "asdfgh",
            fff: {
                ggg: "zxcvbn"
            }
        },
        long: text
    };
    return json;
}

console.time("JSON.stringify().length");
for(let i=0 ; i<LOOP;i++){
    const json = create();
    const length = JSON.stringify(json).length;
}
console.timeEnd("JSON.stringify().length");

console.time("jsonLength");
for(let i=0 ; i<LOOP;i++){
    const json = create();
    const length = jsonLength(json)
}
console.timeEnd("jsonLength");


