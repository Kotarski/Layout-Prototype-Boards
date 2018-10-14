"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Breadboard;
        (function (_Breadboard) {
            var Classes;
            (function (Classes) {
                class Base extends Component.Instance {
                    constructor(values) {
                        super(values);
                        this.tracks = [];
                        this.connectorSets = [];
                        this.joints = values.joints;
                    }
                    getProperties() {
                        return Utility.deepCopy({
                            name: this.name,
                        });
                    }
                    getState() {
                        return Utility.deepCopy({
                            joints: this.joints,
                            disabled: this.disabled
                        });
                    }
                    makeConnectors() { }
                    insertInto(element) {
                        Utility.Insert.first(this.group.element, element);
                    }
                    transferFunction() { return []; }
                    ;
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, manifest.layout);
                    }
                }
                class Small extends Base {
                    draw() {
                        this.tracks = _Breadboard.makeTracks(this, "small");
                        this.group.prepend(_Breadboard.drawSmall(this), this.tracks.map(t => t.group));
                    }
                }
                Classes.Small = Small;
                class Large extends Base {
                    draw() {
                        this.tracks = _Breadboard.makeTracks(this, "large");
                        this.group.prepend(_Breadboard.drawLarge(this), this.tracks.map(t => t.group));
                    }
                }
                Classes.Large = Large;
            })(Classes = _Breadboard.Classes || (_Breadboard.Classes = {}));
        })(_Breadboard = Component._Breadboard || (Component._Breadboard = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoifmNsYXNzZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50L19CcmVhZGJvYXJkL35jbGFzc2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE9BQU8sQ0FzRGhCO0FBdERELFdBQVUsT0FBTztJQUFDLElBQUEsU0FBUyxDQXNEMUI7SUF0RGlCLFdBQUEsU0FBUztRQUFDLElBQUEsV0FBVyxDQXNEdEM7UUF0RDJCLFdBQUEsV0FBVztZQUFDLElBQUEsT0FBTyxDQXNEOUM7WUF0RHVDLFdBQUEsT0FBTztnQkFFNUMsTUFBZSxJQUFLLFNBQVEsU0FBUyxDQUFDLFFBQVE7b0JBSzNDLFlBQVksTUFBb0I7d0JBQzdCLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFKakIsV0FBTSxHQUE0QixFQUFFLENBQUM7d0JBQ3JDLGtCQUFhLEdBQTZCLEVBQUUsQ0FBQzt3QkFJMUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFBO29CQUM5QixDQUFDO29CQUVELGFBQWE7d0JBQ1YsT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDOzRCQUNyQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7eUJBQ2pCLENBQUMsQ0FBQztvQkFDTixDQUFDO29CQUVELFFBQVE7d0JBQ0wsT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDOzRCQUNyQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07NEJBQ25CLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTt5QkFDekIsQ0FBQyxDQUFDO29CQUNOLENBQUM7b0JBR0QsY0FBYyxLQUFLLENBQUM7b0JBRXBCLFVBQVUsQ0FBQyxPQUE0Qjt3QkFDcEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQ3JELENBQUM7b0JBRUQsZ0JBQWdCLEtBQUssT0FBTyxFQUFFLENBQUEsQ0FBQyxDQUFDO29CQUFBLENBQUM7b0JBRWpDLGNBQWM7d0JBQ1gsT0FBTyxVQUFBLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNsRSxDQUFDO2lCQUNIO2dCQUVELE1BQWEsS0FBTSxTQUFRLElBQUk7b0JBQzVCLElBQUk7d0JBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxZQUFBLFVBQVUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7d0JBRXhDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQUEsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ3RFLENBQUM7aUJBQ0g7Z0JBTlksYUFBSyxRQU1qQixDQUFBO2dCQUVELE1BQWEsS0FBTSxTQUFRLElBQUk7b0JBQzVCLElBQUk7d0JBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxZQUFBLFVBQVUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7d0JBRXhDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQUEsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ3RFLENBQUM7aUJBQ0g7Z0JBTlksYUFBSyxRQU1qQixDQUFBO1lBQ0osQ0FBQyxFQXREdUMsT0FBTyxHQUFQLG1CQUFPLEtBQVAsbUJBQU8sUUFzRDlDO1FBQUQsQ0FBQyxFQXREMkIsV0FBVyxHQUFYLHFCQUFXLEtBQVgscUJBQVcsUUFzRHRDO0lBQUQsQ0FBQyxFQXREaUIsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFzRDFCO0FBQUQsQ0FBQyxFQXREUyxPQUFPLEtBQVAsT0FBTyxRQXNEaEIiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgQ2lyY3VpdC5Db21wb25lbnQuX0JyZWFkYm9hcmQuQ2xhc3NlcyB7XHJcblxyXG4gICBhYnN0cmFjdCBjbGFzcyBCYXNlIGV4dGVuZHMgQ29tcG9uZW50Lkluc3RhbmNlIGltcGxlbWVudHMgVHlwZXMudmFsdWVzIHtcclxuICAgICAgam9pbnRzOiBbVmVjdG9yLCBWZWN0b3JdO1xyXG4gICAgICB0cmFja3M6IF9UcmFjay5DbGFzc2VzLkxheW91dFtdID0gW107XHJcbiAgICAgIGNvbm5lY3RvclNldHM6IENvbXBvbmVudC5UeXBlcy5ob2xlW11bXSA9IFtdO1xyXG5cclxuICAgICAgY29uc3RydWN0b3IodmFsdWVzOiBUeXBlcy52YWx1ZXMpIHtcclxuICAgICAgICAgc3VwZXIodmFsdWVzKTtcclxuICAgICAgICAgdGhpcy5qb2ludHMgPSB2YWx1ZXMuam9pbnRzXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGdldFByb3BlcnRpZXMoKTogVHlwZXMucHJvcGVydGllcyB7XHJcbiAgICAgICAgIHJldHVybiBVdGlsaXR5LmRlZXBDb3B5KHtcclxuICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxyXG4gICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZ2V0U3RhdGUoKTogVHlwZXMuc3RhdGUge1xyXG4gICAgICAgICByZXR1cm4gVXRpbGl0eS5kZWVwQ29weSh7XHJcbiAgICAgICAgICAgIGpvaW50czogdGhpcy5qb2ludHMsXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmRpc2FibGVkXHJcbiAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBIYW5kbGVkIGluIHRoZSB0cmFja3NcclxuICAgICAgbWFrZUNvbm5lY3RvcnMoKSB7IH1cclxuXHJcbiAgICAgIGluc2VydEludG8oZWxlbWVudD86IFNWR0dyYXBoaWNzRWxlbWVudCkge1xyXG4gICAgICAgICBVdGlsaXR5Lkluc2VydC5maXJzdCh0aGlzLmdyb3VwLmVsZW1lbnQsIGVsZW1lbnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0cmFuc2ZlckZ1bmN0aW9uKCkgeyByZXR1cm4gW10gfTtcclxuXHJcbiAgICAgIGdldENvbm5lY3Rpb25zKCk6IENvbXBvbmVudC5UeXBlcy5jb25uZWN0b3JbXVtdW10ge1xyXG4gICAgICAgICByZXR1cm4gR2VuZXJpY3MuZ2V0Q29tcG9uZW50Q29ubmVjdGlvbnModGhpcywgbWFuaWZlc3QubGF5b3V0KTtcclxuICAgICAgfVxyXG4gICB9XHJcblxyXG4gICBleHBvcnQgY2xhc3MgU21hbGwgZXh0ZW5kcyBCYXNlIHtcclxuICAgICAgZHJhdygpIHtcclxuICAgICAgICAgdGhpcy50cmFja3MgPSBtYWtlVHJhY2tzKHRoaXMsIFwic21hbGxcIik7XHJcbiAgICAgICAgIC8vKFByZXBlbmQgc28gaGFuZGxlcyBhcHBlYXIgb24gdG9wKVxyXG4gICAgICAgICB0aGlzLmdyb3VwLnByZXBlbmQoZHJhd1NtYWxsKHRoaXMpLCB0aGlzLnRyYWNrcy5tYXAodCA9PiB0Lmdyb3VwKSk7XHJcbiAgICAgIH1cclxuICAgfVxyXG5cclxuICAgZXhwb3J0IGNsYXNzIExhcmdlIGV4dGVuZHMgQmFzZSB7XHJcbiAgICAgIGRyYXcoKSB7XHJcbiAgICAgICAgIHRoaXMudHJhY2tzID0gbWFrZVRyYWNrcyh0aGlzLCBcImxhcmdlXCIpO1xyXG4gICAgICAgICAvLyhQcmVwZW5kIHNvIGhhbmRsZXMgYXBwZWFyIG9uIHRvcClcclxuICAgICAgICAgdGhpcy5ncm91cC5wcmVwZW5kKGRyYXdMYXJnZSh0aGlzKSwgdGhpcy50cmFja3MubWFwKHQgPT4gdC5ncm91cCkpO1xyXG4gICAgICB9XHJcbiAgIH1cclxufVxyXG4iXX0=