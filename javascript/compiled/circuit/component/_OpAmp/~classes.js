"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _OpAmp;
        (function (_OpAmp) {
            var Classes;
            (function (Classes) {
                class Base extends Component.Instance {
                    constructor(values) {
                        super(values);
                        this.offsetVoltage = values.offsetVoltage;
                    }
                    getProperties() {
                        return Utility.deepCopy({
                            name: this.name,
                            offsetVoltage: this.offsetVoltage
                        });
                    }
                    insertInto(element) {
                        Utility.Insert.last(this.group.element, element);
                    }
                    transferFunction() { return []; }
                    ;
                }
                class Schematic extends Base {
                    constructor(values) {
                        super(values);
                        this.offsetVoltage = values.offsetVoltage;
                        this.joints = values.joints;
                    }
                    getState() {
                        return Utility.deepCopy({
                            joints: this.joints,
                            disabled: this.disabled
                        });
                    }
                    draw() {
                        this.group.prepend(_OpAmp.drawSchematic(this));
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, manifest.schematic);
                    }
                    makeConnectors() {
                        let [posPower, negPower] = (this.joints[_OpAmp.INDEXPOW1].y < this.joints[_OpAmp.INDEXPOW2].y)
                            ? [this.joints[_OpAmp.INDEXPOW1], this.joints[_OpAmp.INDEXPOW2]]
                            : [this.joints[_OpAmp.INDEXPOW2], this.joints[_OpAmp.INDEXPOW1]];
                        this.connectorSets = [[
                                Component.Generics.makeConnector(this, "vcc+", "node", posPower, "v+"),
                                Component.Generics.makeConnector(this, "out", "node", this.joints[_OpAmp.INDEXOUT], "o"),
                                Component.Generics.makeConnector(this, "in-", "node", this.joints[_OpAmp.INDEXINNEG], "i-"),
                                Component.Generics.makeConnector(this, "in+", "node", this.joints[_OpAmp.INDEXINPOS], "i+"),
                                Component.Generics.makeConnector(this, "vcc-", "node", negPower, "v-"),
                            ]];
                    }
                }
                Classes.Schematic = Schematic;
                class Layout extends Base {
                    constructor(values) {
                        super(values);
                        this.offsetVoltage = values.offsetVoltage;
                        this.isDual = values.isDual;
                        this.joints = values.joints;
                    }
                    getState() {
                        return Utility.deepCopy({
                            isDual: this.isDual,
                            joints: this.joints,
                            disabled: this.disabled
                        });
                    }
                    draw() {
                        this.group.prepend(_OpAmp.drawLayout(this));
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, manifest.layout);
                    }
                    makeConnectors() {
                        let gs = Constants.gridSpacing;
                        let c = this.joints[_OpAmp.INDEXCENTRE];
                        let r = vector(this.joints[_OpAmp.INDEXCENTRE]).getAngleTo(this.joints[_OpAmp.INDEXROTATION]);
                        let connectorPoints = vector([
                            { x: 0 * gs, y: 3 * gs },
                            { x: 1 * gs, y: 3 * gs },
                            { x: 2 * gs, y: 3 * gs },
                            { x: 3 * gs, y: 3 * gs },
                            { x: 3 * gs, y: 0 * gs },
                            { x: 2 * gs, y: 0 * gs },
                            { x: 1 * gs, y: 0 * gs },
                            { x: 0 * gs, y: 0 * gs }
                        ]).sumWith(vector(-30)).rotate(r).sumWith(c).vectors;
                        if (this.isDual) {
                            this.connectorSets = [[
                                    Component.Generics.makeConnector(this, "vcc+", "pin", connectorPoints[7], "v+"),
                                    Component.Generics.makeConnector(this, "out", "pin", connectorPoints[6], "1o"),
                                    Component.Generics.makeConnector(this, "in-", "pin", connectorPoints[5], "1i-"),
                                    Component.Generics.makeConnector(this, "in+", "pin", connectorPoints[4], "1i+"),
                                    Component.Generics.makeConnector(this, "vcc-", "pin", connectorPoints[3], "v-"),
                                ], [
                                    Component.Generics.makeConnector(this, "vcc+", "pin", connectorPoints[7], "v+"),
                                    Component.Generics.makeConnector(this, "out", "pin", connectorPoints[0], "2o"),
                                    Component.Generics.makeConnector(this, "in-", "pin", connectorPoints[1], "2i-"),
                                    Component.Generics.makeConnector(this, "in+", "pin", connectorPoints[2], "2i+"),
                                    Component.Generics.makeConnector(this, "vcc-", "pin", connectorPoints[3], "v-"),
                                ]];
                        }
                        else {
                            this.connectorSets = [[
                                    Component.Generics.makeConnector(this, "vcc+", "pin", connectorPoints[6], "v+"),
                                    Component.Generics.makeConnector(this, "out", "pin", connectorPoints[5], "o"),
                                    Component.Generics.makeConnector(this, "in-", "pin", connectorPoints[1], "i-"),
                                    Component.Generics.makeConnector(this, "in+", "pin", connectorPoints[2], "i+"),
                                    Component.Generics.makeConnector(this, "vcc-", "pin", connectorPoints[3], "v-"),
                                    Component.Generics.makeConnector(this, "nc", "pin", connectorPoints[7], "nc"),
                                    Component.Generics.makeConnector(this, "offset n1", "pin", connectorPoints[4], "nc"),
                                    Component.Generics.makeConnector(this, "offset n2", "pin", connectorPoints[0], "nc"),
                                ]];
                        }
                    }
                    replaceWithDual() {
                        this.isDual = true;
                        this.group.clearChildren();
                        this.draw();
                        this.makeConnectors();
                    }
                }
                Classes.Layout = Layout;
            })(Classes = _OpAmp.Classes || (_OpAmp.Classes = {}));
        })(_OpAmp = Component._OpAmp || (Component._OpAmp = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoifmNsYXNzZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50L19PcEFtcC9+Y2xhc3Nlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxPQUFPLENBaUpoQjtBQWpKRCxXQUFVLE9BQU87SUFBQyxJQUFBLFNBQVMsQ0FpSjFCO0lBakppQixXQUFBLFNBQVM7UUFBQyxJQUFBLE1BQU0sQ0FpSmpDO1FBakoyQixXQUFBLE1BQU07WUFBQyxJQUFBLE9BQU8sQ0FpSnpDO1lBakprQyxXQUFBLE9BQU87Z0JBRXZDLE1BQWUsSUFBSyxTQUFRLFNBQVMsQ0FBQyxRQUFRO29CQUczQyxZQUFZLE1BQWtEO3dCQUMzRCxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ2QsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDO29CQUM3QyxDQUFDO29CQUVELGFBQWE7d0JBQ1YsT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDOzRCQUNyQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7NEJBQ2YsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhO3lCQUNuQyxDQUFDLENBQUM7b0JBQ04sQ0FBQztvQkFJRCxVQUFVLENBQUMsT0FBNEI7d0JBQ3BDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUNwRCxDQUFDO29CQUVELGdCQUFnQixLQUFLLE9BQU8sRUFBRSxDQUFBLENBQUMsQ0FBQztvQkFBQSxDQUFDO2lCQUNuQztnQkFFRCxNQUFhLFNBQVUsU0FBUSxJQUFJO29CQUVoQyxZQUFZLE1BQTZCO3dCQUN0QyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ2QsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDO3dCQUMxQyxJQUFJLENBQUMs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LFNBQVMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUM7b0NBQzlFLFNBQVMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUM7b0NBQy9FLFNBQVMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUM7b0NBQy9FLFNBQVMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUM7aUNBQ2pGLENBQUMsQ0FBQzt5QkFDTDs2QkFBTTs0QkFDSixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUM7b0NBRW5CLFNBQVMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUM7b0NBQy9FLFNBQVMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7b0NBQzdFLFNBQVMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUM7b0NBQzlFLFNBQVMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUM7b0NBQzlFLFNBQVMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUM7b0NBQy9FLFNBQVMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUM7b0NBQzdFLFNBQVMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUM7b0NBQ3BGLFNBQVMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUM7aUNBQ3RGLENBQUMsQ0FBQzt5QkFDTDtvQkFFSixDQUFDO29CQUNELGVBQWU7d0JBQ1osSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7d0JBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7d0JBQzNCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDWixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ3pCLENBQUM7aUJBRUg7Z0JBOUVZLGNBQU0sU0E4RWxCLENBQUE7WUFDSixDQUFDLEVBakprQyxPQUFPLEdBQVAsY0FBTyxLQUFQLGNBQU8sUUFpSnpDO1FBQUQsQ0FBQyxFQWpKMkIsTUFBTSxHQUFOLGdCQUFNLEtBQU4sZ0JBQU0sUUFpSmpDO0lBQUQsQ0FBQyxFQWpKaUIsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFpSjFCO0FBQUQsQ0FBQyxFQWpKUyxPQUFPLEtBQVAsT0FBTyxRQWlKaEIiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgQ2lyY3VpdC5Db21wb25lbnQuX09wQW1wLkNsYXNzZXMge1xyXG5cclxuICAgYWJzdHJhY3QgY2xhc3MgQmFzZSBleHRlbmRzIENvbXBvbmVudC5JbnN0YW5jZSBpbXBsZW1lbnRzIFR5cGVzLnByb3BlcnRpZXMge1xyXG4gICAgICBvZmZzZXRWb2x0YWdlOiBudW1iZXI7XHJcblxyXG4gICAgICBjb25zdHJ1Y3Rvcih2YWx1ZXM6IFR5cGVzLnZhbHVlc1NjaGVtYXRpYyB8IFR5cGVzLnZhbHVlc0xheW91dCkge1xyXG4gICAgICAgICBzdXBlcih2YWx1ZXMpO1xyXG4gICAgICAgICB0aGlzLm9mZnNldFZvbHRhZ2UgPSB2YWx1ZXMub2Zmc2V0Vm9sdGFnZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZ2V0UHJvcGVydGllcygpOiBUeXBlcy5wcm9wZXJ0aWVzIHtcclxuICAgICAgICAgcmV0dXJuIFV0aWxpdHkuZGVlcENvcHkoe1xyXG4gICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXHJcbiAgICAgICAgICAgIG9mZnNldFZvbHRhZ2U6IHRoaXMub2Zmc2V0Vm9sdGFnZVxyXG4gICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgYWJzdHJhY3QgZ2V0U3RhdGUoKTogVHlwZXMuc3RhdGVMYXlvdXQgfCBUeXBlcy5zdGF0ZVNjaGVtYXRpYztcclxuXHJcbiAgICAgIGluc2VydEludG8oZWxlbWVudD86IFNWR0dyYXBoaWNzRWxlbWVudCkge1xyXG4gICAgICAgICBVdGlsaXR5Lkluc2VydC5sYXN0KHRoaXMuZ3JvdXAuZWxlbWVudCwgZWxlbWVudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRyYW5zZmVyRnVuY3Rpb24oKSB7IHJldHVybiBbXSB9O1xyXG4gICB9XHJcblxyXG4gICBleHBvcnQgY2xhc3MgU2NoZW1hdGljIGV4dGVuZHMgQmFzZSBpbXBsZW1lbnRzIFR5cGVzLnZhbHVlc1NjaGVtYXRpYyB7XHJcbiAgICAgIGpvaW50czogW1ZlY3RvciwgVmVjdG9yLCBWZWN0b3IsIFZlY3RvciwgVmVjdG9yXTtcclxuICAgICAgY29uc3RydWN0b3IodmFsdWVzOiBUeXBlcy52YWx1ZXNTY2hlbWF0aWMpIHtcclxuICAgICAgICAgc3VwZXIodmFsdWVzKTtcclxuICAgICAgICAgdGhpcy5vZmZzZXRWb2x0YWdlID0gdmFsdWVzLm9mZnNldFZvbHRhZ2U7XHJcbiAgICAgICAgIHRoaXMuam9pbnRzID0gdmFsdWVzLmpvaW50cztcclxuICAgICAgfVxyXG4gICAgICBnZXRTdGF0ZSgpOiBUeXBlcy5zdGF0ZVNjaGVtYXRpYyB7XHJcbiAgICAgICAgIHJldHVybiBVdGlsaXR5LmRlZXBDb3B5KHtcclxuICAgICAgICAgICAgam9pbnRzOiB0aGlzLmpvaW50cyxcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZGlzYWJsZWRcclxuICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZHJhdygpIHtcclxuICAgICAgICAgLy8oUHJlcGVuZCBzbyBoYW5kbGVzIGFwcGVhciBvbiB0b3ApXHJcbiAgICAgICAgIHRoaXMuZ3JvdXAucHJlcGVuZChkcmF3U2NoZW1hdGljKHRoaXMpKTtcclxuICAgICAgfVxyXG4gICAgICBnZXRDb25uZWN0aW9ucygpOiBDb21wb25lbnQuVHlwZXMuY29ubmVjdG9yW11bXVtdIHtcclxuICAgICAgICAgcmV0dXJuIEdlbmVyaWNzLmdldENvbXBvbmVudENvbm5lY3Rpb25zKHRoaXMsIG1hbmlmZXN0LnNjaGVtYXRpYyk7XHJcbiAgICAgIH1cclxuICAgICAgbWFrZUNvbm5lY3RvcnMoKSB7XHJcblxyXG4gICAgICAgICBsZXQgW3Bvc1Bvd2VyLCBuZWdQb3dlcl0gPSAodGhpcy5qb2ludHNbSU5ERVhQT1cxXS55IDwgdGhpcy5qb2ludHNbSU5ERVhQT1cyXS55KVxyXG4gICAgICAgICAgICA/IFt0aGlzLmpvaW50c1tJTkRFWFBPVzFdLCB0aGlzLmpvaW50c1tJTkRFWFBPVzJdXVxyXG4gICAgICAgICAgICA6IFt0aGlzLmpvaW50c1tJTkRFWFBPVzJdLCB0aGlzLmpvaW50c1tJTkRFWFBPVzFdXTtcclxuXHJcbiAgICAgICAgIHRoaXMuY29ubmVjdG9yU2V0cyA9IFtbXHJcbiAgICAgICAgICAgIC8vIFRoZSBvcmRlcmluZyBoZXJlIGlzIGltcG9ydGFudCBzbyB0aGUgY29sb3JzIGxpbmUgdXAgYmV0d2VlbiBsYXlvdXQgYW5kIHNjaGVtYXRpY1xyXG4gICAgICAgICAgICBDb21wb25lbnQuR2VuZXJpY3MubWFrZUNvbm5lY3Rvcih0aGlzLCBcInZjYytcIiwgXCJub2RlXCIsIHBvc1Bvd2VyLCBcInYrXCIpLCAgICAgICAgICAgICAgLy83XHJcbiAgICAgICAgICAgIENvbXBvbmVudC5HZW5lcmljcy5tYWtlQ29ubmVjdG9yKHRoaXMsIFwib3V0XCIsIFwibm9kZVwiLCB0aGlzLmpvaW50c1tJTkRFWE9VVF0sIFwib1wiKSwgICAvLzZcclxuICAgICAgICAgICAgQ29tcG9uZW50LkdlbmVyaWNzLm1ha2VDb25uZWN0b3IodGhpcywgXCJpbi1cIiwgXCJub2RlXCIsIHRoaXMuam9pbnRzW0lOREVYSU5ORUddLCBcImktXCIpLC8vMlxyXG4gICAgICAgICAgICBDb21wb25lbnQuR2VuZXJpY3MubWFrZUNvbm5lY3Rvcih0aGlzLCBcImluK1wiLCBcIm5vZGVcIiwgdGhpcy5qb2ludHNbSU5ERVhJTlBPU10sIFwiaStcIiksLy8zXHJcbiAgICAgICAgICAgIENvbXBvbmVudC5HZW5lcmljcy5tYWtlQ29ubmVjdG9yKHRoaXMsIFwidmNjLVwiLCBcIm5vZGVcIiwgbmVnUG93ZXIsIFwidi1cIiksICAgICAgICAgICAgICAvLzRcclxuICAgICAgICAgICAgLy9Db21wb25lbnQuR2VuZXJpY3MubWFrZUNvbm5lY3Rvcih0aGlzLCBcIm5jXCIsIFwibm9kZVwiLCB7Pz8/fSksICAgICAgICAgICAgICAgICAgICAgICAvLzhcclxuICAgICAgICAgICAgLy9Db21wb25lbnQuR2VuZXJpY3MubWFrZUNvbm5lY3Rvcih0aGlzLCBcIm9mZnNldCBuMVwiLCBcIm5vZGVcIiwgez8/P30pLCAgICAgICAgICAgICAgICAvLzVcclxuICAgICAgICAgICAgLy9Db21wb25lbnQuR2VuZXJpY3MubWFrZUNvbm5lY3Rvcih0aGlzLCBcIm9mZnNldCBuMlwiLCBcIm5vZGVcIiwgez8/P30pLCAgICAgICAgICAgICAgICAvLzFcclxuICAgICAgICAgXV07XHJcbiAgICAgIH1cclxuICAgfVxyXG5cclxuICAgZXhwb3J0IGNsYXNzIExheW91dCBleHRlbmRzIEJhc2UgaW1wbGVtZW50cyBUeXBlcy52YWx1ZXNMYXlvdXQge1xyXG4gICAgICBpc0R1YWw6IGJvb2xlYW47XHJcbiAgICAgIGpvaW50czogW1ZlY3RvciwgVmVjdG9yXTtcclxuICAgICAgY29uc3RydWN0b3IodmFsdWVzOiBUeXBlcy52YWx1ZXNMYXlvdXQpIHtcclxuICAgICAgICAgc3VwZXIodmFsdWVzKTtcclxuICAgICAgICAgdGhpcy5vZmZzZXRWb2x0YWdlID0gdmFsdWVzLm9mZnNldFZvbHRhZ2U7XHJcbiAgICAgICAgIHRoaXMuaXNEdWFsID0gdmFsdWVzLmlzRHVhbDtcclxuICAgICAgICAgdGhpcy5qb2ludHMgPSB2YWx1ZXMuam9pbnRzO1xyXG4gICAgICB9XHJcbiAgICAgIGdldFN0YXRlKCk6IFR5cGVzLnN0YXRlTGF5b3V0IHtcclxuICAgICAgICAgcmV0dXJuIFV0aWxpdHkuZGVlcENvcHkoe1xyXG4gICAgICAgICAgICBpc0R1YWw6IHRoaXMuaXNEdWFsLFxyXG4gICAgICAgICAgICBqb2ludHM6IHRoaXMuam9pbnRzLFxyXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5kaXNhYmxlZFxyXG4gICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBkcmF3KCkge1xyXG4gICAgICAgICAvLyhQcmVwZW5kIHNvIGhhbmRsZXMgYXBwZWFyIG9uIHRvcClcclxuICAgICAgICAgdGhpcy5ncm91cC5wcmVwZW5kKGRyYXdMYXlvdXQodGhpcykpO1xyXG4gICAgICB9XHJcbiAgICAgIGdldENvbm5lY3Rpb25zKCk6IENvbXBvbmVudC5UeXBlcy5jb25uZWN0b3JbXVtdW10ge1xyXG4gICAgICAgICByZXR1cm4gR2VuZXJpY3MuZ2V0Q29tcG9uZW50Q29ubmVjdGlvbnModGhpcywgbWFuaWZlc3QubGF5b3V0KTtcclxuICAgICAgfVxyXG4gICAgICBtYWtlQ29ubmVjdG9ycygpIHtcclxuICAgICAgICAgbGV0IGdzID0gQ29uc3RhbnRzLmdyaWRTcGFjaW5nO1xyXG5cclxuICAgICAgICAgbGV0IGMgPSB0aGlzLmpvaW50c1tJTkRFWENFTlRSRV07XHJcbiAgICAgICAgIGxldCByID0gdmVjdG9yKHRoaXMuam9pbnRzW0lOREVYQ0VOVFJFXSkuZ2V0QW5nbGVUbyh0aGlzLmpvaW50c1tJTkRFWFJPVEFUSU9OXSk7XHJcblxyXG4gICAgICAgICBsZXQgY29ubmVjdG9yUG9pbnRzID0gdmVjdG9yKFtcclxuICAgICAgICAgICAgeyB4OiAwICogZ3MsIHk6IDMgKiBncyB9LC8vMVxyXG4gICAgICAgICAgICB7IHg6IDEgKiBncywgeTogMyAqIGdzIH0sLy8yXHJcbiAgICAgICAgICAgIHsgeDogMiAqIGdzLCB5OiAzICogZ3MgfSwvLzNcclxuICAgICAgICAgICAgeyB4OiAzICogZ3MsIHk6IDMgKiBncyB9LC8vNFxyXG4gICAgICAgICAgICB7IHg6IDMgKiBncywgeTogMCAqIGdzIH0sLy81XHJcbiAgICAgICAgICAgIHsgeDogMiAqIGdzLCB5OiAwICogZ3MgfSwvLzZcclxuICAgICAgICAgICAgeyB4OiAxICogZ3MsIHk6IDAgKiBncyB9LC8vN1xyXG4gICAgICAgICAgICB7IHg6IDAgKiBncywgeTogMCAqIGdzIH0gLy84XHJcbiAgICAgICAgIF0pLnN1bVdpdGgodmVjdG9yKC0zMCkpLnJvdGF0ZShyKS5zdW1XaXRoKGMpLnZlY3RvcnM7XHJcblxyXG5cclxuICAgICAgICAgaWYgKHRoaXMuaXNEdWFsKSB7XHJcbiAgICAgICAgICAgIC8vIE5vdGUgdGhhdCB0aGUgcG93ZXIgc2VsZWN0b3JzIHBoeXNpY2FsbHkgb2NjdXB5IHRoZSBzYW1lIHNwYWNlLlxyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RvclNldHMgPSBbW1xyXG4gICAgICAgICAgICAgICBDb21wb25lbnQuR2VuZXJpY3MubWFrZUNvbm5lY3Rvcih0aGlzLCBcInZjYytcIiwgXCJwaW5cIiwgY29ubmVjdG9yUG9pbnRzWzddLCBcInYrXCIpLCAgLy84XHJcbiAgICAgICAgICAgICAgIENvbXBvbmVudC5HZW5lcmljcy5tYWtlQ29ubmVjdG9yKHRoaXMsIFwib3V0XCIsIFwicGluXCIsIGNvbm5lY3RvclBvaW50c1s2XSwgXCIxb1wiKSwgICAvLzdcclxuICAgICAgICAgICAgICAgQ29tcG9uZW50LkdlbmVyaWNzLm1ha2VDb25uZWN0b3IodGhpcywgXCJpbi1cIiwgXCJwaW5cIiwgY29ubmVjdG9yUG9pbnRzWzVdLCBcIjFpLVwiKSwgIC8vNlxyXG4gICAgICAgICAgICAgICBDb21wb25lbnQuR2VuZXJpY3MubWFrZUNvbm5lY3Rvcih0aGlzLCBcImluK1wiLCBcInBpblwiLCBjb25uZWN0b3JQb2ludHNbNF0sIFwiMWkrXCIpLCAgLy81XHJcbiAgICAgICAgICAgICAgIENvbXBvbmVudC5HZW5lcmljcy5tYWtlQ29ubmVjdG9yKHRoaXMsIFwidmNjLVwiLCBcInBpblwiLCBjb25uZWN0b3JQb2ludHNbM10sIFwidi1cIiksICAvLzRcclxuICAgICAgICAgICAgXSwgW1xyXG4gICAgICAgICAgICAgICBDb21wb25lbnQuR2VuZXJpY3MubWFrZUNvbm5lY3Rvcih0aGlzLCBcInZjYytcIiwgXCJwaW5cIiwgY29ubmVjdG9yUG9pbnRzWzddLCBcInYrXCIpLCAgLy84XHJcbiAgICAgICAgICAgICAgIENvbXBvbmVudC5HZW5lcmljcy5tYWtlQ29ubmVjdG9yKHRoaXMsIFwib3V0XCIsIFwicGluXCIsIGNvbm5lY3RvclBvaW50c1swXSwgXCIyb1wiKSwgICAvLzFcclxuICAgICAgICAgICAgICAgQ29tcG9uZW50LkdlbmVyaWNzLm1ha2VDb25uZWN0b3IodGhpcywgXCJpbi1cIiwgXCJwaW5cIiwgY29ubmVjdG9yUG9pbnRzWzFdLCBcIjJpLVwiKSwgIC8vMlxyXG4gICAgICAgICAgICAgICBDb21wb25lbnQuR2VuZXJpY3MubWFrZUNvbm5lY3Rvcih0aGlzLCBcImluK1wiLCBcInBpblwiLCBjb25uZWN0b3JQb2ludHNbMl0sIFwiMmkrXCIpLCAgLy8zXHJcbiAgICAgICAgICAgICAgIENvbXBvbmVudC5HZW5lcmljcy5tYWtlQ29ubmVjdG9yKHRoaXMsIFwidmNjLVwiLCBcInBpblwiLCBjb25uZWN0b3JQb2ludHNbM10sIFwidi1cIiksICAvLzRcclxuICAgICAgICAgICAgXV07XHJcbiAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdG9yU2V0cyA9IFtbXHJcbiAgICAgICAgICAgICAgIC8vIFRoZSBvcmRlcmluZyBoZXJlIGlzIGltcG9ydGFudCBzbyB0aGUgY29sb3JzIGxpbmUgdXAgYmV0d2VlbiBsYXlvdXQgYW5kIHNjaGVtYXRpY1xyXG4gICAgICAgICAgICAgICBDb21wb25lbnQuR2VuZXJpY3MubWFrZUNvbm5lY3Rvcih0aGlzLCBcInZjYytcIiwgXCJwaW5cIiwgY29ubmVjdG9yUG9pbnRzWzZdLCBcInYrXCIpLCAgLy83XHJcbiAgICAgICAgICAgICAgIENvbXBvbmVudC5HZW5lcmljcy5tYWtlQ29ubmVjdG9yKHRoaXMsIFwib3V0XCIsIFwicGluXCIsIGNvbm5lY3RvclBvaW50c1s1XSwgXCJvXCIpLCAgICAvLzZcclxuICAgICAgICAgICAgICAgQ29tcG9uZW50LkdlbmVyaWNzLm1ha2VDb25uZWN0b3IodGhpcywgXCJpbi1cIiwgXCJwaW5cIiwgY29ubmVjdG9yUG9pbnRzWzFdLCBcImktXCIpLCAgIC8vMlxyXG4gICAgICAgICAgICAgICBDb21wb25lbnQuR2VuZXJpY3MubWFrZUNvbm5lY3Rvcih0aGlzLCBcImluK1wiLCBcInBpblwiLCBjb25uZWN0b3JQb2ludHNbMl0sIFwiaStcIiksICAgLy8zXHJcbiAgICAgICAgICAgICAgIENvbXBvbmVudC5HZW5lcmljcy5tYWtlQ29ubmVjdG9yKHRoaXMsIFwidmNjLVwiLCBcInBpblwiLCBjb25uZWN0b3JQb2ludHNbM10sIFwidi1cIiksICAvLzRcclxuICAgICAgICAgICAgICAgQ29tcG9uZW50LkdlbmVyaWNzLm1ha2VDb25uZWN0b3IodGhpcywgXCJuY1wiLCBcInBpblwiLCBjb25uZWN0b3JQb2ludHNbN10sIFwibmNcIiksICAgIC8vOFxyXG4gICAgICAgICAgICAgICBDb21wb25lbnQuR2VuZXJpY3MubWFrZUNvbm5lY3Rvcih0aGlzLCBcIm9mZnNldCBuMVwiLCBcInBpblwiLCBjb25uZWN0b3JQb2ludHNbNF0sIFwibmNcIiksIC8vNVxyXG4gICAgICAgICAgICAgICBDb21wb25lbnQuR2VuZXJpY3MubWFrZUNvbm5lY3Rvcih0aGlzLCBcIm9mZnNldCBuMlwiLCBcInBpblwiLCBjb25uZWN0b3JQb2ludHNbMF0sIFwibmNcIiksIC8vMVxyXG4gICAgICAgICAgICBdXTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG4gICAgICByZXBsYWNlV2l0aER1YWwoKSB7XHJcbiAgICAgICAgIHRoaXMuaXNEdWFsID0gdHJ1ZTtcclxuICAgICAgICAgdGhpcy5ncm91cC5jbGVhckNoaWxkcmVuKCk7XHJcbiAgICAgICAgIHRoaXMuZHJhdygpO1xyXG4gICAgICAgICB0aGlzLm1ha2VDb25uZWN0b3JzKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgIH1cclxufVxyXG4iXX0=