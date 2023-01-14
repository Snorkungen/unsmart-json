import { DELIMETER } from "./constants";

export type TTransformer<T = unknown> = {
    test: (val: unknown) => boolean;
    serialize: (val: T) => string;
    deserialize: (val: ReturnType<TTransformer["serialize"]>) => T;
}

export const transformers: Record<string, TTransformer<any>> = {};

export function createTransformer<T>(name: string, transformer: TTransformer<T>) {
    return transformers[name] = transformer;
}

/*
    Below only create transformers
*/

createTransformer<Date>("date", {
    test(val) {
        return val instanceof Date;
    },
    serialize(val) {
        return val.toString();
    },
    deserialize(val) {
        return new Date(val);
    },
});

createTransformer<RegExp>("regex", {
    test(val) {
        return val instanceof RegExp;
    },
    serialize(val) {
        return (val as RegExp).source + DELIMETER + (val as RegExp).flags;
    },
    deserialize(val) {
        let [source, flags] = val.split(DELIMETER);
        return new RegExp(source, flags);
    },
});

createTransformer<Map<any,any>>("map",{
    test(val) {
        return val instanceof Map;
    },
    serialize(val) {
        return JSON.stringify([...val.entries()])
    },
    deserialize(val) {
        return new Map(JSON.parse(val));
    },
})
