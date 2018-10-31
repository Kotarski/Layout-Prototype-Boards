namespace Circuit._History {

   export function redoEvent(state: historystate): historystate {
      if (state.currentIdx >= state.lastIdx) return state;

      // Go forward one event
      const currentIdx = state.currentIdx + 1;

      const currentEvent = state.events[currentIdx];

      // Get the current state of all participants that will be reverted
      const undoEvent = currentEvent.map(development => development.participant).map(participant => ({
         participant,
         state: participant.getState()
      }));

      // Unrevert the current participants
      currentEvent.forEach(development => {
         Object.assign(development.participant, development.state);
         if (development.participant.group) {
            $(development.participant.group.element).trigger(Events.draw);
         }
      });

      // Replace the redone event with an event to undo it
      const previousEvents: event[] = state.events.slice(0, currentIdx);
      const nextEvents: event[] = state.events.slice(currentIdx + 1);
      const events = [...previousEvents, undoEvent, ...nextEvents];

      return { events, currentIdx, lastIdx: state.lastIdx }
   }
}