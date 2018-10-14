import Events from "../events";
export default function undoEvent(state) {
    if (state.currentIdx <= 0)
        return state;
    const currentEvent = state.events[state.currentIdx];
    const redoEvent = currentEvent.map(development => development.participant).map(participant => ({
        participant,
        state: participant.getState()
    }));
    currentEvent.forEach(development => {
        Object.assign(development.participant, development.state);
        if (development.participant.group) {
            $(development.participant.group.element).trigger(Events.draw);
        }
    });
    const previousEvents = state.events.slice(0, state.currentIdx);
    const nextEvents = state.events.slice(state.currentIdx + 1);
    const events = [...previousEvents, redoEvent, ...nextEvents];
    const currentIdx = state.currentIdx - 1;
    return { events, currentIdx, lastIdx: state.lastIdx };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLXVuZG9FdmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3R5cGVzY3JpcHQvQ2lyY3VpdC9fSGlzdG9yeS8tdW5kb0V2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sTUFBTSxNQUFNLFdBQVcsQ0FBQztBQUMvQixNQUFNLENBQUMsT0FBTyxVQUFVLFNBQVMsQ0FBQyxLQUFtQjtJQUNsRCxJQUFJLEtBQUssQ0FBQyxVQUFVLElBQUksQ0FBQztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBRXhDLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBR3BELE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1RixXQUFXO1FBQ1gsS0FBSyxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUU7S0FDL0IsQ0FBQyxDQUFDLENBQUM7SUFHSixZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQ2hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUQsSUFBSSxXQUFXLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRTtZQUNoQyxDQUFDLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNoRTtJQUNKLENBQUMsQ0FBQyxDQUFDO0lBR0gsTUFBTSxjQUFjLEdBQVksS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4RSxNQUFNLFVBQVUsR0FBWSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLE1BQU0sTUFBTSxHQUFHLENBQUMsR0FBRyxjQUFjLEVBQUUsU0FBUyxFQUFFLEdBQUcsVUFBVSxDQUFDLENBQUM7SUFHN0QsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7SUFFeEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQTtBQUN4RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaGlzdG9yeXN0YXRlLCBldmVudCB9IGZyb20gXCIuL3R5cGVzXCI7XHJcbi8vVE9ETzogUmVtb3ZlIEV2ZW50cyBkZXBlbmRhbmN5XHJcbmltcG9ydCBFdmVudHMgZnJvbSBcIi4uL2V2ZW50c1wiO1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1bmRvRXZlbnQoc3RhdGU6IGhpc3RvcnlzdGF0ZSk6IGhpc3RvcnlzdGF0ZSB7XHJcbiAgIGlmIChzdGF0ZS5jdXJyZW50SWR4IDw9IDApIHJldHVybiBzdGF0ZTtcclxuXHJcbiAgIGNvbnN0IGN1cnJlbnRFdmVudCA9IHN0YXRlLmV2ZW50c1tzdGF0ZS5jdXJyZW50SWR4XTtcclxuXHJcbiAgIC8vIEdldCB0aGUgY3VycmVudCBzdGF0ZSBvZiBhbGwgcGFydGljaXBhbnRzIHRoYXQgd2lsbCBiZSByZXZlcnRlZFxyXG4gICBjb25zdCByZWRvRXZlbnQgPSBjdXJyZW50RXZlbnQubWFwKGRldmVsb3BtZW50ID0+IGRldmVsb3BtZW50LnBhcnRpY2lwYW50KS5tYXAocGFydGljaXBhbnQgPT4gKHtcclxuICAgICAgcGFydGljaXBhbnQsXHJcbiAgICAgIHN0YXRlOiBwYXJ0aWNpcGFudC5nZXRTdGF0ZSgpXHJcbiAgIH0pKTtcclxuXHJcbiAgIC8vIFJldmVydCB0aGUgY3VycmVudCBwYXJ0aWNpcGFudHNcclxuICAgY3VycmVudEV2ZW50LmZvckVhY2goZGV2ZWxvcG1lbnQgPT4ge1xyXG4gICAgICBPYmplY3QuYXNzaWduKGRldmVsb3BtZW50LnBhcnRpY2lwYW50LCBkZXZlbG9wbWVudC5zdGF0ZSk7XHJcbiAgICAgIGlmIChkZXZlbG9wbWVudC5wYXJ0aWNpcGFudC5ncm91cCkge1xyXG4gICAgICAgICAkKGRldmVsb3BtZW50LnBhcnRpY2lwYW50Lmdyb3VwLmVsZW1lbnQpLnRyaWdnZXIoRXZlbnRzLmRyYXcpO1xyXG4gICAgICB9XHJcbiAgIH0pO1xyXG5cclxuICAgLy8gUmVwbGFjZSB0aGUgdW5kb25lIGV2ZW50IHdpdGggYW4gZXZlbnQgdG8gcmVkbyBpdFxyXG4gICBjb25zdCBwcmV2aW91c0V2ZW50czogZXZlbnRbXSA9IHN0YXRlLmV2ZW50cy5zbGljZSgwLCBzdGF0ZS5jdXJyZW50SWR4KTtcclxuICAgY29uc3QgbmV4dEV2ZW50czogZXZlbnRbXSA9IHN0YXRlLmV2ZW50cy5zbGljZShzdGF0ZS5jdXJyZW50SWR4ICsgMSk7XHJcbiAgIGNvbnN0IGV2ZW50cyA9IFsuLi5wcmV2aW91c0V2ZW50cywgcmVkb0V2ZW50LCAuLi5uZXh0RXZlbnRzXTtcclxuXHJcbiAgIC8vIEdvIGJhY2sgb25lIGV2ZW50XHJcbiAgIGNvbnN0IGN1cnJlbnRJZHggPSBzdGF0ZS5jdXJyZW50SWR4IC0gMTtcclxuXHJcbiAgIHJldHVybiB7IGV2ZW50cywgY3VycmVudElkeCwgbGFzdElkeDogc3RhdGUubGFzdElkeCB9XHJcbn1cclxuXHJcblxyXG4iXX0=