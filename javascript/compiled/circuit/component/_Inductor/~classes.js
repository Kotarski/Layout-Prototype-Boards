"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Inductor;
        (function (_Inductor) {
            var Classes;
            (function (Classes) {
                class Base extends Component.Instance {
                    constructor(values) {
                        super(values);
                        this.joints = values.joints;
                        this.inductance = values.inductance;
                    }
                    getProperties() {
                        return Utility.deepCopy({
                            name: this.name,
                            inductance: this.inductance,
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
                        this.group.prepend(_Inductor.drawSchematic(this));
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, manifest.schematic);
                    }
                    makeConnectors() {
                        this.connectorSets = [[
                                Component.Generics.makeConnector(this, "", "node", this.joints[_Inductor.INDEXEND1]),
                                Component.Generics.makeConnector(this, "", "node", this.joints[_Inductor.INDEXEND2]),
                            ]];
                    }
                }
                Classes.Schematic = Schematic;
                class Layout extends Base {
                    draw() {
                        this.group.prepend(_Inductor.drawLayout(this));
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, manifest.layout);
                    }
                    makeConnectors() {
                        this.connectorSets = [[
                                Component.Generics.makeConnector(this, "", "pin", this.joints[_Inductor.INDEXEND1]),
                                Component.Generics.makeConnector(this, "", "pin", this.joints[_Inductor.INDEXEND2]),
                            ]];
                    }
                }
                Classes.Layout = Layout;
            })(Classes = _Inductor.Classes || (_Inductor.Classes = {}));
        })(_Inductor = Component._Inductor || (Component._Inductor = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoifmNsYXNzZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50L19JbmR1Y3Rvci9+Y2xhc3Nlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxPQUFPLENBaUVoQjtBQWpFRCxXQUFVLE9BQU87SUFBQyxJQUFBLFNBQVMsQ0FpRTFCO0lBakVpQixXQUFBLFNBQVM7UUFBQyxJQUFBLFNBQVMsQ0FpRXBDO1FBakUyQixXQUFBLFNBQVM7WUFBQyxJQUFBLE9BQU8sQ0FpRTVDO1lBakVxQyxXQUFBLE9BQU87Z0JBRTFDLE1BQWUsSUFBSyxTQUFRLFNBQVMsQ0FBQyxRQUFRO29CQUkzQyxZQUFZLE1BQW9CO3dCQUM3QixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO3dCQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7b0JBQ3ZDLENBQUM7b0JBRUQsYUFBYTt3QkFDVixPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUM7NEJBQ3JCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTs0QkFDZixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7eUJBQzdCLENBQUMsQ0FBQztvQkFDTixDQUFDO29CQUVELFFBQVE7d0JBQ0wsT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDOzRCQUNyQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07NEJBQ25CLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTt5QkFDekIsQ0FBQyxDQUFDO29CQUNOLENBQUM7b0JBRUQsVUFBVSxDQUFDLE9BQTRCO3dCQUNwQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDcEQsQ0FBQztvQkFFRCxnQkFBZ0IsS0FBSyxPQUFPLEVBQUUsQ0FBQSxDQUFDLENBQUM7b0JBQUEsQ0FBQztpQkFDbkM7Z0JBRUQsTUFBYSxTQUFVLFNBQVEsSUFBSTtvQkFDaEMsSUFBSTt3QkFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUMzQyxDQUFDO29CQUNELGNBQWM7d0JBQ1gsT0FBTyxVQUFBLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNyRSxDQUFDO29CQUNELGNBQWM7d0JBQ1gsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDO2dDQUNuQixTQUFTLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUEsU0FBUyxDQUFDLENBQUM7Z0NBQzFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQSxTQUFTLENBQUMsQ0FBQzs2QkFDNUUsQ0FBQyxDQUFBO29CQUNMLENBQUM7aUJBQ0g7Z0JBZFksaUJBQVMsWUFjckIsQ0FBQTtnQkFFRCxNQUFhLE1BQU8sU0FBUSxJQUFJO29CQUM3QixJQUFJO3dCQUVELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3hDLENBQUM7b0JBQ0QsY0FBYzt3QkFDWCxPQUFPLFVBQUEsUUFBUSxDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2xFLENBQUM7b0JBQ0QsY0FBYzt3QkFDWCxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUM7Z0NBQ25CLFNBQVMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQSxTQUFTLENBQUMsQ0FBQztnQ0FDekUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLFNBQVMsQ0FBQyxDQUFDOzZCQUMzRSxDQUFDLENBQUE7b0JBQ0wsQ0FBQztpQkFFSDtnQkFmWSxjQUFNLFNBZWxCLENBQUE7WUFDSixDQUFDLEVBakVxQyxPQUFPLEdBQVAsaUJBQU8sS0FBUCxpQkFBTyxRQWlFNUM7UUFBRCxDQUFDLEVBakUyQixTQUFTLEdBQVQsbUJBQVMsS0FBVCxtQkFBUyxRQWlFcEM7SUFBRCxDQUFDLEVBakVpQixTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQWlFMUI7QUFBRCxDQUFDLEVBakVTLE9BQU8sS0FBUCxPQUFPLFFBaUVoQiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBDaXJjdWl0LkNvbXBvbmVudC5fSW5kdWN0b3IuQ2xhc3NlcyB7XHJcblxyXG4gICBhYnN0cmFjdCBjbGFzcyBCYXNlIGV4dGVuZHMgQ29tcG9uZW50Lkluc3RhbmNlIGltcGxlbWVudHMgVHlwZXMudmFsdWVzIHtcclxuICAgICAgaW5kdWN0YW5jZTogbnVtYmVyO1xyXG4gICAgICBqb2ludHM6IFtWZWN0b3IsIFZlY3Rvcl07XHJcblxyXG4gICAgICBjb25zdHJ1Y3Rvcih2YWx1ZXM6IFR5cGVzLnZhbHVlcykge1xyXG4gICAgICAgICBzdXBlcih2YWx1ZXMpO1xyXG4gICAgICAgICB0aGlzLmpvaW50cyA9IHZhbHVlcy5qb2ludHM7XHJcbiAgICAgICAgIHRoaXMuaW5kdWN0YW5jZSA9IHZhbHVlcy5pbmR1Y3RhbmNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBnZXRQcm9wZXJ0aWVzKCk6IFR5cGVzLnByb3BlcnRpZXMge1xyXG4gICAgICAgICByZXR1cm4gVXRpbGl0eS5kZWVwQ29weSh7XHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcclxuICAgICAgICAgICAgaW5kdWN0YW5jZTogdGhpcy5pbmR1Y3RhbmNlLFxyXG4gICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZ2V0U3RhdGUoKTogVHlwZXMuc3RhdGUge1xyXG4gICAgICAgICByZXR1cm4gVXRpbGl0eS5kZWVwQ29weSh7XHJcbiAgICAgICAgICAgIGpvaW50czogdGhpcy5qb2ludHMsXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmRpc2FibGVkXHJcbiAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpbnNlcnRJbnRvKGVsZW1lbnQ/OiBTVkdHcmFwaGljc0VsZW1lbnQpIHtcclxuICAgICAgICAgVXRpbGl0eS5JbnNlcnQubGFzdCh0aGlzLmdyb3VwLmVsZW1lbnQsIGVsZW1lbnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0cmFuc2ZlckZ1bmN0aW9uKCkgeyByZXR1cm4gW10gfTtcclxuICAgfVxyXG5cclxuICAgZXhwb3J0IGNsYXNzIFNjaGVtYXRpYyBleHRlbmRzIEJhc2Uge1xyXG4gICAgICBkcmF3KCkge1xyXG4gICAgICAgICAvLyhQcmVwZW5kIHNvIGhhbmRsZXMgYXBwZWFyIG9uIHRvcClcclxuICAgICAgICAgdGhpcy5ncm91cC5wcmVwZW5kKGRyYXdTY2hlbWF0aWModGhpcykpO1xyXG4gICAgICB9XHJcbiAgICAgIGdldENvbm5lY3Rpb25zKCk6IENvbXBvbmVudC5UeXBlcy5jb25uZWN0b3JbXVtdW10ge1xyXG4gICAgICAgICByZXR1cm4gR2VuZXJpY3MuZ2V0Q29tcG9uZW50Q29ubmVjdGlvbnModGhpcywgbWFuaWZlc3Quc2NoZW1hdGljKTtcclxuICAgICAgfVxyXG4gICAgICBtYWtlQ29ubmVjdG9ycygpIHtcclxuICAgICAgICAgdGhpcy5jb25uZWN0b3JTZXRzID0gW1tcclxuICAgICAgICAgICAgQ29tcG9uZW50LkdlbmVyaWNzLm1ha2VDb25uZWN0b3IodGhpcywgXCJcIiwgXCJub2RlXCIsIHRoaXMuam9pbnRzW0lOREVYRU5EMV0pLFxyXG4gICAgICAgICAgICBDb21wb25lbnQuR2VuZXJpY3MubWFrZUNvbm5lY3Rvcih0aGlzLCBcIlwiLCBcIm5vZGVcIiwgdGhpcy5qb2ludHNbSU5ERVhFTkQyXSksXHJcbiAgICAgICAgIF1dXHJcbiAgICAgIH1cclxuICAgfVxyXG5cclxuICAgZXhwb3J0IGNsYXNzIExheW91dCBleHRlbmRzIEJhc2Uge1xyXG4gICAgICBkcmF3KCkge1xyXG4gICAgICAgICAvLyhQcmVwZW5kIHNvIGhhbmRsZXMgYXBwZWFyIG9uIHRvcClcclxuICAgICAgICAgdGhpcy5ncm91cC5wcmVwZW5kKGRyYXdMYXlvdXQodGhpcykpO1xyXG4gICAgICB9XHJcbiAgICAgIGdldENvbm5lY3Rpb25zKCk6IENvbXBvbmVudC5UeXBlcy5jb25uZWN0b3JbXVtdW10ge1xyXG4gICAgICAgICByZXR1cm4gR2VuZXJpY3MuZ2V0Q29tcG9uZW50Q29ubmVjdGlvbnModGhpcywgbWFuaWZlc3QubGF5b3V0KTtcclxuICAgICAgfVxyXG4gICAgICBtYWtlQ29ubmVjdG9ycygpIHtcclxuICAgICAgICAgdGhpcy5jb25uZWN0b3JTZXRzID0gW1tcclxuICAgICAgICAgICAgQ29tcG9uZW50LkdlbmVyaWNzLm1ha2VDb25uZWN0b3IodGhpcywgXCJcIiwgXCJwaW5cIiwgdGhpcy5qb2ludHNbSU5ERVhFTkQxXSksXHJcbiAgICAgICAgICAgIENvbXBvbmVudC5HZW5lcmljcy5tYWtlQ29ubmVjdG9yKHRoaXMsIFwiXCIsIFwicGluXCIsIHRoaXMuam9pbnRzW0lOREVYRU5EMl0pLFxyXG4gICAgICAgICBdXVxyXG4gICAgICB9XHJcblxyXG4gICB9XHJcbn1cclxuIl19