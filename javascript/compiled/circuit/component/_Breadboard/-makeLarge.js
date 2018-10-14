"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Breadboard;
        (function (_Breadboard) {
            const defaulterLarge = {
                name: ValueCheck.validate("string", "breadboardlarge"),
                disabled: ValueCheck.validate("boolean", false),
                joints: ValueCheck.joints([{ x: 0, y: 0 }, { x: 20, y: 0 }]),
            };
            _Breadboard.makeLarge = getMaker(_Breadboard.Classes.Large, defaulterLarge, (component) => {
                Component.Addins.Graphical.init(component);
                Component.Addins.Board.init(component);
                Component.Addins.Selectable.init(component);
                Component.Addins.WireCreation.init(component);
                Component.Addins.Draggable.init(component);
            });
        })(_Breadboard = Component._Breadboard || (Component._Breadboard = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLW1ha2VMYXJnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3R5cGVzY3JpcHQvY2lyY3VpdC9jb21wb25lbnQvX0JyZWFkYm9hcmQvLW1ha2VMYXJnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsSUFBVSxPQUFPLENBa0JoQjtBQWxCRCxXQUFVLE9BQU87SUFBQyxJQUFBLFNBQVMsQ0FrQjFCO0lBbEJpQixXQUFBLFNBQVM7UUFBQyxJQUFBLFdBQVcsQ0FrQnRDO1FBbEIyQixXQUFBLFdBQVc7WUFDcEMsTUFBTSxjQUFjLEdBQXVDO2dCQUN4RCxJQUFJLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLENBQUM7Z0JBQ3RELFFBQVEsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUM7Z0JBQy9DLE1BQU0sRUFBRSxVQUFVLENBQUMsTUFBTSxDQUN0QixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUNuQzthQUNILENBQUM7WUFFVyxxQkFBUyxHQUFHLFFBQVEsQ0FBQyxZQUFBLE9BQU8sQ0FBQyxLQUFLLEVBQUUsY0FBYyxFQUM1RCxDQUFDLFNBQXdCLEVBQUUsRUFBRTtnQkFDMUIsVUFBQSxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDakMsVUFBQSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDN0IsVUFBQSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDbEMsVUFBQSxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDcEMsVUFBQSxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQ0gsQ0FBQztRQUNMLENBQUMsRUFsQjJCLFdBQVcsR0FBWCxxQkFBVyxLQUFYLHFCQUFXLFFBa0J0QztJQUFELENBQUMsRUFsQmlCLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBa0IxQjtBQUFELENBQUMsRUFsQlMsT0FBTyxLQUFQLE9BQU8sUUFrQmhCIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIn5jbGFzc2VzLnRzXCIgLz5cclxuXHJcbm5hbWVzcGFjZSBDaXJjdWl0LkNvbXBvbmVudC5fQnJlYWRib2FyZCB7XHJcbiAgIGNvbnN0IGRlZmF1bHRlckxhcmdlOiBWYWx1ZUNoZWNrLkRlZmF1bHRlcjxUeXBlcy52YWx1ZXM+ID0ge1xyXG4gICAgICBuYW1lOiBWYWx1ZUNoZWNrLnZhbGlkYXRlKFwic3RyaW5nXCIsIFwiYnJlYWRib2FyZGxhcmdlXCIpLFxyXG4gICAgICBkaXNhYmxlZDogVmFsdWVDaGVjay52YWxpZGF0ZShcImJvb2xlYW5cIiwgZmFsc2UpLFxyXG4gICAgICBqb2ludHM6IFZhbHVlQ2hlY2suam9pbnRzPFtWZWN0b3IsIFZlY3Rvcl0+KFxyXG4gICAgICAgICBbeyB4OiAwLCB5OiAwIH0sIHsgeDogMjAsIHk6IDAgfV1cclxuICAgICAgKSxcclxuICAgfTtcclxuXHJcbiAgIGV4cG9ydCBjb25zdCBtYWtlTGFyZ2UgPSBnZXRNYWtlcihDbGFzc2VzLkxhcmdlLCBkZWZhdWx0ZXJMYXJnZSxcclxuICAgICAgKGNvbXBvbmVudDogQ2xhc3Nlcy5MYXJnZSkgPT4ge1xyXG4gICAgICAgICBBZGRpbnMuR3JhcGhpY2FsLmluaXQoY29tcG9uZW50KTtcclxuICAgICAgICAgQWRkaW5zLkJvYXJkLmluaXQoY29tcG9uZW50KTtcclxuICAgICAgICAgQWRkaW5zLlNlbGVjdGFibGUuaW5pdChjb21wb25lbnQpO1xyXG4gICAgICAgICBBZGRpbnMuV2lyZUNyZWF0aW9uLmluaXQoY29tcG9uZW50KTtcclxuICAgICAgICAgQWRkaW5zLkRyYWdnYWJsZS5pbml0KGNvbXBvbmVudCk7XHJcbiAgICAgIH1cclxuICAgKTtcclxufSJdfQ==