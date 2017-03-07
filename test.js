"use strict"

const assert = require("power-assert");
const jsonLength = require("./index.js");

it("length of string", function(){
    const json = "this is a node module."

    const len0 = jsonLength(json);
    const len1 = JSON.stringify(json).length;

    assert.equal(len0, len1);
});

it("length of number", function(){
    const json = Math.PI

    const len0 = jsonLength(json);
    const len1 = JSON.stringify(json).length;

    assert.equal(len0, len1);
});

it("length of date", function(){
    const json = new Date(0)

    const len0 = jsonLength(json);
    const len1 = JSON.stringify(json).length;

    assert.equal(len0, len1);
});

it("length of undefined", function(){
    const json = void 0;

    const len0 = jsonLength(json);
    const len1 = 0;

    assert.equal(len0, len1);
});

it("length of null", function(){
    const json = null;

    const len0 = jsonLength(json);
    const len1 = JSON.stringify(json).length;

    assert.equal(len0, len1);
});

it("length of ArrayBuffer", function(){
    const json = new ArrayBuffer();

    const len0 = jsonLength(json);
    const len1 = JSON.stringify(json).length;

    assert.equal(len0, len1);
});

it("length of array", function(){
    const json = [1,"one", new Date(), undefined, null];

    const len0 = jsonLength(json);
    const len1 = JSON.stringify(json).length;

    assert.equal(len0, len1);
});

it("length of Set", function(){
    const json = new Set();
    json.add("abc");
    json.add(1);

    const len0 = jsonLength(json);
    const len1 = JSON.stringify(json).length;

    assert.equal(len0, len1);
});

it("length of Map", function(){
    const json = new Map();
    json.set("key1", "abc");
    json.set("key2", 123);

    const len0 = jsonLength(json);
    const len1 = JSON.stringify(json).length;

    assert.equal(len0, len1);
});


it("length of JSON #1", function(){
    const json = {
        aaa: "abcdefg",
        bbb: "hijklmn",
        ccc: Math.PI,
        ddd: 0,
        eee: new Date(),
        fff: [],
        ggg: [1,2,3],
        hhh: undefined
    };
    const len0 = jsonLength(json);
    const len1 = JSON.stringify(json).length;

    assert.equal(len0, len1);
});

it("length of JSON #2", function(){
    const json = {
        aaa: "abcdefg",
        bbb: "hijklmn",
        ccc: {
            ddd: "qwerty",
            eee: "asdfgh",
            fff: {
                ggg: "zxcvbn"
            }
        }
    };
    const len0 = jsonLength(json);
    const len1 = JSON.stringify(json).length;

    assert.equal(len0, len1);
});

it("length of circular structure #1", function(){
    const json = {
        aaa: "abcdefg",
        bbb: "hijklmn",
        self: null
    };
    json.self = json;

    try{
        jsonLength(json);
        assert.fail()
    }catch(error){
        assert.ok(String(error).indexOf("circular structure") >= 0, String(error));
    }
});


it("length of circular structure #2", function(){
    const json = [0, 1];
    json[0] = json;

    try{
        jsonLength(json);
        assert.fail()
    }catch(error){
        assert.ok(String(error).indexOf("circular structure") >= 0, String(error));
    }
});