### json-length

Calculate length of stringified json without `JSON.stringify`.

``` javascript
const jsonLength = require("json-length");

const json = { ... };
const length = jsonLength(json);

// result of `jsonLength(json)` is equal to `JSON.stringify(json).length`
const jsonStringifyLength = JSON.stringify(json).length;
if(length === jsonStringifyLength){
    console.log("jsonLength(json) === JSON.stringify(json).length");
}
```