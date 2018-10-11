/// <reference path="-init.ts" />
/// <reference path="-addEvent.ts" />
/// <reference path="-undoEvent.ts" />
/// <reference path="-redoEvent.ts" />
/// <reference path="-mergeEvents.ts" />

namespace Circuit._History {
   export function factory(...initialParticipants: participant[]) {
      let state = _History.init(...initialParticipants);
      return {
         reInit(...participants: participant[]) {
            state = _History.init(...participants);
         },
         addEvent(...participants: participant[]) {
            state = _History.addEvent(state, ...participants);
         },
         undo() {
            state = _History.undoEvent(state);
         },
         redo() {
            state = _History.redoEvent(state);
         },
         mergeLast(mergeCount: number = 1) {
            state = _History.mergeEvents(state, mergeCount);
         },
         getState(): historystate {
            return { ...state, events: [...state.events] };
         }
      }
   }
}

