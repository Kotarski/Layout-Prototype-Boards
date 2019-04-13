import { group } from "../../svg/element/+group"
export type participant = {
   getState: () => {};
   group?: group;
}

export type development<C extends participant> = {
   participant: C,
   state: Partial<ReturnType<C["getState"]>>
}

export type event = development<participant>[];

export type historystate = {
   events: development<participant>[][];
   currentIdx: number;
   lastIdx: number;
}
