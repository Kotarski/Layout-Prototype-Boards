export default function buildComponents(rawComponents) {
    console.groupCollapsed("Component Load Data");
    let manifest = {
        schematic: [],
        layout: []
    };
    for (let rawComponent of rawComponents) {
        const componentMap = Circuit.mappings.getComponentMap(rawComponent.func);
        if (componentMap === undefined) {
            console.error("I don't know how to build %o yet!", rawComponent);
            continue;
        }
        const sectionName = componentMap.diagramType;
        let manifestSection = (sectionName === "schematic") ? manifest.schematic : manifest.layout;
        let newComponents = componentMap.load(rawComponent);
        if (Array.isArray(newComponents)) {
            manifestSection.push(...newComponents);
        }
        else {
            manifestSection.push(newComponents);
        }
    }
    console.groupEnd();
    return manifest;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLWJ1aWxkQ29tcG9uZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3R5cGVzY3JpcHQvZmlsZUlPL2xvYWQvZGFzaW0vLWJ1aWxkQ29tcG9uZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLENBQUMsT0FBTyxVQUFVLGVBQWUsQ0FBQyxhQUFvQjtJQUMxQyxPQUFPLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFFN0QsSUFBSSxRQUFRLEdBQWtCO1FBQzNCLFNBQVMsRUFBRSxFQUFFO1FBQ2IsTUFBTSxFQUFFLEVBQUU7S0FDWixDQUFBO0lBRUQsS0FBSyxJQUFJLFlBQVksSUFBSSxhQUFhLEVBQUU7UUFDckMsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXpFLElBQUksWUFBWSxLQUFLLFNBQVMsRUFBRTtZQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUNBQW1DLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDaEYsU0FBUztTQUNYO1FBRUQsTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLFdBQVcsQ0FBQztRQUU3QyxJQUFJLGVBQWUsR0FBRyxDQUFDLFdBQVcsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUUzRixJQUFJLGFBQWEsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3BELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUMvQixlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUM7U0FDekM7YUFBTTtZQUNKLGVBQWUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDdEM7S0FFSDtJQUNjLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQyxPQUFPLFFBQVEsQ0FBQztBQUNuQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsidHlwZSBzYXZlZE1hbmlmaXN0ID0geyBzY2hlbWF0aWM6IENpcmN1aXQuQ29tcG9uZW50Lkluc3RhbmNlW10sIGxheW91dDogQ2lyY3VpdC5Db21wb25lbnQuSW5zdGFuY2VbXSB9O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRDb21wb25lbnRzKHJhd0NvbXBvbmVudHM6IGFueVtdKTogc2F2ZWRNYW5pZmlzdCB7XHJcbiAgICAgIC8qTE9HU1RBUlQqL2NvbnNvbGUuZ3JvdXBDb2xsYXBzZWQoXCJDb21wb25lbnQgTG9hZCBEYXRhXCIpOy8qTE9HRU5EKi9cclxuXHJcbiAgIGxldCBtYW5pZmVzdDogc2F2ZWRNYW5pZmlzdCA9IHtcclxuICAgICAgc2NoZW1hdGljOiBbXSxcclxuICAgICAgbGF5b3V0OiBbXVxyXG4gICB9XHJcblxyXG4gICBmb3IgKGxldCByYXdDb21wb25lbnQgb2YgcmF3Q29tcG9uZW50cykge1xyXG4gICAgICBjb25zdCBjb21wb25lbnRNYXAgPSBDaXJjdWl0Lm1hcHBpbmdzLmdldENvbXBvbmVudE1hcChyYXdDb21wb25lbnQuZnVuYyk7XHJcblxyXG4gICAgICBpZiAoY29tcG9uZW50TWFwID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgLypMT0dTVEFSVCovY29uc29sZS5lcnJvcihcIkkgZG9uJ3Qga25vdyBob3cgdG8gYnVpbGQgJW8geWV0IVwiLCByYXdDb21wb25lbnQpOy8qTE9HRU5EKi9cclxuICAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHNlY3Rpb25OYW1lID0gY29tcG9uZW50TWFwLmRpYWdyYW1UeXBlO1xyXG5cclxuICAgICAgbGV0IG1hbmlmZXN0U2VjdGlvbiA9IChzZWN0aW9uTmFtZSA9PT0gXCJzY2hlbWF0aWNcIikgPyBtYW5pZmVzdC5zY2hlbWF0aWMgOiBtYW5pZmVzdC5sYXlvdXQ7XHJcblxyXG4gICAgICBsZXQgbmV3Q29tcG9uZW50cyA9IGNvbXBvbmVudE1hcC5sb2FkKHJhd0NvbXBvbmVudCk7XHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG5ld0NvbXBvbmVudHMpKSB7XHJcbiAgICAgICAgIG1hbmlmZXN0U2VjdGlvbi5wdXNoKC4uLm5ld0NvbXBvbmVudHMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICBtYW5pZmVzdFNlY3Rpb24ucHVzaChuZXdDb21wb25lbnRzKTtcclxuICAgICAgfVxyXG5cclxuICAgfVxyXG4gICAgICAvKkxPR1NUQVJUKi9jb25zb2xlLmdyb3VwRW5kKCk7LypMT0dFTkQqL1xyXG4gICByZXR1cm4gbWFuaWZlc3Q7XHJcbn0iXX0=