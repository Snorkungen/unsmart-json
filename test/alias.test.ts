import alias, { createShortKey } from "../src/alias";
import { DEFAULT_CHAR_CODE } from "../src/constants";

describe("ShortKey", () => {
    test("Test 1", () => {
        expect(createShortKey(65, 45)).toBe("A");
    })
    test("Test 2", () => {
        expect(createShortKey(126, 45)).toBe("~-");
    })
})

describe("Alias json", () => {
    // if createShortKey does not work then theese won't work
    let relative_shortKeys = Array.from({ length: 10 }).fill(0).map((_, i) => createShortKey(DEFAULT_CHAR_CODE + i, DEFAULT_CHAR_CODE));

    test("Test 1", () => {
        let data = {
            array: [
                { longNameKey: "1", otherLongNameKey: 0 },
                { longNameKey: "2", otherLongNameKey: 1 },
                { longNameKey: "3", otherLongNameKey: 2 },
            ]
        }, aliased = alias(data);
        let expexted = [{
            array: [
                { [relative_shortKeys[0]]: "1", [relative_shortKeys[1]]: 0 },
                { [relative_shortKeys[0]]: "2", [relative_shortKeys[1]]: 1 },
                { [relative_shortKeys[0]]: "3", [relative_shortKeys[1]]: 2 },
            ],
        }, DEFAULT_CHAR_CODE, "longNameKey", "otherLongNameKey"];

        expect(aliased).toStrictEqual(expexted);
    });

    test("Test 2", () => {
        let data = {
            array: [
                {
                    longNameKey: "1", otherLongNameKey: 0, longNameContainingArray: [
                        [
                            { crazyLongName: "1" },
                            { crazyLongName: "2" },
                            { crazyLongName: "3" },
                        ]
                    ]
                },
                {
                    longNameKey: "1", otherLongNameKey: 0, longNameContainingArray: [
                        [
                            { crazyLongName: "1" },
                            { crazyLongName: "2" },
                            { crazyLongName: "3" },
                        ]
                    ]
                },
                {
                    longNameKey: "1", otherLongNameKey: 0, longNameContainingArray: [
                        [
                            { crazyLongName: "1" },
                            { crazyLongName: "2" },
                            { crazyLongName: "3" },
                        ]
                    ]
                }
            ]
        }, aliased = alias(data);
        let expexted = [{
            array: [
                {
                    [relative_shortKeys[0]]: "1", [relative_shortKeys[1]]: 0, [relative_shortKeys[2]]: [
                        [
                            { [relative_shortKeys[3]]: "1" },
                            { [relative_shortKeys[3]]: "2" },
                            { [relative_shortKeys[3]]: "3" },
                        ]
                    ]
                },
                {
                    [relative_shortKeys[0]]: "1", [relative_shortKeys[1]]: 0, [relative_shortKeys[2]]: [
                        [
                            { [relative_shortKeys[3]]: "1" },
                            { [relative_shortKeys[3]]: "2" },
                            { [relative_shortKeys[3]]: "3" },
                        ]
                    ]
                },
                {
                    [relative_shortKeys[0]]: "1", [relative_shortKeys[1]]: 0, [relative_shortKeys[2]]: [
                        [
                            { [relative_shortKeys[3]]: "1" },
                            { [relative_shortKeys[3]]: "2" },
                            { [relative_shortKeys[3]]: "3" },
                        ]
                    ]
                },
            ]
        }, DEFAULT_CHAR_CODE, "longNameKey", "otherLongNameKey", "longNameContainingArray", "crazyLongName"];

        expect(aliased).toStrictEqual(expexted);
    })
})