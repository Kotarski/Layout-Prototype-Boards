import { Pipe } from "ts-functionaltypes";

const pipe: Pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

export default pipe;

