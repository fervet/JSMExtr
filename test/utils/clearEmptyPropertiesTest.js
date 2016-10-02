const expect = require("chai").expect;

const clearEmptyProperties = require("../../src/utils/clearEmptyProperties");


function assertClear(name, input, expected) {
    it(name, function () {
        let r = clearEmptyProperties(input);
        expect(r).to.deep.equal(expected);
    });
}

//noinspection JSUnusedLocalSymbols
function xassertClear() {}

describe("clearEmptyProperties", function () {

    assertClear(
        "simple",
        {
            jr: 1,
            ddd: undefined,
            x: [undefined, 1, null, 2, {}]
        },
        {jr: 1, x: [1, 2]}
    );

    assertClear(
        "nested",
        {
            jr: 1,
            ddd: {eee: undefined}
        },
        {jr: 1}
    );

    assertClear(
        "2-level nested",
        {
            jr: 1,
            ddd: {eee: {fff: undefined}}
        },
        {jr: 1}
    );

    assertClear(
        "array more",
        {
            jr: 1,
            ddd: undefined,
            x: [1, 2, {aaa: undefined}]
        },
        {jr: 1, x: [1, 2]}
    );

    assertClear(
        "full",
        {
            jr: 1,
            ddd: undefined,
            x: [undefined, {ddd: {eee: {fff: undefined}}, www: [[[[{}],{}],{}],{zzz: [1]},undefined, null]}]
        },
        {jr: 1, x: [{www: [{zzz: [1]}]}]}
    );

    class Stuff {}

    assertClear(
        "class",
        {z: 1, cls: new Stuff()},
        {z: 1}
    );

});