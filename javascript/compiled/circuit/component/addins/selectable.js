"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var Addins;
        (function (Addins) {
            var Selectable;
            (function (Selectable) {
                Selectable.init = (component) => {
                    setSelectTrigger(component);
                    setDisplayHandlers(component);
                };
                const findSelectionElements = (component) => {
                    return manifest.findCorresponding(component).concat(component).map(el => el.group.element);
                };
                const elementSelectsComponent = (element, component) => {
                    const selectionElements = findSelectionElements(component);
                    const selectionElementIsSelected = $(element).closest(selectionElements).length > 0;
                    const elementSelectsComponent = $(element).parents().is((i, el) => ($(el).data("selects") === component));
                    return (selectionElementIsSelected || elementSelectsComponent);
                };
                const setSelectTrigger = (component) => {
                    $(component.group.element).one("mousedown", () => {
                        console.groupCollapsed("Selected", component.group.element);
                        console.log("Primary: %o", component);
                        const otherComponents = manifest.findCorresponding(component);
                        console.log("Secondaries: %o", otherComponents);
                        const selectComponents = otherComponents.concat(component);
                        selectComponents.forEach(selectComponent => {
                            $(selectComponent.group.element).trigger(Events.select);
                            setDeselectTrigger(selectComponent);
                        });
                        console.groupEnd();
                    });
                };
                const setDeselectTrigger = (component) => {
                    $(document).one("mousedown", e => {
                        if (elementSelectsComponent(e.target, component)) {
                            setDeselectTrigger(component);
                        }
                        else {
                            $(component.group.element).trigger(Events.deselect);
                            setSelectTrigger(component);
                        }
                    });
                };
                const setDisplayHandlers = (component) => {
                    $(component.group.element).on(Events.select, () => {
                        $(component.group.element).addClass("selected");
                        component.insertInto(component.group.element);
                    });
                    $(component.group.element).on(Events.deselect, () => {
                        $(component.group.element).removeClass("selected");
                    });
                };
            })(Selectable = Addins.Selectable || (Addins.Selectable = {}));
        })(Addins = Component.Addins || (Component.Addins = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3R5cGVzY3JpcHQvY2lyY3VpdC9jb21wb25lbnQvYWRkaW5zL3NlbGVjdGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVUsT0FBTyxDQThEaEI7QUE5REQsV0FBVSxPQUFPO0lBQUMsSUFBQSxTQUFTLENBOEQxQjtJQTlEaUIsV0FBQSxTQUFTO1FBQUMsSUFBQSxNQUFNLENBOERqQztRQTlEMkIsV0FBQSxNQUFNO1lBQUMsSUFBQSxVQUFVLENBOEQ1QztZQTlEa0MsV0FBQSxVQUFVO2dCQUM3QixlQUFJLEdBQUcsQ0FBQyxTQUE2QixFQUFFLEVBQUU7b0JBQ25ELGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUM1QixrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDakMsQ0FBQyxDQUFBO2dCQUVELE1BQU0scUJBQXFCLEdBQUcsQ0FBQyxTQUE2QixFQUFFLEVBQUU7b0JBQzdELE9BQU8sUUFBUSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM5RixDQUFDLENBQUE7Z0JBRUQsTUFBTSx1QkFBdUIsR0FBRyxDQUFDLE9BQWdCLEVBQUUsU0FBNkIsRUFBRSxFQUFFO29CQUNqRixNQUFNLGlCQUFpQixHQUFHLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUMzRCxNQUFNLDBCQUEwQixHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO29CQUNwRixNQUFNLHVCQUF1QixHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxF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LENBQUMsRUE5RDJCLE1BQU0sR0FBTixnQkFBTSxLQUFOLGdCQUFNLFFBOERqQztJQUFELENBQUMsRUE5RGlCLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBOEQxQjtBQUFELENBQUMsRUE5RFMsT0FBTyxLQUFQLE9BQU8sUUE4RGhCIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIENpcmN1aXQuQ29tcG9uZW50LkFkZGlucy5TZWxlY3RhYmxlIHtcclxuICAgZXhwb3J0IGNvbnN0IGluaXQgPSAoY29tcG9uZW50OiBDb21wb25lbnQuSW5zdGFuY2UpID0+IHtcclxuICAgICAgc2V0U2VsZWN0VHJpZ2dlcihjb21wb25lbnQpO1xyXG4gICAgICBzZXREaXNwbGF5SGFuZGxlcnMoY29tcG9uZW50KTtcclxuICAgfVxyXG5cclxuICAgY29uc3QgZmluZFNlbGVjdGlvbkVsZW1lbnRzID0gKGNvbXBvbmVudDogQ29tcG9uZW50Lkluc3RhbmNlKSA9PiB7XHJcbiAgICAgIHJldHVybiBtYW5pZmVzdC5maW5kQ29ycmVzcG9uZGluZyhjb21wb25lbnQpLmNvbmNhdChjb21wb25lbnQpLm1hcChlbCA9PiBlbC5ncm91cC5lbGVtZW50KTtcclxuICAgfVxyXG5cclxuICAgY29uc3QgZWxlbWVudFNlbGVjdHNDb21wb25lbnQgPSAoZWxlbWVudDogRWxlbWVudCwgY29tcG9uZW50OiBDb21wb25lbnQuSW5zdGFuY2UpID0+IHtcclxuICAgICAgY29uc3Qgc2VsZWN0aW9uRWxlbWVudHMgPSBmaW5kU2VsZWN0aW9uRWxlbWVudHMoY29tcG9uZW50KTtcclxuICAgICAgY29uc3Qgc2VsZWN0aW9uRWxlbWVudElzU2VsZWN0ZWQgPSAkKGVsZW1lbnQpLmNsb3Nlc3Qoc2VsZWN0aW9uRWxlbWVudHMpLmxlbmd0aCA+IDA7XHJcbiAgICAgIGNvbnN0IGVsZW1lbnRTZWxlY3RzQ29tcG9uZW50ID0gJChlbGVtZW50KS5wYXJlbnRzKCkuaXMoKGksIGVsKSA9PlxyXG4gICAgICAgICAoJChlbCkuZGF0YShcInNlbGVjdHNcIikgPT09IGNvbXBvbmVudClcclxuICAgICAgKTtcclxuICAgICAgcmV0dXJuIChzZWxlY3Rpb25FbGVtZW50SXNTZWxlY3RlZCB8fCBlbGVtZW50U2VsZWN0c0NvbXBvbmVudCk7XHJcbiAgIH1cclxuXHJcbiAgIGNvbnN0IHNldFNlbGVjdFRyaWdnZXIgPSAoY29tcG9uZW50OiBDb21wb25lbnQuSW5zdGFuY2UpID0+IHtcclxuICAgICAgLy8gU2VsZWN0aW5nIGNvbXBvbmVudCB0cmlnZ2VycyBzZWxlY3RcclxuICAgICAgJChjb21wb25lbnQuZ3JvdXAuZWxlbWVudCkub25lKFwibW91c2Vkb3duXCIsICgpID0+IHtcclxuICAgICAgICAgLypMT0dTVEFSVCovY29uc29sZS5ncm91cENvbGxhcHNlZChcIlNlbGVjdGVkXCIsIGNvbXBvbmVudC5ncm91cC5lbGVtZW50KTsvKkxPR0VORCovXHJcbiAgICAgICAgIC8qTE9HU1RBUlQqL2NvbnNvbGUubG9nKFwiUHJpbWFyeTogJW9cIiwgY29tcG9uZW50KTsvKkxPR0VORCovXHJcblxyXG4gICAgICAgICBjb25zdCBvdGhlckNvbXBvbmVudHMgPSBtYW5pZmVzdC5maW5kQ29ycmVzcG9uZGluZyhjb21wb25lbnQpO1xyXG4gICAgICAgICAvKkxPR1NUQVJUKi9jb25zb2xlLmxvZyhcIlNlY29uZGFyaWVzOiAlb1wiLCBvdGhlckNvbXBvbmVudHMpOy8qTE9HRU5EKi9cclxuXHJcbiAgICAgICAgIGNvbnN0IHNlbGVjdENvbXBvbmVudHMgPSBvdGhlckNvbXBvbmVudHMuY29uY2F0KGNvbXBvbmVudCk7XHJcbiAgICAgICAgIHNlbGVjdENvbXBvbmVudHMuZm9yRWFjaChzZWxlY3RDb21wb25lbnQgPT4ge1xyXG4gICAgICAgICAgICAkKHNlbGVjdENvbXBvbmVudC5ncm91cC5lbGVtZW50KS50cmlnZ2VyKEV2ZW50cy5zZWxlY3QpO1xyXG4gICAgICAgICAgICBzZXREZXNlbGVjdFRyaWdnZXIoc2VsZWN0Q29tcG9uZW50KTtcclxuICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAvKkxPR1NUQVJUKi9jb25zb2xlLmdyb3VwRW5kKCk7LypMT0dFTkQqL1xyXG4gICAgICB9KVxyXG5cclxuXHJcbiAgIH1cclxuXHJcbiAgIGNvbnN0IHNldERlc2VsZWN0VHJpZ2dlciA9IChjb21wb25lbnQ6IENvbXBvbmVudC5JbnN0YW5jZSkgPT4ge1xyXG4gICAgICAvLyBTZWxlY3RpbmcgYW55d2hlcmUgZWxzZSB0cmlnZ2VycyBkZXNlbGVjdFxyXG4gICAgICAkKGRvY3VtZW50KS5vbmUoXCJtb3VzZWRvd25cIiwgZSA9PiB7XHJcbiAgICAgICAgIC8vIENoZWNrcyB0YXJnZXQgaXNuJ3QgY2hpbGQgb2YgY29tcG9uZW50LCBpZ25vcmUgaWYgc29cclxuICAgICAgICAgaWYgKGVsZW1lbnRTZWxlY3RzQ29tcG9uZW50KGUudGFyZ2V0LCBjb21wb25lbnQpKSB7XHJcbiAgICAgICAgICAgIHNldERlc2VsZWN0VHJpZ2dlcihjb21wb25lbnQpO1xyXG4gICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKGNvbXBvbmVudC5ncm91cC5lbGVtZW50KS50cmlnZ2VyKEV2ZW50cy5kZXNlbGVjdCk7XHJcbiAgICAgICAgICAgIHNldFNlbGVjdFRyaWdnZXIoY29tcG9uZW50KTtcclxuICAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICB9XHJcblxyXG4gICBjb25zdCBzZXREaXNwbGF5SGFuZGxlcnMgPSAoY29tcG9uZW50OiBDb21wb25lbnQuSW5zdGFuY2UpID0+IHtcclxuICAgICAgJChjb21wb25lbnQuZ3JvdXAuZWxlbWVudCkub24oRXZlbnRzLnNlbGVjdCwgKCkgPT4ge1xyXG4gICAgICAgICAkKGNvbXBvbmVudC5ncm91cC5lbGVtZW50KS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICBjb21wb25lbnQuaW5zZXJ0SW50byhjb21wb25lbnQuZ3JvdXAuZWxlbWVudCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICAkKGNvbXBvbmVudC5ncm91cC5lbGVtZW50KS5vbihFdmVudHMuZGVzZWxlY3QsICgpID0+IHtcclxuICAgICAgICAgJChjb21wb25lbnQuZ3JvdXAuZWxlbWVudCkucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcclxuICAgICAgfSlcclxuICAgfVxyXG59Il19