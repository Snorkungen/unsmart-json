import UNSMART_JSON from "../src/index"

const data = {
    array: [
        "Hello",
        "World"
    ],
    number: 190,
    numberWrapper: {
        num: 32
    },
    string: "Hello World"
}

describe("Test basic function", () => {
    let stringified = UNSMART_JSON.stringify(data);
    let parsed = UNSMART_JSON.parse(stringified);

    test("Stringify returns string.", () => {
        expect(typeof stringified).toBe("string");
    });

    test("Stringify returns valid json.", () => {
        expect(typeof JSON.parse(stringified)).toBe("object");
    });


    test("Parse return the same as input data", () => {
        expect(parsed).toEqual(data)
    })
})