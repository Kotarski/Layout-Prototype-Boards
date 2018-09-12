namespace Circuit {

   type participant = {
      getState: () => {};
      group?: Svg.Element.Group.type;
   }

   type development<C extends participant> = {
      participant: C,
      state: Partial<ReturnType<C["getState"]>>
   }

   const historyBuilder = (() => {
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

      /* Useful when a single user action will create N+1 events */
      const mergeLast = (N: number = 1) => {
         let mergeStart = Math.max(0, lastIdx - N);
         let toMerge = events.slice(mergeStart);
         let mergedDevelopments: development<participant>[] = [];
         toMerge.forEach(event => {
            event.forEach(dev => {
               if (!mergedDevelopments.some(mDev => mDev.participant === dev.participant)) {
                  mergedDevelopments.push(dev);
               }
            })
         });
         events = events.slice(0, mergeStart)
         events[mergeStart] = mergedDevelopments;
         lastIdx = mergeStart;
         if (currentIdx > lastIdx) currentIdx = lastIdx;
      }

      const undo = () => {
         if (currentIdx <= 0) return;
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

      const redo = () => {
         if (currentIdx >= lastIdx) return;
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

      return {
         add: addEvent,
         mergeLast: mergeLast,
         undo: undo,
         redo: redo,
         getEvents: () => [...events],
         getCurrentIdx: () => currentIdx,
         getLastIdx: () => lastIdx
      }
   })

   export let history: ReturnType<typeof historyBuilder>;
   export namespace History {
      export function init(participants: Component.Instance[]) {
         history = historyBuilder();
         history.add(...participants);
      }
   }

}