"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Breadboard;
        (function (_Breadboard) {
            const defaulterSmall = {
                name: ValueCheck.validate("string", "breadboardsmall"),
                disabled: ValueCheck.validate("boolean", false),
                joints: ValueCheck.joints([{ x: 0, y: 0 }, { x: 20, y: 0 }]),
            };
            _Breadboard.makeSmall = getMaker(_Breadboard.Classes.Small, defaulterSmall, (component) => {
                Component.Addins.Graphical.init(component);
                Component.Addins.Board.init(component);
                Component.Addins.Selectable.init(component);
                Component.Addins.WireCreation.init(component);
                Component.Addins.Draggable.init(component);
                Component.Addins.Rotatable.init(component);
            });
        })(_Breadboard = Component._Breadboard || (Component._Breadboard = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLW1ha2VTbWFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3R5cGVzY3JpcHQvY2lyY3VpdC9jb21wb25lbnQvX0JyZWFkYm9hcmQvLW1ha2VTbWFsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsSUFBVSxPQUFPLENBb0JoQjtBQXBCRCxXQUFVLE9BQU87SUFBQyxJQUFBLFNBQVMsQ0FvQjFCO0lBcEJpQixXQUFBLFNBQVM7UUFBQyxJQUFBLFdBQVcsQ0FvQnRDO1FBcEIyQixXQUFBLFdBQVc7WUFDcEMsTUFBTSxjQUFjLEdBQXVDO2dCQUN4RCxJQUFJLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLENBQUM7Z0JBQ3RELFFBQVEsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUM7Z0JBQy9DLE1BQU0sRUFBRSxVQUFVLENBQUMsTUFBTSxDQUN0QixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUNuQzthQUNILENBQUM7WUFHVyxxQkFBUyxHQUFHLFFBQVEsQ0FBQyxZQUFBLE9BQU8sQ0FBQyxLQUFLLEVBQUUsY0FBYyxFQUM1RCxDQUFDLFNBQXdCLEVBQUUsRUFBRTtnQkFDMUIsVUFBQSxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDakMsVUFBQSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDN0IsVUFBQSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDbEMsVUFBQSxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDcEMsVUFBQSxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDakMsVUFBQSxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQ0gsQ0FBQztRQUNMLENBQUMsRUFwQjJCLFdBQVcsR0FBWCxxQkFBVyxLQUFYLHFCQUFXLFFBb0J0QztJQUFELENBQUMsRUFwQmlCLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBb0IxQjtBQUFELENBQUMsRUFwQlMsT0FBTyxLQUFQLE9BQU8sUUFvQmhCIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIn5jbGFzc2VzLnRzXCIgLz5cclxuXHJcbm5hbWVzcGFjZSBDaXJjdWl0LkNvbXBvbmVudC5fQnJlYWRib2FyZCB7XHJcbiAgIGNvbnN0IGRlZmF1bHRlclNtYWxsOiBWYWx1ZUNoZWNrLkRlZmF1bHRlcjxUeXBlcy52YWx1ZXM+ID0ge1xyXG4gICAgICBuYW1lOiBWYWx1ZUNoZWNrLnZhbGlkYXRlKFwic3RyaW5nXCIsIFwiYnJlYWRib2FyZHNtYWxsXCIpLFxyXG4gICAgICBkaXNhYmxlZDogVmFsdWVDaGVjay52YWxpZGF0ZShcImJvb2xlYW5cIiwgZmFsc2UpLFxyXG4gICAgICBqb2ludHM6IFZhbHVlQ2hlY2suam9pbnRzPFtWZWN0b3IsIFZlY3Rvcl0+KFxyXG4gICAgICAgICBbeyB4OiAwLCB5OiAwIH0sIHsgeDogMjAsIHk6IDAgfV1cclxuICAgICAgKSxcclxuICAgfTtcclxuXHJcblxyXG4gICBleHBvcnQgY29uc3QgbWFrZVNtYWxsID0gZ2V0TWFrZXIoQ2xhc3Nlcy5TbWFsbCwgZGVmYXVsdGVyU21hbGwsXHJcbiAgICAgIChjb21wb25lbnQ6IENsYXNzZXMuU21hbGwpID0+IHtcclxuICAgICAgICAgQWRkaW5zLkdyYXBoaWNhbC5pbml0KGNvbXBvbmVudCk7XHJcbiAgICAgICAgIEFkZGlucy5Cb2FyZC5pbml0KGNvbXBvbmVudCk7XHJcbiAgICAgICAgIEFkZGlucy5TZWxlY3RhYmxlLmluaXQoY29tcG9uZW50KTtcclxuICAgICAgICAgQWRkaW5zLldpcmVDcmVhdGlvbi5pbml0KGNvbXBvbmVudCk7XHJcbiAgICAgICAgIEFkZGlucy5EcmFnZ2FibGUuaW5pdChjb21wb25lbnQpO1xyXG4gICAgICAgICBBZGRpbnMuUm90YXRhYmxlLmluaXQoY29tcG9uZW50KTtcclxuICAgICAgfVxyXG4gICApO1xyXG59Il19