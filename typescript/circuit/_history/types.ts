export type participant = {
   getState: () => {};
   group?: Svg.Element.Group.type;
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
