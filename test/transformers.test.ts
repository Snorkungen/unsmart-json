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
    map: new Map(),
    map11: map1
};

const OBJECT_WITH_URL = {
    u1: new URL("https://google.com/"),
    u2: new URL("ftp://example.com/"),
    u3: new URL("/foo/bar/index.html", "https://example.com")
}

let set2 = new Set();
set2.add(1)           // Set(1) { 1 }
set2.add(5)           // Set(2) { 1, 5 }
set2.add(5)           // Set(2) { 1, 5 }
set2.add('some text') // Set(3) { 1, 5, 'some text' }
const o = { a: 1, b: 2 }
set2.add(o)

const OBJECT_WITH_SET = {
    set1: new Set(),
    set2
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

    test("Works with URL", () => {
        expect(UNSMART_JSON.parse(
            UNSMART_JSON.stringify(OBJECT_WITH_URL)
        )).toEqual(OBJECT_WITH_URL)
    });

    test("Works with Set", () => {
        expect(UNSMART_JSON.parse(
            UNSMART_JSON.stringify(OBJECT_WITH_SET)
        )).toEqual(OBJECT_WITH_SET)
    });
})