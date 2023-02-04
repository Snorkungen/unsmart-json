import { TAliased } from "./alias";
import { DEFAULT_CHAR_CODE, MAX_CHAR_CODE } from "./constants";
import { Ijson } from "./desolve";

export function getCharCode(chars: string, startCharCode = DEFAULT_CHAR_CODE): number {
    if (chars.length === 1) return chars.charCodeAt(0);

    let val = 0;
    for (let char of chars) {
        val += char.charCodeAt(0);
    }
    return val - startCharCode;
}

export default function dealias([data, startCharCode, ...keys]: TAliased, isArray = Array.isArray(data)): Ijson {
    let json: Ijson = Array.isArray(data) ? [] as unknown as Ijson : {};

    for (let key in data) {
        let val = data[key];

        if (isArray && !Array.isArray(data)) {
            let charCode = getCharCode(key, startCharCode), keyIndex = charCode - startCharCode;
            let dealiasedkey = keys[keyIndex];

            if (!dealiasedkey) {
                throw new Error("Invalid data");
            }

            key = dealiasedkey;
        }

        if (!(val instanceof Object)) {
            json[key] = val;
            continue;
        };

        let dealiasedData = dealias([val, startCharCode, ...keys], Array.isArray(data));

        json[key] = dealiasedData;
    }

    return json;
}