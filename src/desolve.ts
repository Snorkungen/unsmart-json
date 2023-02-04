import { DELIMETER } from "./constants";
import count from "./count";
import { transformers } from "./transformer";

export type TDesolve = typeof desolve;
export type TDesolved = ReturnType<TDesolve>;

export interface Ijson {
    [key: string | number]: string | Ijson;
}

export default function desolve(input: unknown): {
    json: Ijson;
    data: Record<string, any>;
} {
    let json: Ijson = Array.isArray(input) ? [] as unknown as Ijson : {};
    let data: Record<string, any> = {};

    /* 
        Fix this to handle different inputs
    */

    if (!(input instanceof Object)) {
        throw new Error("Invalid Input")
    }

    for (let key in input) {
        let val: unknown = (input as any)[key];

        // intercept with custom transformers

        for (let transformerKey in transformers) {
            const { test, serialize } = transformers[transformerKey];
            if (!test(val)) continue;

            let dataKey = transformerKey + DELIMETER + count.state;

            json[key] = dataKey;
            data[dataKey] = serialize(val);

            break;
        }

        // if previous did something skip
        if (json[key]) continue;

        if (val instanceof Object) {
            let desolved = desolve(val);

            json[key] = desolved.json;
            data = {
                ...data,
                ...desolved.data
            }
        } else {
            let dataKey = count.state.toString();

            json[key] = dataKey;
            data[dataKey] = val;
        }
    }


    return {
        json,
        data
    }
};