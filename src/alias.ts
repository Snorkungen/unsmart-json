import { DEFAULT_CHAR_CODE, MAX_CHAR_CODE } from "./constants";
import { Ijson } from "./desolve";

export type TAliased = [Ijson, number, ...string[]];

export const createShortKey = (charCode: number, charCodeStart = DEFAULT_CHAR_CODE): string => {
    let len = Math.ceil(charCode / MAX_CHAR_CODE + 0.00000000001);
    let shortKey = "";

    while (shortKey.length < len) {
        // Who cares about efficiency
        if (charCode > MAX_CHAR_CODE) {
            charCode = charCodeStart;
            continue
        }

        shortKey += String.fromCharCode(charCode);
        charCode++;
    }

    return shortKey;
}

export default function alias(input: unknown,
    startCharCode = DEFAULT_CHAR_CODE,
    charCode = startCharCode,
    keys: Array<string> = [],
    isArray = Array.isArray(input)
): TAliased {
    let json: Ijson = Array.isArray(input) ? [] as unknown as Ijson : {};

    if (!(input instanceof Object)) {
        throw new Error("Invalid Input")
    }

    for (let key in input) {
        let val = input[key as keyof typeof input] as any;

        if (isArray && !Array.isArray(input)) {
            let keyIndex = keys.indexOf(key);
            if (keyIndex === -1) {
                keys.push(key);
                key = createShortKey(charCode);
                charCode++;
            } else {
                key = createShortKey(startCharCode + keyIndex);
            }
        }

        if (!(val instanceof Object)) {
            json[key] = val;
            continue;
        };

        let [data, newCharCode, ...newKeys] = alias(val, startCharCode, charCode, keys, Array.isArray(input));

        json[key] = data;
        charCode = newCharCode;
        keys = newKeys;
    }

    return [json, startCharCode, ...keys];
}