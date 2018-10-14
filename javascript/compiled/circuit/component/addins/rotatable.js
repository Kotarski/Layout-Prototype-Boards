"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var Addins;
        (function (Addins) {
            var Rotatable;
            (function (Rotatable) {
                Rotatable.init = (component) => {
                    $(component.group.element).dblclick(() => {
                        history.addEvent(component);
                        let centre = component.joints[0];
                        component.joints = vector(component.joints)
                            .sumWith(vector(centre).scaleWith(-1))
                            .rotate(90)
                            .sumWith(centre)
                            .vectors;
                        $(component.group.element).trigger(Events.draw);
                        $(component.group.element).trigger(Events.rotate);
                    });
                };
            })(Rotatable = Addins.Rotatable || (Addins.Rotatable = {}));
        })(Addins = Component.Addins || (Component.Addins = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm90YXRhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vdHlwZXNjcmlwdC9jaXJjdWl0L2NvbXBvbmVudC9hZGRpbnMvcm90YXRhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE9BQU8sQ0F1QmhCO0FBdkJELFdBQVUsT0FBTztJQUFDLElBQUEsU0FBUyxDQXVCMUI7SUF2QmlCLFdBQUEsU0FBUztRQUFDLElBQUEsTUFBTSxDQXVCakM7UUF2QjJCLFdBQUEsTUFBTTtZQUFDLElBQUEsU0FBUyxDQXVCM0M7WUF2QmtDLFdBQUEsU0FBUztnQkFRNUIsY0FBSSxHQUFHLENBQUMsU0FBNkIsRUFBRSxFQUFFO29CQUNuRCxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFO3dCQUN0QyxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUM1QixJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUVqQyxTQUFTLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDOzZCQUN2QyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzZCQUNyQyxNQUFNLENBQUMsRUFBRSxDQUFDOzZCQUNWLE9BQU8sQ0FBQyxNQUFNLENBQUM7NkJBQ2YsT0FBd0MsQ0FBQTt3QkFFNUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDaEQsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDckQsQ0FBQyxDQUFDLENBQUE7Z0JBQ0wsQ0FBQyxDQUFBO1lBQ0osQ0FBQyxFQXZCa0MsU0FBUyxHQUFULGdCQUFTLEtBQVQsZ0JBQVMsUUF1QjNDO1FBQUQsQ0FBQyxFQXZCMkIsTUFBTSxHQUFOLGdCQUFNLEtBQU4sZ0JBQU0sUUF1QmpDO0lBQUQsQ0FBQyxFQXZCaUIsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUF1QjFCO0FBQUQsQ0FBQyxFQXZCUyxPQUFPLEtBQVAsT0FBTyxRQXVCaEIiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgQ2lyY3VpdC5Db21wb25lbnQuQWRkaW5zLlJvdGF0YWJsZSB7XHJcbiAgIHR5cGUgcm90YXRhYmxlQ29tcG9uZW50ID0gQ29tcG9uZW50Lkluc3RhbmNlICYge1xyXG4gICAgICBqb2ludHM6IFtWZWN0b3IsIFZlY3RvciwgLi4uVmVjdG9yW11dXHJcbiAgIH07XHJcblxyXG4gICAvKiogSW5pdGlhbGlzZSByb3RhdGlvbiB1c2luZyBqb2ludFswXSBhcyB0aGUgcm90YXRpb24gcG9pbnRzXHJcbiAgICAqICBSb3RhdGlvbiB0cmlnZ2VyZWQgYnkgZG91YmxlIGNsaWNrIGluIDkwZGVnIGluY3JpbWVudHNcclxuICAgICovXHJcbiAgIGV4cG9ydCBjb25zdCBpbml0ID0gKGNvbXBvbmVudDogcm90YXRhYmxlQ29tcG9uZW50KSA9PiB7XHJcbiAgICAgICQoY29tcG9uZW50Lmdyb3VwLmVsZW1lbnQpLmRibGNsaWNrKCgpID0+IHtcclxuICAgICAgICAgaGlzdG9yeS5hZGRFdmVudChjb21wb25lbnQpO1xyXG4gICAgICAgICBsZXQgY2VudHJlID0gY29tcG9uZW50LmpvaW50c1swXTtcclxuXHJcbiAgICAgICAgIGNvbXBvbmVudC5qb2ludHMgPSB2ZWN0b3IoY29tcG9uZW50LmpvaW50cylcclxuICAgICAgICAgICAgLnN1bVdpdGgodmVjdG9yKGNlbnRyZSkuc2NhbGVXaXRoKC0xKSlcclxuICAgICAgICAgICAgLnJvdGF0ZSg5MClcclxuICAgICAgICAgICAgLnN1bVdpdGgoY2VudHJlKVxyXG4gICAgICAgICAgICAudmVjdG9ycyBhcyBbVmVjdG9yLCBWZWN0b3IsIC4uLlZlY3RvcltdXVxyXG5cclxuICAgICAgICAgJChjb21wb25lbnQuZ3JvdXAuZWxlbWVudCkudHJpZ2dlcihFdmVudHMuZHJhdyk7XHJcbiAgICAgICAgICQoY29tcG9uZW50Lmdyb3VwLmVsZW1lbnQpLnRyaWdnZXIoRXZlbnRzLnJvdGF0ZSk7XHJcbiAgICAgIH0pXHJcbiAgIH1cclxufSJdfQ==