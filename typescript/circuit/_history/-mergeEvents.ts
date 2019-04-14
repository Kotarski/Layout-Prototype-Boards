import { historystate, event } from "./types";
export default function mergeEvents(state: historystate, mergeCount: number): historystate {
   const mergeStartIdx = Math.max(0, state.lastIdx - mergeCount);
   const eventsToMerge = state.events.slice(mergeStartIdx);
   const previousEvents = state.events.slice(0, mergeStartIdx);

   const mergedEvent: event = [];
   eventsToMerge.forEach(event => {
      event.forEach(dev => {
         if (!mergedEvent.some(mDev => mDev.participant === dev.participant)) {
            mergedEvent.push(dev);
         }
      })
   });

   const events = [...previousEvents, mergedEvent]
   const lastIdx = mergeStartIdx;
   const currentIdx = (state.currentIdx > lastIdx)
      ? lastIdx
      : state.currentIdx;

   return { events, currentIdx, lastIdx }
}

