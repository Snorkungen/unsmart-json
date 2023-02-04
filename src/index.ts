import desolve from "./desolve";
import resolve from "./resolve";
import { createTransformer, transformers } from "./transformer";

import alias from "./alias";
import dealias from "./dealias";

export const UNSMART_JSON = {
    desolve,
    resolve,
    stringify: (input: unknown) => {
        return JSON.stringify(desolve(input));
    },
    parse: (stringified: string) => {
        return resolve(JSON.parse(stringified));
    },
    createTransformer,
    transformers,
    
    alias,
    dealias
}

export {
    desolve,
    resolve,
    createTransformer,
    transformers,

    alias,
    dealias
}

export * from "./constants";
export default UNSMART_JSON;