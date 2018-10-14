"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Resistor;
        (function (_Resistor) {
            var Classes;
            (function (Classes) {
                class Base extends Component.Instance {
                    constructor(values) {
                        super(values);
                        this.joints = values.joints;
                        this.resistance = values.resistance;
                    }
                    getProperties() {
                        return Utility.deepCopy({
                            name: this.name,
                            resistance: this.resistance
                        });
                    }
                    getState() {
                        return Utility.deepCopy({
                            joints: this.joints,
                            disabled: this.disabled
                        });
                    }
                    insertInto(element) {
                        Utility.Insert.last(this.group.element, element);
                    }
                    transferFunction() { return []; }
                    ;
                }
                class Schematic extends Base {
                    draw() {
                        this.group.prepend(_Resistor.drawSchematic(this));
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, manifest.schematic);
                    }
                    makeConnectors() {
                        this.connectorSets = [
                            [Component.Generics.makeConnector(this, "", "node", this.joints[_Resistor.INDEXEND1]),
                                Component.Generics.makeConnector(this, "", "node", this.joints[_Resistor.INDEXEND2]),]
                        ];
                    }
                }
                Classes.Schematic = Schematic;
                class Layout extends Base {
                    draw() {
                        this.group.prepend(_Resistor.drawLayout(this));
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, manifest.layout);
                    }
                    makeConnectors() {
                        this.connectorSets = [
                            [Component.Generics.makeConnector(this, "", "pin", this.joints[_Resistor.INDEXEND1]),
                                Component.Generics.makeConnector(this, "", "pin", this.joints[_Resistor.INDEXEND2]),]
                        ];
                    }
                }
                Classes.Layout = Layout;
            })(Classes = _Resistor.Classes || (_Resistor.Classes = {}));
        })(_Resistor = Component._Resistor || (Component._Resistor = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoifmNsYXNzZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50L19SZXNpc3Rvci9+Y2xhc3Nlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxPQUFPLENBZ0VoQjtBQWhFRCxXQUFVLE9BQU87SUFBQyxJQUFBLFNBQVMsQ0FnRTFCO0lBaEVpQixXQUFBLFNBQVM7UUFBQyxJQUFBLFNBQVMsQ0FnRXBDO1FBaEUyQixXQUFBLFNBQVM7WUFBQyxJQUFBLE9BQU8sQ0FnRTVDO1lBaEVxQyxXQUFBLE9BQU87Z0JBRTFDLE1BQWUsSUFBSyxTQUFRLFNBQVMsQ0FBQyxRQUFRO29CQUkzQyxZQUFZLE1BQW9CO3dCQUM3QixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO3dCQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7b0JBQ3ZDLENBQUM7b0JBRUQsYUFBYTt3QkFDVixPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUM7NEJBQ3JCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTs0QkFDZixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7eUJBQzdCLENBQUMsQ0FBQztvQkFDTixDQUFDO29CQUVELFFBQVE7d0JBQ0wsT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDOzRCQUNyQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07NEJBQ25CLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTt5QkFDekIsQ0FBQyxDQUFDO29CQUNOLENBQUM7b0JBRUQsVUFBVSxDQUFDLE9BQTRCO3dCQUNwQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDcEQsQ0FBQztvQkFFRCxnQkFBZ0IsS0FBSyxPQUFPLEVBQUUsQ0FBQSxDQUFDLENBQUM7b0JBQUEsQ0FBQztpQkFDbkM7Z0JBRUQsTUFBYSxTQUFVLFNBQVEsSUFBSTtvQkFDaEMsSUFBSTt3QkFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUMzQyxDQUFDO29CQUNELGNBQWM7d0JBQ1gsT0FBTyxVQUFBLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNyRSxDQUFDO29CQUNELGNBQWM7d0JBQ1gsSUFBSSxDQUFDLGFBQWEsR0FBRzs0QkFDbEIsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUEsU0FBUyxDQUFDLENBQUM7Z0NBQzNFLFNBQVMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQSxTQUFTLENBQUMsQ0FBQyxFQUFFO3lCQUM5RSxDQUFBO29CQUNKLENBQUM7aUJBQ0g7Z0JBZFksaUJBQVMsWUFjckIsQ0FBQTtnQkFFRCxNQUFhLE1BQU8sU0FBUSxJQUFJO29CQUM3QixJQUFJO3dCQUVELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3hDLENBQUM7b0JBQ0QsY0FBYzt3QkFDWCxPQUFPLFVBQUEsUUFBUSxDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2xFLENBQUM7b0JBQ0QsY0FBYzt3QkFDWCxJQUFJLENBQUMsYUFBYSxHQUFHOzRCQUNsQixDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQSxTQUFTLENBQUMsQ0FBQztnQ0FDMUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLFNBQVMsQ0FBQyxDQUFDLEVBQUU7eUJBQzdFLENBQUE7b0JBQ0osQ0FBQztpQkFDSDtnQkFkWSxjQUFNLFNBY2xCLENBQUE7WUFDSixDQUFDLEVBaEVxQyxPQUFPLEdBQVAsaUJBQU8sS0FBUCxpQkFBTyxRQWdFNUM7UUFBRCxDQUFDLEVBaEUyQixTQUFTLEdBQVQsbUJBQVMsS0FBVCxtQkFBUyxRQWdFcEM7SUFBRCxDQUFDLEVBaEVpQixTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQWdFMUI7QUFBRCxDQUFDLEVBaEVTLE9BQU8sS0FBUCxPQUFPLFFBZ0VoQiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBDaXJjdWl0LkNvbXBvbmVudC5fUmVzaXN0b3IuQ2xhc3NlcyB7XHJcblxyXG4gICBhYnN0cmFjdCBjbGFzcyBCYXNlIGV4dGVuZHMgQ29tcG9uZW50Lkluc3RhbmNlIGltcGxlbWVudHMgVHlwZXMudmFsdWVzIHtcclxuICAgICAgcmVzaXN0YW5jZTogbnVtYmVyO1xyXG4gICAgICBqb2ludHM6IFtWZWN0b3IsIFZlY3Rvcl07XHJcblxyXG4gICAgICBjb25zdHJ1Y3Rvcih2YWx1ZXM6IFR5cGVzLnZhbHVlcykge1xyXG4gICAgICAgICBzdXBlcih2YWx1ZXMpO1xyXG4gICAgICAgICB0aGlzLmpvaW50cyA9IHZhbHVlcy5qb2ludHM7XHJcbiAgICAgICAgIHRoaXMucmVzaXN0YW5jZSA9IHZhbHVlcy5yZXNpc3RhbmNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBnZXRQcm9wZXJ0aWVzKCk6IFR5cGVzLnByb3BlcnRpZXMge1xyXG4gICAgICAgICByZXR1cm4gVXRpbGl0eS5kZWVwQ29weSh7XHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcclxuICAgICAgICAgICAgcmVzaXN0YW5jZTogdGhpcy5yZXNpc3RhbmNlXHJcbiAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBnZXRTdGF0ZSgpOiBUeXBlcy5zdGF0ZSB7XHJcbiAgICAgICAgIHJldHVybiBVdGlsaXR5LmRlZXBDb3B5KHtcclxuICAgICAgICAgICAgam9pbnRzOiB0aGlzLmpvaW50cyxcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZGlzYWJsZWRcclxuICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGluc2VydEludG8oZWxlbWVudD86IFNWR0dyYXBoaWNzRWxlbWVudCkge1xyXG4gICAgICAgICBVdGlsaXR5Lkluc2VydC5sYXN0KHRoaXMuZ3JvdXAuZWxlbWVudCwgZWxlbWVudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRyYW5zZmVyRnVuY3Rpb24oKSB7IHJldHVybiBbXSB9O1xyXG4gICB9XHJcblxyXG4gICBleHBvcnQgY2xhc3MgU2NoZW1hdGljIGV4dGVuZHMgQmFzZSB7XHJcbiAgICAgIGRyYXcoKSB7XHJcbiAgICAgICAgIC8vKFByZXBlbmQgc28gaGFuZGxlcyBhcHBlYXIgb24gdG9wKVxyXG4gICAgICAgICB0aGlzLmdyb3VwLnByZXBlbmQoZHJhd1NjaGVtYXRpYyh0aGlzKSk7XHJcbiAgICAgIH1cclxuICAgICAgZ2V0Q29ubmVjdGlvbnMoKTogQ29tcG9uZW50LlR5cGVzLmNvbm5lY3RvcltdW11bXSB7XHJcbiAgICAgICAgIHJldHVybiBHZW5lcmljcy5nZXRDb21wb25lbnRDb25uZWN0aW9ucyh0aGlzLCBtYW5pZmVzdC5zY2hlbWF0aWMpO1xyXG4gICAgICB9XHJcbiAgICAgIG1ha2VDb25uZWN0b3JzKCkge1xyXG4gICAgICAgICB0aGlzLmNvbm5lY3RvclNldHMgPSBbXHJcbiAgICAgICAgICAgIFtDb21wb25lbnQuR2VuZXJpY3MubWFrZUNvbm5lY3Rvcih0aGlzLCBcIlwiLCBcIm5vZGVcIiwgdGhpcy5qb2ludHNbSU5ERVhFTkQxXSksXHJcbiAgICAgICAgICAgIENvbXBvbmVudC5HZW5lcmljcy5tYWtlQ29ubmVjdG9yKHRoaXMsIFwiXCIsIFwibm9kZVwiLCB0aGlzLmpvaW50c1tJTkRFWEVORDJdKSxdXHJcbiAgICAgICAgIF1cclxuICAgICAgfVxyXG4gICB9XHJcblxyXG4gICBleHBvcnQgY2xhc3MgTGF5b3V0IGV4dGVuZHMgQmFzZSB7XHJcbiAgICAgIGRyYXcoKSB7XHJcbiAgICAgICAgIC8vKFByZXBlbmQgc28gaGFuZGxlcyBhcHBlYXIgb24gdG9wKVxyXG4gICAgICAgICB0aGlzLmdyb3VwLnByZXBlbmQoZHJhd0xheW91dCh0aGlzKSk7XHJcbiAgICAgIH1cclxuICAgICAgZ2V0Q29ubmVjdGlvbnMoKTogQ29tcG9uZW50LlR5cGVzLmNvbm5lY3RvcltdW11bXSB7XHJcbiAgICAgICAgIHJldHVybiBHZW5lcmljcy5nZXRDb21wb25lbnRDb25uZWN0aW9ucyh0aGlzLCBtYW5pZmVzdC5sYXlvdXQpO1xyXG4gICAgICB9XHJcbiAgICAgIG1ha2VDb25uZWN0b3JzKCkge1xyXG4gICAgICAgICB0aGlzLmNvbm5lY3RvclNldHMgPSBbXHJcbiAgICAgICAgICAgIFtDb21wb25lbnQuR2VuZXJpY3MubWFrZUNvbm5lY3Rvcih0aGlzLCBcIlwiLCBcInBpblwiLCB0aGlzLmpvaW50c1tJTkRFWEVORDFdKSxcclxuICAgICAgICAgICAgQ29tcG9uZW50LkdlbmVyaWNzLm1ha2VDb25uZWN0b3IodGhpcywgXCJcIiwgXCJwaW5cIiwgdGhpcy5qb2ludHNbSU5ERVhFTkQyXSksXVxyXG4gICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgfVxyXG59XHJcbiJdfQ==