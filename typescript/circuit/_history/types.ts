import { group } from "../../svg/element/+group"
export type participant = {
   states: {};
   flags:{};
   group?: group;
}

export type development<C extends participant> = {
   participant: C,
   states: Partial<C["states"]>,
   flags: Partial<C["flags"]>
}

export type event = development<participant>[];

export type historystate = {
   events: development<participant>[][];
   currentIdx: number;
   lastIdx: number;
}
