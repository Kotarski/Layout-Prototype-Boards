namespace Circuit._History {

   export function init(...participants: participant[]): historystate {
      // Clear events, and reset indices
      const events: event[] = [];
      const currentIdx = -1, lastIdx = -1;
      // Add an initial event
      return addEvent({ events, currentIdx, lastIdx }, ...participants);
   }
}