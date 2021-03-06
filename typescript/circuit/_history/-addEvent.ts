import { historystate, participant, event } from "./types";
export default function addEvent(state: historystate, ...participants: participant[]): historystate {

   // Discard events after the current one if they exist
   const currentIdx = state.currentIdx + 1, lastIdx = currentIdx;
   const previousEvents: event[] = state.events.slice(0, lastIdx);

   // Create new event
   const newEvent: event = participants.map(participant => ({
      participant,
      state: participant.getState()
   }));

   // Return new state
   const events: event[] = [...previousEvents, newEvent]
   return { events, currentIdx, lastIdx }
}
