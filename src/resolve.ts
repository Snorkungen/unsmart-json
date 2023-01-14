import { DELIMETER } from "./constants";
import { TDesolved } from "./desolve";
import { TTransformer, transformers } from "./transformer";

export default function resolve(input: TDesolved) {
    const { json, data } = input
    let resolved: Record<string | number, any> = Array.isArray(json) ? [] : {};

    for (let key in json) {
        let val = json[key] as {} | string;

        if (val instanceof Object) {
            resolved[key] = resolve({ json: val, data });
            continue;
        };

        let split = val.split(DELIMETER)
        let transformer: TTransformer | undefined;

        if (split.length > 1) {
            transformer = transformers[split[0]]
        }

        if (transformer) {
            resolved[key] = transformer.deserialize(data[val])
        } else {
            resolved[key] = data[val]
        }

    }

    return resolved;
}