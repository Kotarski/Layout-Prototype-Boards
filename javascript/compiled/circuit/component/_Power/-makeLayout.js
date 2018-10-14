"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Power;
        (function (_Power) {
            const defaulterLayout = {
                name: ValueCheck.validate("string", "power"),
                disabled: ValueCheck.validate("boolean", false),
                joints: ValueCheck.joints([{ x: 0, y: 40 }]),
                voltage: ValueCheck.validate("number", 0)
            };
            _Power.makeLayout = getMaker(_Power.Classes.Layout, defaulterLayout, (component) => {
                Component.Addins.Graphical.init(component);
                Component.Addins.Draggable.init(component);
                Component.Addins.Selectable.init(component);
                Component.Addins.ConnectionHighlights.init(component, true, getHighlightColor(component));
                Component.Addins.WireCreation.init(component);
            });
            function getHighlightColor(component) {
                return [(component.voltage < 0)
                        ? "blue"
                        : (component.voltage > 0)
                            ? "red"
                            : "black"
                ];
            }
        })(_Power = Component._Power || (Component._Power = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLW1ha2VMYXlvdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50L19Qb3dlci8tbWFrZUxheW91dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsSUFBVSxPQUFPLENBNEJoQjtBQTVCRCxXQUFVLE9BQU87SUFBQyxJQUFBLFNBQVMsQ0E0QjFCO0lBNUJpQixXQUFBLFNBQVM7UUFBQyxJQUFBLE1BQU0sQ0E0QmpDO1FBNUIyQixXQUFBLE1BQU07WUFDL0IsTUFBTSxlQUFlLEdBQXVDO2dCQUN6RCxJQUFJLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDO2dCQUM1QyxRQUFRLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDO2dCQUMvQyxNQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FDdEIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQ25CO2dCQUNELE9BQU8sRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7YUFDM0MsQ0FBQztZQUVXLGlCQUFVLEdBQUcsUUFBUSxDQUFDLE9BQUEsT0FBTyxDQUFDLE1BQU0sRUFBRSxlQUFlLEVBQy9ELENBQUMsU0FBeUIsRUFBRSxFQUFFO2dCQUMzQixVQUFBLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNqQyxVQUFBLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNqQyxVQUFBLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNsQyxVQUFBLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNoRixVQUFBLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZDLENBQUMsQ0FDSCxDQUFDO1lBRUYsU0FBUyxpQkFBaUIsQ0FBQyxTQUF5QjtnQkFDakQsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7d0JBQzVCLENBQUMsQ0FBQyxNQUFNO3dCQUNSLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDOzRCQUN0QixDQUFDLENBQUMsS0FBSzs0QkFDUCxDQUFDLENBQUMsT0FBTztpQkFDZCxDQUFBO1lBQ0osQ0FBQztRQUNKLENBQUMsRUE1QjJCLE1BQU0sR0FBTixnQkFBTSxLQUFOLGdCQUFNLFFBNEJqQztJQUFELENBQUMsRUE1QmlCLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBNEIxQjtBQUFELENBQUMsRUE1QlMsT0FBTyxLQUFQLE9BQU8sUUE0QmhCIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIn5jbGFzc2VzLnRzXCIgLz5cclxuXHJcbm5hbWVzcGFjZSBDaXJjdWl0LkNvbXBvbmVudC5fUG93ZXIge1xyXG4gICBjb25zdCBkZWZhdWx0ZXJMYXlvdXQ6IFZhbHVlQ2hlY2suRGVmYXVsdGVyPFR5cGVzLnZhbHVlcz4gPSB7XHJcbiAgICAgIG5hbWU6IFZhbHVlQ2hlY2sudmFsaWRhdGUoXCJzdHJpbmdcIiwgXCJwb3dlclwiKSxcclxuICAgICAgZGlzYWJsZWQ6IFZhbHVlQ2hlY2sudmFsaWRhdGUoXCJib29sZWFuXCIsIGZhbHNlKSxcclxuICAgICAgam9pbnRzOiBWYWx1ZUNoZWNrLmpvaW50czxbVmVjdG9yXT4oXHJcbiAgICAgICAgIFt7IHg6IDAsIHk6IDQwIH1dXHJcbiAgICAgICksXHJcbiAgICAgIHZvbHRhZ2U6IFZhbHVlQ2hlY2sudmFsaWRhdGUoXCJudW1iZXJcIiwgMClcclxuICAgfTtcclxuXHJcbiAgIGV4cG9ydCBjb25zdCBtYWtlTGF5b3V0ID0gZ2V0TWFrZXIoQ2xhc3Nlcy5MYXlvdXQsIGRlZmF1bHRlckxheW91dCxcclxuICAgICAgKGNvbXBvbmVudDogQ2xhc3Nlcy5MYXlvdXQpID0+IHtcclxuICAgICAgICAgQWRkaW5zLkdyYXBoaWNhbC5pbml0KGNvbXBvbmVudCk7XHJcbiAgICAgICAgIEFkZGlucy5EcmFnZ2FibGUuaW5pdChjb21wb25lbnQpO1xyXG4gICAgICAgICBBZGRpbnMuU2VsZWN0YWJsZS5pbml0KGNvbXBvbmVudCk7XHJcbiAgICAgICAgIEFkZGlucy5Db25uZWN0aW9uSGlnaGxpZ2h0cy5pbml0KGNvbXBvbmVudCwgdHJ1ZSwgZ2V0SGlnaGxpZ2h0Q29sb3IoY29tcG9uZW50KSk7XHJcbiAgICAgICAgIEFkZGlucy5XaXJlQ3JlYXRpb24uaW5pdChjb21wb25lbnQpO1xyXG4gICAgICB9XHJcbiAgICk7XHJcblxyXG4gICBmdW5jdGlvbiBnZXRIaWdobGlnaHRDb2xvcihjb21wb25lbnQ6IENsYXNzZXMuTGF5b3V0KTogc3RyaW5nW10ge1xyXG4gICAgICByZXR1cm4gWyhjb21wb25lbnQudm9sdGFnZSA8IDApXHJcbiAgICAgICAgID8gXCJibHVlXCIgLy8gbmVnYXRpdmVcclxuICAgICAgICAgOiAoY29tcG9uZW50LnZvbHRhZ2UgPiAwKVxyXG4gICAgICAgICAgICA/IFwicmVkXCIgLy8gcG9zaXRpdmVcclxuICAgICAgICAgICAgOiBcImJsYWNrXCIgLy8gemVybyAoZ3JvdW5kKTtcclxuICAgICAgXVxyXG4gICB9XHJcbn0iXX0=