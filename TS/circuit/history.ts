namespace Circuit {

   type participant = {
      getState: () => {};
      group?: Svg.Element.Group.type;
   }

   type development<C extends participant> = {
      participant: C,
      state: Partial<ReturnType<C["getState"]>>
   }

   const historyBuilder = ((participants: participant[]) => {
      let events: development<participant>[][] = [];

      let currentIdx = -1;
      let lastIdx = -1;

      const addEvent = (...participants: participant[]) => {
         if (currentIdx < lastIdx) {
            events.splice(currentIdx + 1);
         }
         events.push(participants.map(participant => {
            return {
               participant: participant,
               // TODO, dirty and not idiomatic
               state: participant.getState()
            }
         }));
         currentIdx += 1;
         lastIdx = currentIdx;
      }

      addEvent(...participants);

      const undo = () => {
         if (currentIdx > 0) {
            // Get the current state of all participants that will be reverted
            let redoEvent = events[currentIdx].map(development => development.participant).map(participant => {
               return {
                  participant: participant,
                  state: participant.getState()
               }
            });

            // Revert the current participants
            events[currentIdx].forEach(development => {
               Object.assign(development.participant, development.state);
               if (development.participant.group) {
                  $(development.participant.group.element).trigger(Events.draw);
               }
            });

            // Replace the undoEvent with a redoEvent
            events[currentIdx] = redoEvent;

            currentIdx -= 1;
         }
      }

      const redo = () => {
         if (currentIdx < lastIdx) {
            currentIdx += 1;

            // Get the current state of all participants that will be unreverted
            let undoEvent = events[currentIdx].map(development => development.participant).map(participant => {
               return {
                  participant: participant,
                  state: participant.getState()
               }
            });

            // Unrevert the current participants
            events[currentIdx].forEach(development => {
               Object.assign(development.participant, development.state);
               if (development.participant.group) {
                  $(development.participant.group.element).trigger(Events.draw);
               }
            });

            // Replace the redoEvent with a undoEvent
            events[currentIdx] = undoEvent;
         }
      }

      return {
         events: () => events,
         add: addEvent,
         undo: undo,
         redo: redo,
         currentIdx: () => currentIdx,
         lastIdx: () => lastIdx
      }
   })

   export let history: ReturnType<typeof historyBuilder>;

   export namespace History {
      export function init(participants: Component.Instance[]) {
         history = historyBuilder(participants);
      }
   }

}