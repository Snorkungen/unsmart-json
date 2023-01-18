import UNSMART_JSON from "../src/index"
import type { TTransformer } from "../src/transformer";

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
set2.add('some text') // Set(3) { 1, 5, 'some text' }
const o = { a: 1, b: 2 }
set2.add(o)

const OBJECT_WITH_SET = {
    set1: new Set(),
    set2
}

describe("Test default transformers", () => {
    test("Works with Date", () => {
        expect(UNSMART_JSON.parse(
            UNSMART_JSON.stringify(OBJECT_WITH_DATE)
        )).toStrictEqual(OBJECT_WITH_DATE)
    });

    test("Works with Regex", () => {
        expect(UNSMART_JSON.parse(
            UNSMART_JSON.stringify(OBJECT_WITH_REGEX)
        )).toStrictEqual(OBJECT_WITH_REGEX)
    });

    test("Works with Map", () => {
        expect(UNSMART_JSON.parse(
            UNSMART_JSON.stringify(OBJECT_WITH_MAP)
        )).toStrictEqual(OBJECT_WITH_MAP)
    });

    test("Works with URL", () => {
        expect(UNSMART_JSON.parse(
            UNSMART_JSON.stringify(OBJECT_WITH_URL)
        )).toStrictEqual(OBJECT_WITH_URL)
    });

    test("Works with Set", () => {
        expect(UNSMART_JSON.parse(
            UNSMART_JSON.stringify(OBJECT_WITH_SET)
        )).toStrictEqual(OBJECT_WITH_SET)
    });
})

describe("Test createTransformer", () => {
    const { createTransformer, transformers } = UNSMART_JSON;
    const TRANSFORMER_NAME = "test-name-for-transformer";

    class TransformMe {
        constructor(public first: string, public last: string) { }

        get name() {
            return this.first + " " + this.last;
        }
    }

    const TEST_DATA = {
        hello: "world",
        tt: new TransformMe("jj","kk")
    }

    const transformer: TTransformer<TransformMe, string> = {
        test: (val) => val instanceof TransformMe,
        serialize: (val) => val.name,
        deserialize: (val) => new TransformMe(val.split(" ")[0], val.split(" ")[1])
    };

    // Add transformer to transformers
    createTransformer(TRANSFORMER_NAME, transformer);

    test("created transformer gets added with transformers", () => {
        expect(transformers[TRANSFORMER_NAME]).toBe(transformer);
    });

    test("Transformer transforms data", () => {
        expect(UNSMART_JSON.parse(
            UNSMART_JSON.stringify(TEST_DATA)
        )).toStrictEqual(TEST_DATA);
    });
})
