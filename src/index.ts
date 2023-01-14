import desolve from "./desolve";
import resolve from "./resolve";
import { createTransformer, transformers } from "./transformer";

export const UNSMART_JSON = {
    desolve,
    resolve,
    stringify : (input : unknown) => {
        return JSON.stringify(desolve(input));
    },
    parse : (stringified: string) => {
        return resolve(JSON.parse(stringified));
    },
    createTransformer,
    transformers
}

export {
    desolve,
    resolve,
    createTransformer,
    transformers,    
}

export * from "./constants";