import { Compose } from "ts-functionaltypes";

const compose: Compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

export default compose;

