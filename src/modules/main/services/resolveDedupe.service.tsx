import {DedupeModel} from "../../results/models/dedupe.model";

export function resolveDedupe(dedupe:DedupeModel):Promise<DedupeModel>{
    console.log('resolving dedupe')
    return Promise.resolve(dedupe);
}