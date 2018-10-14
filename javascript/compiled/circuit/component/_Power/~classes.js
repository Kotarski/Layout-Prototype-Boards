"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Power;
        (function (_Power) {
            var Classes;
            (function (Classes) {
                class Base extends Component.Instance {
                    constructor(values) {
                        super(values);
                        this.voltage = values.voltage;
                        this.joints = values.joints;
                    }
                    getProperties() {
                        return Utility.deepCopy({
                            name: this.name,
                            voltage: this.voltage
                        });
                    }
                    getState() {
                        return Utility.deepCopy({
                            joints: this.joints,
                            disabled: this.disabled
                        });
                    }
                    transferFunction() { return []; }
                    ;
                }
                class Schematic extends Base {
                    insertInto(element) {
                        Utility.Insert.last(this.group.element, element);
                    }
                    makeConnectors() {
                        this.connectorSets = [
                            [Component.Generics.makeConnector(this, "", "node", this.joints[0])]
                        ];
                    }
                    draw() {
                        this.group.prepend(_Power.drawSchematic(this));
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, manifest.schematic);
                    }
                }
                Classes.Schematic = Schematic;
                class Layout extends Base {
                    constructor() {
                        super(...arguments);
                        this.connectorSets = [];
                    }
                    insertInto(element) {
                        Utility.Insert.after(this.group.element, element, ".board");
                    }
                    makeConnectors() {
                        this.connectorSets = [[
                                Component.Generics.makeConnector(this, "", "hole", this.joints[0])
                            ]];
                    }
                    draw() {
                        this.group.prepend(_Power.drawLayout(this));
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, manifest.layout);
                    }
                }
                Classes.Layout = Layout;
            })(Classes = _Power.Classes || (_Power.Classes = {}));
        })(_Power = Component._Power || (Component._Power = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoifmNsYXNzZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50L19Qb3dlci9+Y2xhc3Nlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxPQUFPLENBMEVoQjtBQTFFRCxXQUFVLE9BQU87SUFBQyxJQUFBLFNBQVMsQ0EwRTFCO0lBMUVpQixXQUFBLFNBQVM7UUFBQyxJQUFBLE1BQU0sQ0EwRWpDO1FBMUUyQixXQUFBLE1BQU07WUFBQyxJQUFBLE9BQU8sQ0EwRXpDO1lBMUVrQyxXQUFBLE9BQU87Z0JBRXZDLE1BQWUsSUFBSyxTQUFRLFNBQVMsQ0FBQyxRQUFRO29CQUkzQyxZQUFZLE1BQW9CO3dCQUM3QixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ2QsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO3dCQUM5QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7b0JBQy9CLENBQUM7b0JBRUQsYUFBYTt3QkFDVixPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUM7NEJBQ3JCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTs0QkFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87eUJBQ3ZCLENBQUMsQ0FBQztvQkFDTixDQUFDO29CQUVELFFBQVE7d0JBQ0wsT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDOzRCQUNyQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07NEJBQ25CLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTt5QkFDekIsQ0FBQyxDQUFDO29CQUNOLENBQUM7b0JBRUQsZ0JBQWdCLEtBQUssT0FBTyxFQUFFLENBQUEsQ0FBQyxDQUFDO29CQUFBLENBQUM7aUJBQ25DO2dCQUVELE1BQWEsU0FBVSxTQUFRLElBQUk7b0JBQ2hDLFVBQVUsQ0FBQyxPQUE0Qjt3QkFDcEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQ3BELENBQUM7b0JBR0QsY0FBYzt3QkFDWCxJQUFJLENBQUMsYUFBYSxHQUFHOzRCQUNsQixDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDdEUsQ0FBQTtvQkFDSixDQUFDO29CQUVELElBQUk7d0JBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBQSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDM0MsQ0FBQztvQkFFRCxjQUFjO3dCQUNYLE9BQU8sVUFBQSxRQUFRLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDckUsQ0FBQztpQkFDSDtnQkFwQlksaUJBQVMsWUFvQnJCLENBQUE7Z0JBRUQsTUFBYSxNQUFPLFNBQVEsSUFBSTtvQkFBaEM7O3dCQUNHLGtCQUFhLEdBQTZCLEVBQUUsQ0FBQztvQkFxQmhELENBQUM7b0JBbkJFLFVBQVUsQ0FBQyxPQUE0Qjt3QkFDcEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUMvRCxDQUFDO29CQUdELGNBQWM7d0JBQ1gsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDO2dDQUNuQixTQUFTLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOzZCQUNwRSxDQUFDLENBQUE7b0JBQ0wsQ0FBQztvQkFFRCxJQUFJO3dCQUVELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQUEsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3hDLENBQUM7b0JBRUQsY0FBYzt3QkFDWCxPQUFPLFVBQUEsUUFBUSxDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2xFLENBQUM7aUJBQ0g7Z0JBdEJZLGNBQU0sU0FzQmxCLENBQUE7WUFDSixDQUFDLEVBMUVrQyxPQUFPLEdBQVAsY0FBTyxLQUFQLGNBQU8sUUEwRXpDO1FBQUQsQ0FBQyxFQTFFMkIsTUFBTSxHQUFOLGdCQUFNLEtBQU4sZ0JBQU0sUUEwRWpDO0lBQUQsQ0FBQyxFQTFFaUIsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUEwRTFCO0FBQUQsQ0FBQyxFQTFFUyxPQUFPLEtBQVAsT0FBTyxRQTBFaEIiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgQ2lyY3VpdC5Db21wb25lbnQuX1Bvd2VyLkNsYXNzZXMge1xyXG5cclxuICAgYWJzdHJhY3QgY2xhc3MgQmFzZSBleHRlbmRzIENvbXBvbmVudC5JbnN0YW5jZSBpbXBsZW1lbnRzIFR5cGVzLnZhbHVlcyB7XHJcbiAgICAgIHZvbHRhZ2U6IG51bWJlcjtcclxuICAgICAgam9pbnRzOiBbVmVjdG9yXTtcclxuXHJcbiAgICAgIGNvbnN0cnVjdG9yKHZhbHVlczogVHlwZXMudmFsdWVzKSB7XHJcbiAgICAgICAgIHN1cGVyKHZhbHVlcyk7XHJcbiAgICAgICAgIHRoaXMudm9sdGFnZSA9IHZhbHVlcy52b2x0YWdlO1xyXG4gICAgICAgICB0aGlzLmpvaW50cyA9IHZhbHVlcy5qb2ludHM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGdldFByb3BlcnRpZXMoKTogVHlwZXMucHJvcGVydGllcyB7XHJcbiAgICAgICAgIHJldHVybiBVdGlsaXR5LmRlZXBDb3B5KHtcclxuICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxyXG4gICAgICAgICAgICB2b2x0YWdlOiB0aGlzLnZvbHRhZ2VcclxuICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGdldFN0YXRlKCk6IFR5cGVzLnN0YXRlIHtcclxuICAgICAgICAgcmV0dXJuIFV0aWxpdHkuZGVlcENvcHkoe1xyXG4gICAgICAgICAgICBqb2ludHM6IHRoaXMuam9pbnRzLFxyXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5kaXNhYmxlZFxyXG4gICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdHJhbnNmZXJGdW5jdGlvbigpIHsgcmV0dXJuIFtdIH07XHJcbiAgIH1cclxuXHJcbiAgIGV4cG9ydCBjbGFzcyBTY2hlbWF0aWMgZXh0ZW5kcyBCYXNlIHtcclxuICAgICAgaW5zZXJ0SW50byhlbGVtZW50PzogU1ZHR3JhcGhpY3NFbGVtZW50KSB7XHJcbiAgICAgICAgIFV0aWxpdHkuSW5zZXJ0Lmxhc3QodGhpcy5ncm91cC5lbGVtZW50LCBlbGVtZW50KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLyoqIEJ1aWxkcyBhbmQgZHJhd3MgdGhlIGNvbXBvbmVudHMgY29ubmVjdG9ycyAqL1xyXG4gICAgICBtYWtlQ29ubmVjdG9ycygpIHtcclxuICAgICAgICAgdGhpcy5jb25uZWN0b3JTZXRzID0gW1xyXG4gICAgICAgICAgICBbQ29tcG9uZW50LkdlbmVyaWNzLm1ha2VDb25uZWN0b3IodGhpcywgXCJcIiwgXCJub2RlXCIsIHRoaXMuam9pbnRzWzBdKV1cclxuICAgICAgICAgXVxyXG4gICAgICB9XHJcblxyXG4gICAgICBkcmF3KCkge1xyXG4gICAgICAgICAvLyhQcmVwZW5kIHNvIGhhbmRsZXMgYXBwZWFyIG9uIHRvcClcclxuICAgICAgICAgdGhpcy5ncm91cC5wcmVwZW5kKGRyYXdTY2hlbWF0aWModGhpcykpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBnZXRDb25uZWN0aW9ucygpOiBDb21wb25lbnQuVHlwZXMuY29ubmVjdG9yW11bXVtdIHtcclxuICAgICAgICAgcmV0dXJuIEdlbmVyaWNzLmdldENvbXBvbmVudENvbm5lY3Rpb25zKHRoaXMsIG1hbmlmZXN0LnNjaGVtYXRpYyk7XHJcbiAgICAgIH1cclxuICAgfVxyXG5cclxuICAgZXhwb3J0IGNsYXNzIExheW91dCBleHRlbmRzIEJhc2Uge1xyXG4gICAgICBjb25uZWN0b3JTZXRzOiBDb21wb25lbnQuVHlwZXMuaG9sZVtdW10gPSBbXTtcclxuXHJcbiAgICAgIGluc2VydEludG8oZWxlbWVudD86IFNWR0dyYXBoaWNzRWxlbWVudCkge1xyXG4gICAgICAgICBVdGlsaXR5Lkluc2VydC5hZnRlcih0aGlzLmdyb3VwLmVsZW1lbnQsIGVsZW1lbnQsIFwiLmJvYXJkXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvKiogQnVpbGRzIGFuZCBkcmF3cyB0aGUgY29tcG9uZW50cyBjb25uZWN0b3JzICovXHJcbiAgICAgIG1ha2VDb25uZWN0b3JzKCkge1xyXG4gICAgICAgICB0aGlzLmNvbm5lY3RvclNldHMgPSBbW1xyXG4gICAgICAgICAgICBDb21wb25lbnQuR2VuZXJpY3MubWFrZUNvbm5lY3Rvcih0aGlzLCBcIlwiLCBcImhvbGVcIiwgdGhpcy5qb2ludHNbMF0pXHJcbiAgICAgICAgIF1dXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRyYXcoKSB7XHJcbiAgICAgICAgIC8vKFByZXBlbmQgc28gaGFuZGxlcyBhcHBlYXIgb24gdG9wKVxyXG4gICAgICAgICB0aGlzLmdyb3VwLnByZXBlbmQoZHJhd0xheW91dCh0aGlzKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGdldENvbm5lY3Rpb25zKCk6IENvbXBvbmVudC5UeXBlcy5jb25uZWN0b3JbXVtdW10ge1xyXG4gICAgICAgICByZXR1cm4gR2VuZXJpY3MuZ2V0Q29tcG9uZW50Q29ubmVjdGlvbnModGhpcywgbWFuaWZlc3QubGF5b3V0KTtcclxuICAgICAgfVxyXG4gICB9XHJcbn1cclxuIl19