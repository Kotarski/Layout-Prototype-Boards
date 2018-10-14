export default function mergeEvents(state, mergeCount) {
    const mergeStartIdx = Math.max(0, state.lastIdx - mergeCount);
    const eventsToMerge = state.events.slice(mergeStartIdx);
    const previousEvents = state.events.slice(0, mergeStartIdx);
    const mergedEvent = [];
    eventsToMerge.forEach(event => {
        event.forEach(dev => {
            if (!mergedEvent.some(mDev => mDev.participant === dev.participant)) {
                mergedEvent.push(dev);
            }
        });
    });
    const events = [...previousEvents, mergedEvent];
    const lastIdx = mergeStartIdx;
    const currentIdx = (state.currentIdx > state.lastIdx)
        ? state.lastIdx
        : state.currentIdx;
    return { events, currentIdx, lastIdx };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLW1lcmdlRXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdHlwZXNjcmlwdC9DaXJjdWl0L19IaXN0b3J5Ly1tZXJnZUV2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxNQUFNLENBQUMsT0FBTyxVQUFVLFdBQVcsQ0FBQyxLQUFtQixFQUFFLFVBQWtCO0lBQ3hFLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLENBQUM7SUFDOUQsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDeEQsTUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBRTVELE1BQU0sV0FBVyxHQUFVLEVBQUUsQ0FBQztJQUM5QixhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQzNCLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFDbEUsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN4QjtRQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLE1BQU0sR0FBRyxDQUFDLEdBQUcsY0FBYyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQy9DLE1BQU0sT0FBTyxHQUFHLGFBQWEsQ0FBQztJQUM5QixNQUFNLFVBQVUsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUNsRCxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU87UUFDZixDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztJQUV0QixPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsQ0FBQTtBQUN6QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaGlzdG9yeXN0YXRlLCBldmVudCB9IGZyb20gXCIuL3R5cGVzXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1lcmdlRXZlbnRzKHN0YXRlOiBoaXN0b3J5c3RhdGUsIG1lcmdlQ291bnQ6IG51bWJlcik6IGhpc3RvcnlzdGF0ZSB7XHJcbiAgIGNvbnN0IG1lcmdlU3RhcnRJZHggPSBNYXRoLm1heCgwLCBzdGF0ZS5sYXN0SWR4IC0gbWVyZ2VDb3VudCk7XHJcbiAgIGNvbnN0IGV2ZW50c1RvTWVyZ2UgPSBzdGF0ZS5ldmVudHMuc2xpY2UobWVyZ2VTdGFydElkeCk7XHJcbiAgIGNvbnN0IHByZXZpb3VzRXZlbnRzID0gc3RhdGUuZXZlbnRzLnNsaWNlKDAsIG1lcmdlU3RhcnRJZHgpO1xyXG5cclxuICAgY29uc3QgbWVyZ2VkRXZlbnQ6IGV2ZW50ID0gW107XHJcbiAgIGV2ZW50c1RvTWVyZ2UuZm9yRWFjaChldmVudCA9PiB7XHJcbiAgICAgIGV2ZW50LmZvckVhY2goZGV2ID0+IHtcclxuICAgICAgICAgaWYgKCFtZXJnZWRFdmVudC5zb21lKG1EZXYgPT4gbURldi5wYXJ0aWNpcGFudCA9PT0gZGV2LnBhcnRpY2lwYW50KSkge1xyXG4gICAgICAgICAgICBtZXJnZWRFdmVudC5wdXNoKGRldik7XHJcbiAgICAgICAgIH1cclxuICAgICAgfSlcclxuICAgfSk7XHJcblxyXG4gICBjb25zdCBldmVudHMgPSBbLi4ucHJldmlvdXNFdmVudHMsIG1lcmdlZEV2ZW50XVxyXG4gICBjb25zdCBsYXN0SWR4ID0gbWVyZ2VTdGFydElkeDtcclxuICAgY29uc3QgY3VycmVudElkeCA9IChzdGF0ZS5jdXJyZW50SWR4ID4gc3RhdGUubGFzdElkeClcclxuICAgICAgPyBzdGF0ZS5sYXN0SWR4XHJcbiAgICAgIDogc3RhdGUuY3VycmVudElkeDtcclxuXHJcbiAgIHJldHVybiB7IGV2ZW50cywgY3VycmVudElkeCwgbGFzdElkeCB9XHJcbn1cclxuXHJcbiJdfQ==