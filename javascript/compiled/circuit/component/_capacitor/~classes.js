"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Capacitor;
        (function (_Capacitor) {
            var Classes;
            (function (Classes) {
                class Base extends Component.Instance {
                    constructor(values) {
                        super(values);
                        this.joints = values.joints;
                        this.capacitance = values.capacitance;
                        this.isPolarised = values.isPolarised;
                    }
                    getProperties() {
                        return Utility.deepCopy({
                            name: this.name,
                            capacitance: this.capacitance,
                            isPolarised: this.isPolarised
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
                        this.group.prepend(_Capacitor.drawSchematic(this));
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, manifest.schematic);
                    }
                    makeConnectors() {
                        if (this.isPolarised) {
                            this.connectorSets = [[
                                    Component.Generics.makeConnector(this, "cathode", "node", this.joints[_Capacitor.INDEXCATHODE], "-"),
                                    Component.Generics.makeConnector(this, "anode", "node", this.joints[_Capacitor.INDEXANODE], "+"),
                                ]];
                        }
                        else {
                            this.connectorSets = [[
                                    Component.Generics.makeConnector(this, "", "node", this.joints[_Capacitor.INDEXCATHODE]),
                                    Component.Generics.makeConnector(this, "", "node", this.joints[_Capacitor.INDEXANODE]),
                                ]];
                        }
                    }
                }
                Classes.Schematic = Schematic;
                class Layout extends Base {
                    draw() {
                        this.group.prepend(_Capacitor.drawLayout(this));
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, manifest.layout);
                    }
                    makeConnectors() {
                        if (this.isPolarised) {
                            this.connectorSets = [[
                                    Component.Generics.makeConnector(this, "cathode", "pin", this.joints[_Capacitor.INDEXCATHODE], "-"),
                                    Component.Generics.makeConnector(this, "anode", "pin", this.joints[_Capacitor.INDEXANODE], "+"),
                                ]];
                        }
                        else {
                            this.connectorSets = [[
                                    Component.Generics.makeConnector(this, "", "pin", this.joints[_Capacitor.INDEXCATHODE]),
                                    Component.Generics.makeConnector(this, "", "pin", this.joints[_Capacitor.INDEXANODE]),
                                ]];
                        }
                    }
                }
                Classes.Layout = Layout;
            })(Classes = _Capacitor.Classes || (_Capacitor.Classes = {}));
        })(_Capacitor = Component._Capacitor || (Component._Capacitor = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoifmNsYXNzZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50L19jYXBhY2l0b3IvfmNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVUsT0FBTyxDQXFGaEI7QUFyRkQsV0FBVSxPQUFPO0lBQUMsSUFBQSxTQUFTLENBcUYxQjtJQXJGaUIsV0FBQSxTQUFTO1FBQUMsSUFBQSxVQUFVLENBcUZyQztRQXJGMkIsV0FBQSxVQUFVO1lBQUMsSUFBQSxPQUFPLENBcUY3QztZQXJGc0MsV0FBQSxPQUFPO2dCQUUzQyxNQUFlLElBQUssU0FBUSxTQUFTLENBQUMsUUFBUTtvQkFLM0MsWUFBWSxNQUFvQjt3QkFDN0IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQzt3QkFDNUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO3dCQUN0QyxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7b0JBQ3pDLENBQUM7b0JBRUQsYUFBYTt3QkFDVixPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUM7NEJBQ3JCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTs0QkFDZixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7NEJBQzdCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVzt5QkFDL0IsQ0FBQyxDQUFDO29CQUNOLENBQUM7b0JBRUQsUUFBUTt3QkFDTCxPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUM7NEJBQ3JCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTs0QkFDbkIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO3lCQUN6QixDQUFDLENBQUM7b0JBQ04sQ0FBQztvQkFFRCxVQUFVLENBQUMsT0FBNEI7d0JBQ3BDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUNwRCxDQUFDO29CQUVELGdCQUFnQixLQUFLLE9BQU8sRUFBRSxDQUFBLENBQUMsQ0FBQztvQkFBQSxDQUFDO2lCQUNuQztnQkFFRCxNQUFhLFNBQVUsU0FBUSxJQUFJO29CQUNoQyxJQUFJO3dCQUVELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQUEsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQzNDLENBQUM7b0JBRUQsY0FBYzt3QkFDWCxPQUFPLFVBQUEsUUFBUSxDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3JFLENBQUM7b0JBRUQsY0FBYzt3QkFDWCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7NEJBQ25CLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQztvQ0FDbkIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFBLFlBQVksQ0FBQyxFQUFFLEdBQUcsQ0FBQztvQ0FDekYsU0FBUyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFBLFVBQVUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztpQ0FDdkYsQ0FBQyxDQUFBO3lCQUNKOzZCQUFNOzRCQUNKLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQztvQ0FDbkIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFBLFlBQVksQ0FBQyxDQUFDO29DQUM3RSxTQUFTLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQUEsVUFBVSxDQUFDLENBQUM7aUNBQzdFLENBQUMsQ0FBQTt5QkFDSjtvQkFDSixDQUFDO2lCQUNIO2dCQXZCWSxpQkFBUyxZQXVCckIsQ0FBQTtnQkFFRCxNQUFhLE1BQU8sU0FBUSxJQUFJO29CQUM3QixJQUFJO3dCQUVELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQUEsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3hDLENBQUM7b0JBRUQsY0FBYzt3QkFDWCxPQUFPLFVBQUEsUUFBUSxDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2xFLENBQUM7b0JBRUQsY0FBYzt3QkFDWCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7NEJBQ25CLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQztvQ0FDbkIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFBLFlBQVksQ0FBQyxFQUFFLEdBQUcsQ0FBQztvQ0FDeEYsU0FBUyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFBLFVBQVUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztpQ0FDdEYsQ0FBQyxDQUFBO3lCQUNKOzZCQUFNOzRCQUNKLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQztvQ0FDbkIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFBLFlBQVksQ0FBQyxDQUFDO29DQUM1RSxTQUFTLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQUEsVUFBVSxDQUFDLENBQUM7aUNBQzVFLENBQUMsQ0FBQTt5QkFDSjtvQkFDSixDQUFDO2lCQUNIO2dCQXZCWSxjQUFNLFNBdUJsQixDQUFBO1lBQ0osQ0FBQyxFQXJGc0MsT0FBTyxHQUFQLGtCQUFPLEtBQVAsa0JBQU8sUUFxRjdDO1FBQUQsQ0FBQyxFQXJGMkIsVUFBVSxHQUFWLG9CQUFVLEtBQVYsb0JBQVUsUUFxRnJDO0lBQUQsQ0FBQyxFQXJGaUIsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFxRjFCO0FBQUQsQ0FBQyxFQXJGUyxPQUFPLEtBQVAsT0FBTyxRQXFGaEIiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgQ2lyY3VpdC5Db21wb25lbnQuX0NhcGFjaXRvci5DbGFzc2VzIHtcclxuXHJcbiAgIGFic3RyYWN0IGNsYXNzIEJhc2UgZXh0ZW5kcyBDb21wb25lbnQuSW5zdGFuY2UgaW1wbGVtZW50cyBUeXBlcy52YWx1ZXMge1xyXG4gICAgICBjYXBhY2l0YW5jZTogbnVtYmVyO1xyXG4gICAgICBpc1BvbGFyaXNlZDogYm9vbGVhbjtcclxuICAgICAgam9pbnRzOiBbVmVjdG9yLCBWZWN0b3JdO1xyXG5cclxuICAgICAgY29uc3RydWN0b3IodmFsdWVzOiBUeXBlcy52YWx1ZXMpIHtcclxuICAgICAgICAgc3VwZXIodmFsdWVzKTtcclxuICAgICAgICAgdGhpcy5qb2ludHMgPSB2YWx1ZXMuam9pbnRzO1xyXG4gICAgICAgICB0aGlzLmNhcGFjaXRhbmNlID0gdmFsdWVzLmNhcGFjaXRhbmNlO1xyXG4gICAgICAgICB0aGlzLmlzUG9sYXJpc2VkID0gdmFsdWVzLmlzUG9sYXJpc2VkO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBnZXRQcm9wZXJ0aWVzKCk6IFR5cGVzLnByb3BlcnRpZXMge1xyXG4gICAgICAgICByZXR1cm4gVXRpbGl0eS5kZWVwQ29weSh7XHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcclxuICAgICAgICAgICAgY2FwYWNpdGFuY2U6IHRoaXMuY2FwYWNpdGFuY2UsXHJcbiAgICAgICAgICAgIGlzUG9sYXJpc2VkOiB0aGlzLmlzUG9sYXJpc2VkXHJcbiAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBnZXRTdGF0ZSgpOiBUeXBlcy5zdGF0ZSB7XHJcbiAgICAgICAgIHJldHVybiBVdGlsaXR5LmRlZXBDb3B5KHtcclxuICAgICAgICAgICAgam9pbnRzOiB0aGlzLmpvaW50cyxcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZGlzYWJsZWRcclxuICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGluc2VydEludG8oZWxlbWVudD86IFNWR0dyYXBoaWNzRWxlbWVudCkge1xyXG4gICAgICAgICBVdGlsaXR5Lkluc2VydC5sYXN0KHRoaXMuZ3JvdXAuZWxlbWVudCwgZWxlbWVudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRyYW5zZmVyRnVuY3Rpb24oKSB7IHJldHVybiBbXSB9O1xyXG4gICB9XHJcblxyXG4gICBleHBvcnQgY2xhc3MgU2NoZW1hdGljIGV4dGVuZHMgQmFzZSB7XHJcbiAgICAgIGRyYXcoKSB7XHJcbiAgICAgICAgIC8vKFByZXBlbmQgc28gaGFuZGxlcyBhcHBlYXIgb24gdG9wKVxyXG4gICAgICAgICB0aGlzLmdyb3VwLnByZXBlbmQoZHJhd1NjaGVtYXRpYyh0aGlzKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGdldENvbm5lY3Rpb25zKCk6IENvbXBvbmVudC5UeXBlcy5jb25uZWN0b3JbXVtdW10ge1xyXG4gICAgICAgICByZXR1cm4gR2VuZXJpY3MuZ2V0Q29tcG9uZW50Q29ubmVjdGlvbnModGhpcywgbWFuaWZlc3Quc2NoZW1hdGljKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbWFrZUNvbm5lY3RvcnMoKSB7XHJcbiAgICAgICAgIGlmICh0aGlzLmlzUG9sYXJpc2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdG9yU2V0cyA9IFtbXHJcbiAgICAgICAgICAgICAgIENvbXBvbmVudC5HZW5lcmljcy5tYWtlQ29ubmVjdG9yKHRoaXMsIFwiY2F0aG9kZVwiLCBcIm5vZGVcIiwgdGhpcy5qb2ludHNbSU5ERVhDQVRIT0RFXSwgXCItXCIpLFxyXG4gICAgICAgICAgICAgICBDb21wb25lbnQuR2VuZXJpY3MubWFrZUNvbm5lY3Rvcih0aGlzLCBcImFub2RlXCIsIFwibm9kZVwiLCB0aGlzLmpvaW50c1tJTkRFWEFOT0RFXSwgXCIrXCIpLFxyXG4gICAgICAgICAgICBdXVxyXG4gICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RvclNldHMgPSBbW1xyXG4gICAgICAgICAgICAgICBDb21wb25lbnQuR2VuZXJpY3MubWFrZUNvbm5lY3Rvcih0aGlzLCBcIlwiLCBcIm5vZGVcIiwgdGhpcy5qb2ludHNbSU5ERVhDQVRIT0RFXSksXHJcbiAgICAgICAgICAgICAgIENvbXBvbmVudC5HZW5lcmljcy5tYWtlQ29ubmVjdG9yKHRoaXMsIFwiXCIsIFwibm9kZVwiLCB0aGlzLmpvaW50c1tJTkRFWEFOT0RFXSksXHJcbiAgICAgICAgICAgIF1dXHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICB9XHJcblxyXG4gICBleHBvcnQgY2xhc3MgTGF5b3V0IGV4dGVuZHMgQmFzZSB7XHJcbiAgICAgIGRyYXcoKSB7XHJcbiAgICAgICAgIC8vKFByZXBlbmQgc28gaGFuZGxlcyBhcHBlYXIgb24gdG9wKVxyXG4gICAgICAgICB0aGlzLmdyb3VwLnByZXBlbmQoZHJhd0xheW91dCh0aGlzKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGdldENvbm5lY3Rpb25zKCk6IENvbXBvbmVudC5UeXBlcy5jb25uZWN0b3JbXVtdW10ge1xyXG4gICAgICAgICByZXR1cm4gR2VuZXJpY3MuZ2V0Q29tcG9uZW50Q29ubmVjdGlvbnModGhpcywgbWFuaWZlc3QubGF5b3V0KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbWFrZUNvbm5lY3RvcnMoKSB7XHJcbiAgICAgICAgIGlmICh0aGlzLmlzUG9sYXJpc2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdG9yU2V0cyA9IFtbXHJcbiAgICAgICAgICAgICAgIENvbXBvbmVudC5HZW5lcmljcy5tYWtlQ29ubmVjdG9yKHRoaXMsIFwiY2F0aG9kZVwiLCBcInBpblwiLCB0aGlzLmpvaW50c1tJTkRFWENBVEhPREVdLCBcIi1cIiksXHJcbiAgICAgICAgICAgICAgIENvbXBvbmVudC5HZW5lcmljcy5tYWtlQ29ubmVjdG9yKHRoaXMsIFwiYW5vZGVcIiwgXCJwaW5cIiwgdGhpcy5qb2ludHNbSU5ERVhBTk9ERV0sIFwiK1wiKSxcclxuICAgICAgICAgICAgXV1cclxuICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0b3JTZXRzID0gW1tcclxuICAgICAgICAgICAgICAgQ29tcG9uZW50LkdlbmVyaWNzLm1ha2VDb25uZWN0b3IodGhpcywgXCJcIiwgXCJwaW5cIiwgdGhpcy5qb2ludHNbSU5ERVhDQVRIT0RFXSksXHJcbiAgICAgICAgICAgICAgIENvbXBvbmVudC5HZW5lcmljcy5tYWtlQ29ubmVjdG9yKHRoaXMsIFwiXCIsIFwicGluXCIsIHRoaXMuam9pbnRzW0lOREVYQU5PREVdKSxcclxuICAgICAgICAgICAgXV1cclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgIH1cclxufVxyXG4iXX0=