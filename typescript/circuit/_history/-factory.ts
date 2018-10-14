import init from "./-init";
import addEvent from "./-addEvent";
import undoEvent from "./-undoEvent";
import redoEvent from "./-redoEvent";
import mergeEvents from "./-mergeEvents";
import { historystate, participant } from "./types";

export default function factory(...initialParticipants: participant[]) {
   let state = init(...initialParticipants);
   return {
      reInit(...participants: participant[]) {
         state = init(...participants);
      },
      addEvent(...participants: participant[]) {
         state = addEvent(state, ...participants);
      },
      undo() {
         state = undoEvent(state);
      },
      redo() {
         state = redoEvent(state);
      },
      mergeLast(mergeCount: number = 1) {
         state = mergeEvents(state, mergeCount);
      },
      getState(): historystate {
         return { ...state, events: [...state.events] };
      }
   }
}

