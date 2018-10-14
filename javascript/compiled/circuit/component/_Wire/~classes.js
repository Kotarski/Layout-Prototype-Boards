"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Wire;
        (function (_Wire) {
            var Classes;
            (function (Classes) {
                class Base extends Component.Instance {
                    getProperties() {
                        return Utility.deepCopy({
                            name: this.name
                        });
                    }
                    transferFunction(from) {
                        return Utility.flatten2d(this.connectorSets.map(connectorSet => connectorSet.filter(Utility.isNot(from))));
                    }
                }
                class Schematic extends Base {
                    constructor(values) {
                        super(values);
                        this.connectorSets = [];
                        this.joints = values.joints;
                    }
                    getState() {
                        return Utility.deepCopy({
                            joints: this.joints,
                            disabled: this.disabled
                        });
                    }
                    draw() {
                        this.group.prepend(_Wire.drawSchematic(this));
                    }
                    insertInto(element) {
                        Utility.Insert.first(this.group.element, element);
                    }
                    makeConnectors() {
                        const end1 = this.joints[0];
                        const end2 = this.joints[this.joints.length - 1];
                        this.connectorSets = [[
                                Component.Generics.makeConnector(this, "", "node", end1),
                                Component.Generics.makeConnector(this, "", "node", end2)
                            ]
                        ];
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, manifest.schematic);
                    }
                }
                Classes.Schematic = Schematic;
                class Layout extends Base {
                    constructor(values) {
                        super(values);
                        this.joints = values.joints;
                        this.color = values.color;
                    }
                    getState() {
                        return Utility.deepCopy({
                            joints: this.joints,
                            color: this.color,
                            disabled: this.disabled
                        });
                    }
                    draw() {
                        this.group.prepend(_Wire.drawLayout(this));
                    }
                    insertInto(element) {
                        Utility.Insert.last(this.group.element, element);
                    }
                    makeConnectors() {
                        this.connectorSets = [[
                                Component.Generics.makeConnector(this, "", "pin", this.joints[0]),
                                Component.Generics.makeConnector(this, "", "pin", this.joints[this.joints.length - 1]),
                            ]
                        ];
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, manifest.layout);
                    }
                }
                Classes.Layout = Layout;
            })(Classes = _Wire.Classes || (_Wire.Classes = {}));
        })(_Wire = Component._Wire || (Component._Wire = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoifmNsYXNzZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50L19XaXJlL35jbGFzc2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE9BQU8sQ0E4RmhCO0FBOUZELFdBQVUsT0FBTztJQUFDLElBQUEsU0FBUyxDQThGMUI7SUE5RmlCLFdBQUEsU0FBUztRQUFDLElBQUEsS0FBSyxDQThGaEM7UUE5RjJCLFdBQUEsS0FBSztZQUFDLElBQUEsT0FBTyxDQThGeEM7WUE5RmlDLFdBQUEsT0FBTztnQkFFdEMsTUFBZSxJQUFLLFNBQVEsU0FBUyxDQUFDLFFBQVE7b0JBQzNDLGFBQWE7d0JBQ1YsT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDOzRCQUNyQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7eUJBQ2pCLENBQUMsQ0FBQztvQkFDTixDQUFDO29CQUVELGdCQUFnQixDQUFDLElBQStCO3dCQUM3QyxPQUFPLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzlHLENBQUM7aUJBQ0g7Z0JBRUQsTUFBYSxTQUFVLFNBQVEsSUFBSTtvQkFJaEMsWUFBWSxNQUE2Qjt3QkFDdEMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUhqQixrQkFBYSxHQUE2QixFQUFFLENBQUM7d0JBSTFDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztvQkFDL0IsQ0FBQztvQkFFRCxRQUFRO3dCQUNMLE9BQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQzs0QkFDckIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNOzRCQUNuQixRQUFRLEVBQUUsSUFBSSxD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SyxHQUFMLGVBQUssS0FBTCxlQUFLLFFBOEZoQztJQUFELENBQUMsRUE5RmlCLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBOEYxQjtBQUFELENBQUMsRUE5RlMsT0FBTyxLQUFQLE9BQU8sUUE4RmhCIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIENpcmN1aXQuQ29tcG9uZW50Ll9XaXJlLkNsYXNzZXMge1xyXG5cclxuICAgYWJzdHJhY3QgY2xhc3MgQmFzZSBleHRlbmRzIENvbXBvbmVudC5JbnN0YW5jZSBpbXBsZW1lbnRzIFR5cGVzLnByb3BlcnRpZXMge1xyXG4gICAgICBnZXRQcm9wZXJ0aWVzKCk6IFR5cGVzLnByb3BlcnRpZXMge1xyXG4gICAgICAgICByZXR1cm4gVXRpbGl0eS5kZWVwQ29weSh7XHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZVxyXG4gICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdHJhbnNmZXJGdW5jdGlvbihmcm9tOiBDb21wb25lbnQuVHlwZXMuY29ubmVjdG9yKTogQ29tcG9uZW50LlR5cGVzLmNvbm5lY3RvcltdIHtcclxuICAgICAgICAgcmV0dXJuIFV0aWxpdHkuZmxhdHRlbjJkKHRoaXMuY29ubmVjdG9yU2V0cy5tYXAoY29ubmVjdG9yU2V0ID0+IGNvbm5lY3RvclNldC5maWx0ZXIoVXRpbGl0eS5pc05vdChmcm9tKSkpKTtcclxuICAgICAgfVxyXG4gICB9XHJcblxyXG4gICBleHBvcnQgY2xhc3MgU2NoZW1hdGljIGV4dGVuZHMgQmFzZSBpbXBsZW1lbnRzIFR5cGVzLnZhbHVlc1NjaGVtYXRpYyB7XHJcbiAgICAgIGpvaW50czogVmVjdG9yW107XHJcbiAgICAgIGNvbm5lY3RvclNldHM6IENvbXBvbmVudC5UeXBlcy5ub2RlW11bXSA9IFtdO1xyXG5cclxuICAgICAgY29uc3RydWN0b3IodmFsdWVzOiBUeXBlcy52YWx1ZXNTY2hlbWF0aWMpIHtcclxuICAgICAgICAgc3VwZXIodmFsdWVzKTtcclxuICAgICAgICAgdGhpcy5qb2ludHMgPSB2YWx1ZXMuam9pbnRzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBnZXRTdGF0ZSgpOiBUeXBlcy5zdGF0ZVNjaGVtYXRpYyB7XHJcbiAgICAgICAgIHJldHVybiBVdGlsaXR5LmRlZXBDb3B5KHtcclxuICAgICAgICAgICAgam9pbnRzOiB0aGlzLmpvaW50cyxcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZGlzYWJsZWRcclxuICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRyYXcoKSB7XHJcbiAgICAgICAgIC8vKFByZXBlbmQgc28gaGFuZGxlcyBhcHBlYXIgb24gdG9wKVxyXG4gICAgICAgICB0aGlzLmdyb3VwLnByZXBlbmQoZHJhd1NjaGVtYXRpYyh0aGlzKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGluc2VydEludG8oZWxlbWVudD86IFNWR0dyYXBoaWNzRWxlbWVudCkge1xyXG4gICAgICAgICBVdGlsaXR5Lkluc2VydC5maXJzdCh0aGlzLmdyb3VwLmVsZW1lbnQsIGVsZW1lbnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBtYWtlQ29ubmVjdG9ycygpIHtcclxuICAgICAgICAgY29uc3QgZW5kMSA9IHRoaXMuam9pbnRzWzBdO1xyXG4gICAgICAgICBjb25zdCBlbmQyID0gdGhpcy5qb2ludHNbdGhpcy5qb2ludHMubGVuZ3RoIC0gMV07XHJcblxyXG4gICAgICAgICB0aGlzLmNvbm5lY3RvclNldHMgPSBbW1xyXG4gICAgICAgICAgICBDb21wb25lbnQuR2VuZXJpY3MubWFrZUNvbm5lY3Rvcih0aGlzLCBcIlwiLCBcIm5vZGVcIiwgZW5kMSksXHJcbiAgICAgICAgICAgIENvbXBvbmVudC5HZW5lcmljcy5tYWtlQ29ubmVjdG9yKHRoaXMsIFwiXCIsIFwibm9kZVwiLCBlbmQyKV1cclxuICAgICAgICAgXVxyXG4gICAgICB9XHJcblxyXG4gICAgICBnZXRDb25uZWN0aW9ucygpOiBDb21wb25lbnQuVHlwZXMuY29ubmVjdG9yW11bXVtdIHtcclxuICAgICAgICAgcmV0dXJuIEdlbmVyaWNzLmdldENvbXBvbmVudENvbm5lY3Rpb25zKHRoaXMsIG1hbmlmZXN0LnNjaGVtYXRpYyk7XHJcbiAgICAgIH1cclxuXHJcbiAgIH1cclxuXHJcbiAgIGV4cG9ydCBjbGFzcyBMYXlvdXQgZXh0ZW5kcyBCYXNlIGltcGxlbWVudHMgVHlwZXMudmFsdWVzTGF5b3V0IHtcclxuICAgICAgam9pbnRzOiBWZWN0b3JbXTtcclxuICAgICAgY29sb3I6IHN0cmluZztcclxuXHJcbiAgICAgIGNvbnN0cnVjdG9yKHZhbHVlczogVHlwZXMudmFsdWVzTGF5b3V0KSB7XHJcbiAgICAgICAgIHN1cGVyKHZhbHVlcyk7XHJcbiAgICAgICAgIHRoaXMuam9pbnRzID0gdmFsdWVzLmpvaW50cztcclxuICAgICAgICAgdGhpcy5jb2xvciA9IHZhbHVlcy5jb2xvcjtcclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIGdldFN0YXRlKCk6IFR5cGVzLnN0YXRlTGF5b3V0IHtcclxuICAgICAgICAgcmV0dXJuIFV0aWxpdHkuZGVlcENvcHkoe1xyXG4gICAgICAgICAgICBqb2ludHM6IHRoaXMuam9pbnRzLFxyXG4gICAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvcixcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZGlzYWJsZWRcclxuICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRyYXcoKSB7XHJcbiAgICAgICAgIC8vKFByZXBlbmQgc28gaGFuZGxlcyBhcHBlYXIgb24gdG9wKVxyXG4gICAgICAgICB0aGlzLmdyb3VwLnByZXBlbmQoZHJhd0xheW91dCh0aGlzKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGluc2VydEludG8oZWxlbWVudD86IFNWR0dyYXBoaWNzRWxlbWVudCkge1xyXG4gICAgICAgICBVdGlsaXR5Lkluc2VydC5sYXN0KHRoaXMuZ3JvdXAuZWxlbWVudCwgZWxlbWVudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG1ha2VDb25uZWN0b3JzKCkge1xyXG4gICAgICAgICB0aGlzLmNvbm5lY3RvclNldHMgPSBbW1xyXG4gICAgICAgICAgICBDb21wb25lbnQuR2VuZXJpY3MubWFrZUNvbm5lY3Rvcih0aGlzLCBcIlwiLCBcInBpblwiLCB0aGlzLmpvaW50c1swXSksXHJcbiAgICAgICAgICAgIENvbXBvbmVudC5HZW5lcmljcy5tYWtlQ29ubmVjdG9yKHRoaXMsIFwiXCIsIFwicGluXCIsIHRoaXMuam9pbnRzW3RoaXMuam9pbnRzLmxlbmd0aCAtIDFdKSxdXHJcbiAgICAgICAgIF1cclxuICAgICAgfVxyXG5cclxuICAgICAgZ2V0Q29ubmVjdGlvbnMoKTogQ29tcG9uZW50LlR5cGVzLmNvbm5lY3RvcltdW11bXSB7XHJcbiAgICAgICAgIHJldHVybiBHZW5lcmljcy5nZXRDb21wb25lbnRDb25uZWN0aW9ucyh0aGlzLCBtYW5pZmVzdC5sYXlvdXQpO1xyXG4gICAgICB9XHJcbiAgIH1cclxufVxyXG4iXX0=