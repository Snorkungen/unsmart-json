import UNSMART_JSON from "../src/index"

const OBJECT_WITH_DATE = {
    date_first: new Date("2023-01-15T12:08:46.000Z"),
    date_second: new Date(1673784998944),

    // Wait untill is merged <https://github.com/facebook/jest/pull/13494>
    // date_Invalid : new Date(NaN),
};

const OBJECT_WITH_REGEX = {
    first: new RegExp("a+", "i"),
    second: /^[0-9()-]+$/,
    third: /^\S+@\S+\.\S+$/ig
};

const map1 = new Map();
map1.set('a', 1);
map1.set('b', 2);
map1.set('c', 3);

const OBJECT_WITH_MAP = {
    map1
}

describe("Test default transformers", () => {
    let stringified_date = UNSMART_JSON.stringify(OBJECT_WITH_DATE);
    let parsed_date = UNSMART_JSON.parse(stringified_date);

    test("Works with Date", () => {
        expect(parsed_date).toEqual(OBJECT_WITH_DATE)
    });

    test("Works with Regex", () => {
        expect(UNSMART_JSON.parse(
            UNSMART_JSON.stringify(OBJECT_WITH_REGEX)
        )).toEqual(OBJECT_WITH_REGEX)
    });
    
    test("Works with Map", () => {
        expect(UNSMART_JSON.parse(
            UNSMART_JSON.stringify(OBJECT_WITH_MAP)
        )).toEqual(OBJECT_WITH_MAP)
    });
})