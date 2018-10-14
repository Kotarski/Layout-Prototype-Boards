import NodeElements from "../../../~nodeElements";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var Addins;
        (function (Addins) {
            var Draggable;
            (function (Draggable) {
                Draggable.init = (component) => {
                    Svg.Addins.Draggable.init(component.group.element, {
                        disableMovement: true,
                        onStart: () => {
                            history.addEvent(component);
                            component.insertInto(component.group.element);
                        },
                        onDrag: (drag) => {
                            component.joints.forEach(joint => {
                                joint.x += drag.x;
                                joint.y += drag.y;
                            });
                            $(component.group.element).trigger(Events.draw);
                        },
                        onStop: () => {
                            component.joints.forEach(joint => {
                                joint.x = Math.round(joint.x);
                                joint.y = Math.round(joint.y);
                            });
                        }
                    });
                    if (mappings.getComponentMapSafe(component).isBoard &&
                        NodeElements.boardDraggingDisabled.checked) {
                        Draggable.disable(component);
                    }
                };
                Draggable.disable = (component) => {
                    if ($(component.group.element).draggable("instance") !== undefined) {
                        $(component.group.element).draggable("disable");
                    }
                };
                Draggable.enable = (component) => {
                    if ($(component.group.element).draggable("instance") !== undefined) {
                        $(component.group.element).draggable("enable");
                    }
                };
            })(Draggable = Addins.Draggable || (Addins.Draggable = {}));
        })(Addins = Component.Addins || (Component.Addins = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2dhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vdHlwZXNjcmlwdC9jaXJjdWl0L2NvbXBvbmVudC9hZGRpbnMvZHJhZ2dhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLHdCQUF3QixDQUFDO0FBQ2xELElBQVUsT0FBTyxDQTRDaEI7QUE1Q0QsV0FBVSxPQUFPO0lBQUMsSUFBQSxTQUFTLENBNEMxQjtJQTVDaUIsV0FBQSxTQUFTO1FBQUMsSUFBQSxNQUFNLENBNENqQztRQTVDMkIsV0FBQSxNQUFNO1lBQUMsSUFBQSxTQUFTLENBNEMzQztZQTVDa0MsV0FBQSxTQUFTO2dCQUU1QixjQUFJLEdBQUcsQ0FBQyxTQUE2QixFQUFFLEVBQUU7b0JBQ25ELEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTt3QkFDaEQsZUFBZSxFQUFFLElBQUk7d0JBQ3JCLE9BQU8sRUFBRSxHQUFHLEVBQUU7NEJBQ1gsT0FBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQzs0QkFDNUIsU0FBUyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUNqRCxDQUFDO3dCQUNELE1BQU0sRUFBRSxDQUFDLElBQVksRUFBRSxFQUFFOzRCQUV0QixTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQ0FDOUIsS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dDQUNsQixLQUFLLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7NEJBQ3JCLENBQUMsQ0FBQyxDQUFBOzRCQUNGLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ25ELENBQUM7d0JBQ0QsTUFBTSxFQUFFLEdBQUcsRUFBRTs0QkFDVixTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQ0FDOUIsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDOUIsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDakMsQ0FBQyxDQUFDLENBQUM7d0JBQ04sQ0FBQztxQkFDSCxDQUFDLENBQUM7b0JBR0gsSUFBSSxRQUFRLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTzt3QkFDaEQsWUFBWSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sRUFDM0M7d0JBQ0MsVUFBQSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7cUJBQ3JCO2dCQUNKLENBQUMsQ0FBQTtnQkFFWSxpQkFBTyxHQUFHLENBQUMsU0FBNkIsRUFBRSxFQUFFO29CQUN0RCxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsS0FBSyxTQUFTLEVBQUU7d0JBQ2pFLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztxQkFDbEQ7Z0JBQ0osQ0FBQyxDQUFBO2dCQUVZLGdCQUFNLEdBQUcsQ0FBQyxTQUE2QixFQUFFLEVBQUU7b0JBQ3JELElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxLQUFLLFNBQVMsRUFBRTt3QkFDakUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3FCQUNqRDtnQkFDSixDQUFDLENBQUE7WUFDSixDQUFDLEVBNUNrQyxTQUFTLEdBQVQsZ0JBQVMsS0FBVCxnQkFBUyxRQTRDM0M7UUFBRCxDQUFDLEVBNUMyQixNQUFNLEdBQU4sZ0JBQU0sS0FBTixnQkFBTSxRQTRDakM7SUFBRCxDQUFDLEVBNUNpQixTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQTRDMUI7QUFBRCxDQUFDLEVBNUNTLE9BQU8sS0FBUCxPQUFPLFFBNENoQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOb2RlRWxlbWVudHMgZnJvbSBcIi4uLy4uLy4uL35ub2RlRWxlbWVudHNcIjtcclxubmFtZXNwYWNlIENpcmN1aXQuQ29tcG9uZW50LkFkZGlucy5EcmFnZ2FibGUge1xyXG4gICB0eXBlIGRyYWdnYWJsZUNvbXBvbmVudCA9IENvbXBvbmVudC5JbnN0YW5jZSAmIHsgam9pbnRzOiBWZWN0b3JbXSB9O1xyXG4gICBleHBvcnQgY29uc3QgaW5pdCA9IChjb21wb25lbnQ6IGRyYWdnYWJsZUNvbXBvbmVudCkgPT4ge1xyXG4gICAgICBTdmcuQWRkaW5zLkRyYWdnYWJsZS5pbml0KGNvbXBvbmVudC5ncm91cC5lbGVtZW50LCB7XHJcbiAgICAgICAgIGRpc2FibGVNb3ZlbWVudDogdHJ1ZSxcclxuICAgICAgICAgb25TdGFydDogKCkgPT4ge1xyXG4gICAgICAgICAgICBoaXN0b3J5LmFkZEV2ZW50KGNvbXBvbmVudCk7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudC5pbnNlcnRJbnRvKGNvbXBvbmVudC5ncm91cC5lbGVtZW50KTtcclxuICAgICAgICAgfSxcclxuICAgICAgICAgb25EcmFnOiAoZHJhZzogVmVjdG9yKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIFRPRE8gSU1NVVRBQkxFXHJcbiAgICAgICAgICAgIGNvbXBvbmVudC5qb2ludHMuZm9yRWFjaChqb2ludCA9PiB7XHJcbiAgICAgICAgICAgICAgIGpvaW50LnggKz0gZHJhZy54O1xyXG4gICAgICAgICAgICAgICBqb2ludC55ICs9IGRyYWcueTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgJChjb21wb25lbnQuZ3JvdXAuZWxlbWVudCkudHJpZ2dlcihFdmVudHMuZHJhdyk7XHJcbiAgICAgICAgIH0sXHJcbiAgICAgICAgIG9uU3RvcDogKCkgPT4ge1xyXG4gICAgICAgICAgICBjb21wb25lbnQuam9pbnRzLmZvckVhY2goam9pbnQgPT4ge1xyXG4gICAgICAgICAgICAgICBqb2ludC54ID0gTWF0aC5yb3VuZChqb2ludC54KTtcclxuICAgICAgICAgICAgICAgam9pbnQueSA9IE1hdGgucm91bmQoam9pbnQueSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gVE9ETywgSSBkb24ndCBxdWl0ZSBsaWtlIGhvdyB0aGlzIGlzIGNvdXBsZWQgdG9nZXRoZXJcclxuICAgICAgaWYgKG1hcHBpbmdzLmdldENvbXBvbmVudE1hcFNhZmUoY29tcG9uZW50KS5pc0JvYXJkICYmXHJcbiAgICAgICAgIE5vZGVFbGVtZW50cy5ib2FyZERyYWdnaW5nRGlzYWJsZWQuY2hlY2tlZFxyXG4gICAgICApIHtcclxuICAgICAgICAgZGlzYWJsZShjb21wb25lbnQpO1xyXG4gICAgICB9XHJcbiAgIH1cclxuXHJcbiAgIGV4cG9ydCBjb25zdCBkaXNhYmxlID0gKGNvbXBvbmVudDogQ29tcG9uZW50Lkluc3RhbmNlKSA9PiB7XHJcbiAgICAgIGlmICgkKGNvbXBvbmVudC5ncm91cC5lbGVtZW50KS5kcmFnZ2FibGUoXCJpbnN0YW5jZVwiKSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICQoY29tcG9uZW50Lmdyb3VwLmVsZW1lbnQpLmRyYWdnYWJsZShcImRpc2FibGVcIik7XHJcbiAgICAgIH1cclxuICAgfVxyXG5cclxuICAgZXhwb3J0IGNvbnN0IGVuYWJsZSA9IChjb21wb25lbnQ6IENvbXBvbmVudC5JbnN0YW5jZSkgPT4ge1xyXG4gICAgICBpZiAoJChjb21wb25lbnQuZ3JvdXAuZWxlbWVudCkuZHJhZ2dhYmxlKFwiaW5zdGFuY2VcIikgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAkKGNvbXBvbmVudC5ncm91cC5lbGVtZW50KS5kcmFnZ2FibGUoXCJlbmFibGVcIik7XHJcbiAgICAgIH1cclxuICAgfVxyXG59Il19