"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var Addins;
        (function (Addins) {
            var Junctions;
            (function (Junctions) {
                Junctions.init = (component) => {
                    let element = component.group;
                    $(element.element).on(Events.moved + " " + Events.place, () => {
                        clearJunctions(component);
                        createJunctions(component);
                    });
                };
                const createJunctions = (component) => {
                    let otherConnectors = Utility.flatten2d(manifest.schematic.map(component => Utility.flatten2d(component.connectorSets).filter(connector => (connector.type === "node"))));
                    component.connectorSets.forEach(connectorSet => connectorSet.forEach(connector => {
                        let point = connector.point;
                        let attachedConnectors = otherConnectors.filter(other => {
                            return vector(point).isCloseTo(other.point);
                        });
                        if (attachedConnectors.length === 3) {
                            component.group.prepend(Svg.Element.Circle.make(point, 5, "junction black"));
                        }
                    }));
                };
                const clearJunctions = (component) => {
                    $(component.group.element).find(".junction").remove();
                };
            })(Junctions = Addins.Junctions || (Addins.Junctions = {}));
        })(Addins = Component.Addins || (Component.Addins = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vdHlwZXNjcmlwdC9jaXJjdWl0L2NvbXBvbmVudC9hZGRpbnMvanVuY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE9BQU8sQ0F1Q2hCO0FBdkNELFdBQVUsT0FBTztJQUFDLElBQUEsU0FBUyxDQXVDMUI7SUF2Q2lCLFdBQUEsU0FBUztRQUFDLElBQUEsTUFBTSxDQXVDakM7UUF2QzJCLFdBQUEsTUFBTTtZQUFDLElBQUEsU0FBUyxDQXVDM0M7WUF2Q2tDLFdBQUEsU0FBUztnQkFLNUIsY0FBSSxHQUFHLENBQUMsU0FBd0IsRUFBRSxFQUFFO29CQUM5QyxJQUFJLE9BQU8sR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO29CQUM5QixDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRTt3QkFDM0QsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUMxQixlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQzlCLENBQUMsQ0FBQyxDQUFDO2dCQUNOLENBQUMsQ0FBQTtnQkFHRCxNQUFNLGVBQWUsR0FBRyxDQUFDLFNBQXdCLEVBQUUsRUFBRTtvQkFDbEQsSUFBSSxlQUFlLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUN4RSxPQUFPLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FDM0QsQ0FBQyxTQUFTLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUM3QixDQUNILENBQUMsQ0FBQztvQkFFSCxTQUFTLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7d0JBQzlFLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7d0JBQzVCLElBQUksa0JBQWtCLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTs0QkFDckQsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTt3QkFDOUMsQ0FBQyxDQUFDLENBQUM7d0JBQ0gsSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFOzRCQUdsQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDcEIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FDckQsQ0FBQzt5QkFDSjtvQkFDSixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQTtnQkFFRCxNQUFNLGNBQWMsR0FBRyxDQUFDLFNBQTZCLEVBQUUsRUFBRTtvQkFDdEQsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUN6RCxDQUFDLENBQUE7WUFDSixDQUFDLEVBdkNrQyxTQUFTLEdBQVQsZ0JBQVMsS0FBVCxnQkFBUyxRQXVDM0M7UUFBRCxDQUFDLEVBdkMyQixNQUFNLEdBQU4sZ0JBQU0sS0FBTixnQkFBTSxRQXVDakM7SUFBRCxDQUFDLEVBdkNpQixTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQXVDMUI7QUFBRCxDQUFDLEVBdkNTLE9BQU8sS0FBUCxPQUFPLFFBdUNoQiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBDaXJjdWl0LkNvbXBvbmVudC5BZGRpbnMuSnVuY3Rpb25zIHtcclxuICAgdHlwZSBub2RlQ29tcG9uZW50ID0gQ29tcG9uZW50Lkluc3RhbmNlICYge1xyXG4gICAgICBjb25uZWN0b3JTZXRzOiBDb21wb25lbnQuVHlwZXMubm9kZVtdW10sXHJcbiAgIH1cclxuXHJcbiAgIGV4cG9ydCBjb25zdCBpbml0ID0gKGNvbXBvbmVudDogbm9kZUNvbXBvbmVudCkgPT4ge1xyXG4gICAgICBsZXQgZWxlbWVudCA9IGNvbXBvbmVudC5ncm91cDtcclxuICAgICAgJChlbGVtZW50LmVsZW1lbnQpLm9uKEV2ZW50cy5tb3ZlZCArIFwiIFwiICsgRXZlbnRzLnBsYWNlLCAoKSA9PiB7XHJcbiAgICAgICAgIGNsZWFySnVuY3Rpb25zKGNvbXBvbmVudCk7XHJcbiAgICAgICAgIGNyZWF0ZUp1bmN0aW9ucyhjb21wb25lbnQpO1xyXG4gICAgICB9KTtcclxuICAgfVxyXG5cclxuXHJcbiAgIGNvbnN0IGNyZWF0ZUp1bmN0aW9ucyA9IChjb21wb25lbnQ6IG5vZGVDb21wb25lbnQpID0+IHtcclxuICAgICAgbGV0IG90aGVyQ29ubmVjdG9ycyA9IFV0aWxpdHkuZmxhdHRlbjJkKG1hbmlmZXN0LnNjaGVtYXRpYy5tYXAoY29tcG9uZW50ID0+XHJcbiAgICAgICAgIFV0aWxpdHkuZmxhdHRlbjJkKGNvbXBvbmVudC5jb25uZWN0b3JTZXRzKS5maWx0ZXIoY29ubmVjdG9yID0+XHJcbiAgICAgICAgICAgIChjb25uZWN0b3IudHlwZSA9PT0gXCJub2RlXCIpXHJcbiAgICAgICAgIClcclxuICAgICAgKSk7XHJcblxyXG4gICAgICBjb21wb25lbnQuY29ubmVjdG9yU2V0cy5mb3JFYWNoKGNvbm5lY3RvclNldCA9PiBjb25uZWN0b3JTZXQuZm9yRWFjaChjb25uZWN0b3IgPT4ge1xyXG4gICAgICAgICBsZXQgcG9pbnQgPSBjb25uZWN0b3IucG9pbnQ7XHJcbiAgICAgICAgIGxldCBhdHRhY2hlZENvbm5lY3RvcnMgPSBvdGhlckNvbm5lY3RvcnMuZmlsdGVyKG90aGVyID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHZlY3Rvcihwb2ludCkuaXNDbG9zZVRvKG90aGVyLnBvaW50KVxyXG4gICAgICAgICB9KTtcclxuICAgICAgICAgaWYgKGF0dGFjaGVkQ29ubmVjdG9ycy5sZW5ndGggPT09IDMpIHtcclxuICAgICAgICAgICAgLy9sZXQgY3RtID0gQWN0aXZlLnNjaGVtYXRpYy5yb290Lmdyb3VwLmVsZW1lbnQuZ2V0Q1RNKCk7XHJcbiAgICAgICAgICAgIC8vcG9pbnQgPSAoY3RtKSA/IHBvaW50Lm1hdHJpeFRyYW5zZm9ybShjdG0uaW52ZXJzZSgpKSA6IHBvaW50O1xyXG4gICAgICAgICAgICBjb21wb25lbnQuZ3JvdXAucHJlcGVuZChcclxuICAgICAgICAgICAgICAgU3ZnLkVsZW1lbnQuQ2lyY2xlLm1ha2UocG9pbnQsIDUsIFwianVuY3Rpb24gYmxhY2tcIilcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgfVxyXG4gICAgICB9KSk7XHJcbiAgIH1cclxuXHJcbiAgIGNvbnN0IGNsZWFySnVuY3Rpb25zID0gKGNvbXBvbmVudDogQ29tcG9uZW50Lkluc3RhbmNlKSA9PiB7XHJcbiAgICAgICQoY29tcG9uZW50Lmdyb3VwLmVsZW1lbnQpLmZpbmQoXCIuanVuY3Rpb25cIikucmVtb3ZlKCk7XHJcbiAgIH1cclxufSJdfQ==