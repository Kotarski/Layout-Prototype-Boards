import { historystate, event } from "./types";
//import * as $ from 'jquery';
//TODO: Remove Events dependancy
import Events from "../events";
export default function undoEvent(state: historystate): historystate {
   if (state.currentIdx <= 0) return state;

   const currentEvent = state.events[state.currentIdx];

   // Get the current state of all participants that will be reverted
   const redoEvent = currentEvent.map(development => development.participant).map(participant => ({
      participant,
      state: participant.getState()
   }));

   // Revert the current participants
   currentEvent.forEach(development => {
      Object.assign(development.participant, development.state);
      if (development.participant.group) {
         $(development.participant.group.element).trigger(Events.draw);
      }
   });

   // Replace the undone event with an event to redo it
   const previousEvents: event[] = state.events.slice(0, state.currentIdx);
   const nextEvents: event[] = state.events.slice(state.currentIdx + 1);
   const events = [...previousEvents, redoEvent, ...nextEvents];

   // Go back one event
   const currentIdx = state.currentIdx - 1;

   return { events, currentIdx, lastIdx: state.lastIdx }
}


