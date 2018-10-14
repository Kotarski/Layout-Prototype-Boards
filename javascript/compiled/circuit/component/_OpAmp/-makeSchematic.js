"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _OpAmp;
        (function (_OpAmp) {
            const defaulterSchematic = {
                name: ValueCheck.validate("string", "opAmp"),
                disabled: ValueCheck.validate("boolean", false),
                joints: ValueCheck.joints([{ x: -30, y: -10 }, { x: -30, y: +10 }, { x: 40, y: 0 }, { x: 0, y: -20 }, { x: 0, y: 20 }]),
                offsetVoltage: ValueCheck.validate("number", 0)
            };
            _OpAmp.makeSchematic = getMaker(_OpAmp.Classes.Schematic, defaulterSchematic, (component) => {
                Component.Addins.Selectable.init(component);
                Component.Addins.ConnectionHighlights.init(component, false);
                Component.Addins.Graphical.init(component);
                if (Constants.schematicManipulationEnabled) {
                    Component.Addins.Draggable.init(component);
                    Component.Addins.Extendable.init(component);
                }
            });
        })(_OpAmp = Component._OpAmp || (Component._OpAmp = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLW1ha2VTY2hlbWF0aWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50L19PcEFtcC8tbWFrZVNjaGVtYXRpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsSUFBVSxPQUFPLENBc0JoQjtBQXRCRCxXQUFVLE9BQU87SUFBQyxJQUFBLFNBQVMsQ0FzQjFCO0lBdEJpQixXQUFBLFNBQVM7UUFBQyxJQUFBLE1BQU0sQ0FzQmpDO1FBdEIyQixXQUFBLE1BQU07WUFDL0IsTUFBTSxrQkFBa0IsR0FBZ0Q7Z0JBQ3JFLElBQUksRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUM7Z0JBQzVDLFFBQVEsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUM7Z0JBQy9DLE1BQU0sRUFBRSxVQUFVLENBQUMsTUFBTSxDQUN0QixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FDOUY7Z0JBQ0QsYUFBYSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzthQUNqRCxDQUFDO1lBR1csb0JBQWEsR0FBRyxRQUFRLENBQUMsT0FBQSxPQUFPLENBQUMsU0FBUyxFQUFFLGtCQUFrQixFQUN4RSxDQUFDLFNBQTRCLEVBQUUsRUFBRTtnQkFDOUIsVUFBQSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDbEMsVUFBQSxNQUFNLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDbkQsVUFBQSxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDakMsSUFBSSxTQUFTLENBQUMsNEJBQTRCLEVBQUU7b0JBQ3pDLFVBQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ2pDLFVBQUEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQ3BDO1lBQ0osQ0FBQyxDQUNILENBQUM7UUFDTCxDQUFDLEVBdEIyQixNQUFNLEdBQU4sZ0JBQU0sS0FBTixnQkFBTSxRQXNCakM7SUFBRCxDQUFDLEVBdEJpQixTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQXNCMUI7QUFBRCxDQUFDLEVBdEJTLE9BQU8sS0FBUCxPQUFPLFFBc0JoQiIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJ+Y2xhc3Nlcy50c1wiIC8+XHJcblxyXG5uYW1lc3BhY2UgQ2lyY3VpdC5Db21wb25lbnQuX09wQW1wIHtcclxuICAgY29uc3QgZGVmYXVsdGVyU2NoZW1hdGljOiBWYWx1ZUNoZWNrLkRlZmF1bHRlcjxUeXBlcy52YWx1ZXNTY2hlbWF0aWM+ID0ge1xyXG4gICAgICBuYW1lOiBWYWx1ZUNoZWNrLnZhbGlkYXRlKFwic3RyaW5nXCIsIFwib3BBbXBcIiksXHJcbiAgICAgIGRpc2FibGVkOiBWYWx1ZUNoZWNrLnZhbGlkYXRlKFwiYm9vbGVhblwiLCBmYWxzZSksXHJcbiAgICAgIGpvaW50czogVmFsdWVDaGVjay5qb2ludHM8W1ZlY3RvciwgVmVjdG9yLCBWZWN0b3IsIFZlY3RvciwgVmVjdG9yXT4oXHJcbiAgICAgICAgIFt7IHg6IC0zMCwgeTogLTEwIH0sIHsgeDogLTMwLCB5OiArMTAgfSwgeyB4OiA0MCwgeTogMCB9LCB7IHg6IDAsIHk6IC0yMCB9LCB7IHg6IDAsIHk6IDIwIH1dXHJcbiAgICAgICksXHJcbiAgICAgIG9mZnNldFZvbHRhZ2U6IFZhbHVlQ2hlY2sudmFsaWRhdGUoXCJudW1iZXJcIiwgMClcclxuICAgfTtcclxuXHJcblxyXG4gICBleHBvcnQgY29uc3QgbWFrZVNjaGVtYXRpYyA9IGdldE1ha2VyKENsYXNzZXMuU2NoZW1hdGljLCBkZWZhdWx0ZXJTY2hlbWF0aWMsXHJcbiAgICAgIChjb21wb25lbnQ6IENsYXNzZXMuU2NoZW1hdGljKSA9PiB7XHJcbiAgICAgICAgIEFkZGlucy5TZWxlY3RhYmxlLmluaXQoY29tcG9uZW50KTtcclxuICAgICAgICAgQWRkaW5zLkNvbm5lY3Rpb25IaWdobGlnaHRzLmluaXQoY29tcG9uZW50LCBmYWxzZSk7XHJcbiAgICAgICAgIEFkZGlucy5HcmFwaGljYWwuaW5pdChjb21wb25lbnQpO1xyXG4gICAgICAgICBpZiAoQ29uc3RhbnRzLnNjaGVtYXRpY01hbmlwdWxhdGlvbkVuYWJsZWQpIHtcclxuICAgICAgICAgICAgQWRkaW5zLkRyYWdnYWJsZS5pbml0KGNvbXBvbmVudCk7XHJcbiAgICAgICAgICAgIEFkZGlucy5FeHRlbmRhYmxlLmluaXQoY29tcG9uZW50KTtcclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICk7XHJcbn0iXX0=