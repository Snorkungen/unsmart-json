import { DELIMETER } from "./constants";

export type TTransformer<T = unknown, S = unknown> = {
    test: (val: unknown) => boolean;
    serialize: (val: T) => S;
    deserialize: (val: ReturnType<TTransformer<T, S>["serialize"]>) => T;
}

export const transformers: Record<string, TTransformer<any, any>> = {};

export function createTransformer<T, S = string>(name: string, transformer: TTransformer<T, S>) {
    return transformers[name] = transformer;
}

/*
    Below only create transformers
*/

createTransformer<Date, number>("date", {
    test(val) {
        return val instanceof Date;
    },
    serialize(val) {
        return val.getTime();
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

createTransformer<Map<any, any>, any[]>("map", {
    test(val) {
        return val instanceof Map;
    },
    serialize(val) {
        return [...val.entries()]
    },
    deserialize(val) {
        return new Map(val);
    },
})
