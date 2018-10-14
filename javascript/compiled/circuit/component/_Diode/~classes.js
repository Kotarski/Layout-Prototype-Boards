"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Diode;
        (function (_Diode) {
            var Classes;
            (function (Classes) {
                class Base extends Component.Instance {
                    constructor(values) {
                        super(values);
                        this.joints = values.joints;
                        this.saturationCurrent = values.saturationCurrent;
                        this.breakdownVoltage = values.breakdownVoltage;
                        this.color = values.color;
                    }
                    getProperties() {
                        return Utility.deepCopy({
                            name: this.name,
                            breakdownVoltage: this.breakdownVoltage,
                            saturationCurrent: this.saturationCurrent,
                            color: this.color
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
                        this.group.prepend(_Diode.drawSchematic(this));
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, manifest.schematic);
                    }
                    makeConnectors() {
                        this.connectorSets = [[
                                Component.Generics.makeConnector(this, "anode", "node", this.joints[_Diode.INDEXANODE], "+"),
                                Component.Generics.makeConnector(this, "cathode", "node", this.joints[_Diode.INDEXCATHODE], "-"),
                            ]];
                    }
                }
                Classes.Schematic = Schematic;
                class Layout extends Base {
                    draw() {
                        this.group.prepend(_Diode.drawLayout(this));
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, manifest.layout);
                    }
                    makeConnectors() {
                        this.connectorSets = [[
                                Component.Generics.makeConnector(this, "anode", "pin", this.joints[_Diode.INDEXANODE], "+"),
                                Component.Generics.makeConnector(this, "cathode", "pin", this.joints[_Diode.INDEXCATHODE], "-"),
                            ]];
                    }
                }
                Classes.Layout = Layout;
            })(Classes = _Diode.Classes || (_Diode.Classes = {}));
        })(_Diode = Component._Diode || (Component._Diode = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoifmNsYXNzZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50L19EaW9kZS9+Y2xhc3Nlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxPQUFPLENBc0VoQjtBQXRFRCxXQUFVLE9BQU87SUFBQyxJQUFBLFNBQVMsQ0FzRTFCO0lBdEVpQixXQUFBLFNBQVM7UUFBQyxJQUFBLE1BQU0sQ0FzRWpDO1FBdEUyQixXQUFBLE1BQU07WUFBQyxJQUFBLE9BQU8sQ0FzRXpDO1lBdEVrQyxXQUFBLE9BQU87Z0JBRXZDLE1BQWUsSUFBSyxTQUFRLFNBQVMsQ0FBQyxRQUFRO29CQU0zQyxZQUFZLE1BQW9CO3dCQUM3QixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO3dCQUM1QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDO3dCQUNsRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDO3dCQUNoRCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7b0JBQzdCLENBQUM7b0JBRUQsYUFBYTt3QkFDVixPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUM7NEJBQ3JCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTs0QkFDZixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCOzRCQUN2QyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCOzRCQUN6QyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7eUJBQ25CLENBQUMsQ0FBQztvQkFDTixDQUFDO29CQUVELFFBQVE7d0JBQ0wsT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDOzRCQUNyQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07NEJBQ25CLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTt5QkFDekIsQ0FBQyxDQUFDO29CQUNOLENBQUM7b0JBRUQsVUFBVSxDQUFDLE9BQTRCO3dCQUNwQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDcEQsQ0FBQztvQkFFRCxnQkFBZ0IsS0FBSyxPQUFPLEVBQUUsQ0FBQSxDQUFDLENBQUM7b0JBQUEsQ0FBQztpQkFDbkM7Z0JBRUQsTUFBYSxTQUFVLFNBQVEsSUFBSTtvQkFDaEMsSUFBSTt3QkFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFBLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUMzQyxDQUFDO29CQUNELGNBQWM7d0JBQ1gsT0FBTyxVQUFBLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNyRSxDQUFDO29CQUNELGNBQWM7d0JBQ1gsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDO2dDQUNuQixTQUFTLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQUEsVUFBVSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dDQUNyRixTQUFTLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQUEsWUFBWSxDQUFDLEVBQUUsR0FBRyxDQUFDOzZCQUMzRixDQUFDLENBQUM7b0JBQ04sQ0FBQztpQkFDSDtnQkFkWSxpQkFBUyxZQWNyQixDQUFBO2dCQUVELE1BQWEsTUFBTyxTQUFRLElBQUk7b0JBQzdCLElBQUk7d0JBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBQSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDeEMsQ0FBQztvQkFDRCxjQUFjO3dCQUNYLE9BQU8sVUFBQSxRQUFRLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDbEUsQ0FBQztvQkFDRCxjQUFjO3dCQUNYLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQztnQ0FDbkIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFBLFVBQVUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQ0FDcEYsU0FBUyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFBLFlBQVksQ0FBQyxFQUFFLEdBQUcsQ0FBQzs2QkFDMUYsQ0FBQyxDQUFDO29CQUNOLENBQUM7aUJBQ0g7Z0JBZFksY0FBTSxTQWNsQixDQUFBO1lBQ0osQ0FBQyxFQXRFa0MsT0FBTyxHQUFQLGNBQU8sS0FBUCxjQUFPLFFBc0V6QztRQUFELENBQUMsRUF0RTJCLE1BQU0sR0FBTixnQkFBTSxLQUFOLGdCQUFNLFFBc0VqQztJQUFELENBQUMsRUF0RWlCLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBc0UxQjtBQUFELENBQUMsRUF0RVMsT0FBTyxLQUFQLE9BQU8sUUFzRWhCIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIENpcmN1aXQuQ29tcG9uZW50Ll9EaW9kZS5DbGFzc2VzIHtcclxuXHJcbiAgIGFic3RyYWN0IGNsYXNzIEJhc2UgZXh0ZW5kcyBDb21wb25lbnQuSW5zdGFuY2UgaW1wbGVtZW50cyBUeXBlcy52YWx1ZXMge1xyXG4gICAgICBicmVha2Rvd25Wb2x0YWdlOiBudW1iZXI7XHJcbiAgICAgIHNhdHVyYXRpb25DdXJyZW50OiBudW1iZXI7XHJcbiAgICAgIGpvaW50czogW1ZlY3RvciwgVmVjdG9yXTtcclxuICAgICAgY29sb3I6IHN0cmluZztcclxuXHJcbiAgICAgIGNvbnN0cnVjdG9yKHZhbHVlczogVHlwZXMudmFsdWVzKSB7XHJcbiAgICAgICAgIHN1cGVyKHZhbHVlcyk7XHJcbiAgICAgICAgIHRoaXMuam9pbnRzID0gdmFsdWVzLmpvaW50cztcclxuICAgICAgICAgdGhpcy5zYXR1cmF0aW9uQ3VycmVudCA9IHZhbHVlcy5zYXR1cmF0aW9uQ3VycmVudDtcclxuICAgICAgICAgdGhpcy5icmVha2Rvd25Wb2x0YWdlID0gdmFsdWVzLmJyZWFrZG93blZvbHRhZ2U7XHJcbiAgICAgICAgIHRoaXMuY29sb3IgPSB2YWx1ZXMuY29sb3I7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGdldFByb3BlcnRpZXMoKTogVHlwZXMucHJvcGVydGllcyB7XHJcbiAgICAgICAgIHJldHVybiBVdGlsaXR5LmRlZXBDb3B5KHtcclxuICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxyXG4gICAgICAgICAgICBicmVha2Rvd25Wb2x0YWdlOiB0aGlzLmJyZWFrZG93blZvbHRhZ2UsXHJcbiAgICAgICAgICAgIHNhdHVyYXRpb25DdXJyZW50OiB0aGlzLnNhdHVyYXRpb25DdXJyZW50LFxyXG4gICAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvclxyXG4gICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZ2V0U3RhdGUoKTogVHlwZXMuc3RhdGUge1xyXG4gICAgICAgICByZXR1cm4gVXRpbGl0eS5kZWVwQ29weSh7XHJcbiAgICAgICAgICAgIGpvaW50czogdGhpcy5qb2ludHMsXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmRpc2FibGVkXHJcbiAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpbnNlcnRJbnRvKGVsZW1lbnQ/OiBTVkdHcmFwaGljc0VsZW1lbnQpIHtcclxuICAgICAgICAgVXRpbGl0eS5JbnNlcnQubGFzdCh0aGlzLmdyb3VwLmVsZW1lbnQsIGVsZW1lbnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0cmFuc2ZlckZ1bmN0aW9uKCkgeyByZXR1cm4gW10gfTtcclxuICAgfVxyXG5cclxuICAgZXhwb3J0IGNsYXNzIFNjaGVtYXRpYyBleHRlbmRzIEJhc2Uge1xyXG4gICAgICBkcmF3KCkge1xyXG4gICAgICAgICAvLyhQcmVwZW5kIHNvIGhhbmRsZXMgYXBwZWFyIG9uIHRvcClcclxuICAgICAgICAgdGhpcy5ncm91cC5wcmVwZW5kKGRyYXdTY2hlbWF0aWModGhpcykpO1xyXG4gICAgICB9XHJcbiAgICAgIGdldENvbm5lY3Rpb25zKCk6IENvbXBvbmVudC5UeXBlcy5jb25uZWN0b3JbXVtdW10ge1xyXG4gICAgICAgICByZXR1cm4gR2VuZXJpY3MuZ2V0Q29tcG9uZW50Q29ubmVjdGlvbnModGhpcywgbWFuaWZlc3Quc2NoZW1hdGljKTtcclxuICAgICAgfVxyXG4gICAgICBtYWtlQ29ubmVjdG9ycygpIHtcclxuICAgICAgICAgdGhpcy5jb25uZWN0b3JTZXRzID0gW1tcclxuICAgICAgICAgICAgQ29tcG9uZW50LkdlbmVyaWNzLm1ha2VDb25uZWN0b3IodGhpcywgXCJhbm9kZVwiLCBcIm5vZGVcIiwgdGhpcy5qb2ludHNbSU5ERVhBTk9ERV0sIFwiK1wiKSxcclxuICAgICAgICAgICAgQ29tcG9uZW50LkdlbmVyaWNzLm1ha2VDb25uZWN0b3IodGhpcywgXCJjYXRob2RlXCIsIFwibm9kZVwiLCB0aGlzLmpvaW50c1tJTkRFWENBVEhPREVdLCBcIi1cIiksXHJcbiAgICAgICAgIF1dO1xyXG4gICAgICB9XHJcbiAgIH1cclxuXHJcbiAgIGV4cG9ydCBjbGFzcyBMYXlvdXQgZXh0ZW5kcyBCYXNlIHtcclxuICAgICAgZHJhdygpIHtcclxuICAgICAgICAgLy8oUHJlcGVuZCBzbyBoYW5kbGVzIGFwcGVhciBvbiB0b3ApXHJcbiAgICAgICAgIHRoaXMuZ3JvdXAucHJlcGVuZChkcmF3TGF5b3V0KHRoaXMpKTtcclxuICAgICAgfVxyXG4gICAgICBnZXRDb25uZWN0aW9ucygpOiBDb21wb25lbnQuVHlwZXMuY29ubmVjdG9yW11bXVtdIHtcclxuICAgICAgICAgcmV0dXJuIEdlbmVyaWNzLmdldENvbXBvbmVudENvbm5lY3Rpb25zKHRoaXMsIG1hbmlmZXN0LmxheW91dCk7XHJcbiAgICAgIH1cclxuICAgICAgbWFrZUNvbm5lY3RvcnMoKSB7XHJcbiAgICAgICAgIHRoaXMuY29ubmVjdG9yU2V0cyA9IFtbXHJcbiAgICAgICAgICAgIENvbXBvbmVudC5HZW5lcmljcy5tYWtlQ29ubmVjdG9yKHRoaXMsIFwiYW5vZGVcIiwgXCJwaW5cIiwgdGhpcy5qb2ludHNbSU5ERVhBTk9ERV0sIFwiK1wiKSxcclxuICAgICAgICAgICAgQ29tcG9uZW50LkdlbmVyaWNzLm1ha2VDb25uZWN0b3IodGhpcywgXCJjYXRob2RlXCIsIFwicGluXCIsIHRoaXMuam9pbnRzW0lOREVYQ0FUSE9ERV0sIFwiLVwiKSxcclxuICAgICAgICAgXV07XHJcbiAgICAgIH1cclxuICAgfVxyXG59XHJcbiJdfQ==