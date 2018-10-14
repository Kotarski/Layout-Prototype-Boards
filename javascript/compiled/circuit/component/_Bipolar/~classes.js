"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Bipolar;
        (function (_Bipolar) {
            var Classes;
            (function (Classes) {
                class Base extends Component.Instance {
                    constructor(values) {
                        super(values);
                        $(this.group.element).addClass("component " + this.name);
                        this.joints = values.joints;
                        this.type = values.type;
                        this.currentGain = values.currentGain;
                    }
                    getProperties() {
                        return Utility.deepCopy({
                            name: this.name,
                            currentGain: this.currentGain,
                            type: this.type
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
                        this.group.prepend(_Bipolar.drawSchematic(this));
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, manifest.schematic);
                    }
                    makeConnectors() {
                        this.connectorSets = [[
                                Component.Generics.makeConnector(this, "emitter", "node", this.joints[_Bipolar.INDEXEMITTER], "e"),
                                Component.Generics.makeConnector(this, "collector", "node", this.joints[_Bipolar.INDEXCOLLECTOR], "c"),
                                Component.Generics.makeConnector(this, "base", "node", this.joints[_Bipolar.INDEXBASE], "b")
                            ]];
                    }
                }
                Classes.Schematic = Schematic;
                class Layout extends Base {
                    draw() {
                        this.group.prepend(_Bipolar.drawLayout(this));
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, manifest.layout);
                    }
                    makeConnectors() {
                        this.connectorSets = [[
                                Component.Generics.makeConnector(this, "emitter", "pin", this.joints[_Bipolar.INDEXEMITTER], "e"),
                                Component.Generics.makeConnector(this, "collector", "pin", this.joints[_Bipolar.INDEXCOLLECTOR], "c"),
                                Component.Generics.makeConnector(this, "base", "pin", this.joints[_Bipolar.INDEXBASE], "b")
                            ]];
                    }
                }
                Classes.Layout = Layout;
            })(Classes = _Bipolar.Classes || (_Bipolar.Classes = {}));
        })(_Bipolar = Component._Bipolar || (Component._Bipolar = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoifmNsYXNzZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50L19CaXBvbGFyL35jbGFzc2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE9BQU8sQ0FxRWhCO0FBckVELFdBQVUsT0FBTztJQUFDLElBQUEsU0FBUyxDQXFFMUI7SUFyRWlCLFdBQUEsU0FBUztRQUFDLElBQUEsUUFBUSxDQXFFbkM7UUFyRTJCLFdBQUEsUUFBUTtZQUFDLElBQUEsT0FBTyxDQXFFM0M7WUFyRW9DLFdBQUEsT0FBTztnQkFFekMsTUFBZSxJQUFLLFNBQVEsU0FBUyxDQUFDLFFBQVE7b0JBSTNDLFlBQVksTUFBb0I7d0JBQzdCLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDZCxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDekQsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO3dCQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7d0JBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztvQkFDekMsQ0FBQztvQkFFRCxhQUFhO3dCQUNWLE9BQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQzs0QkFDckIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJOzRCQUNmLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVzs0QkFDN0IsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO3lCQUNqQixDQUFDLENBQUM7b0JBQ04sQ0FBQztvQkFFRCxRQUFRO3dCQUNMLE9BQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQzs0QkFDckIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNOzRCQUNuQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7eUJBQ3pCLENBQUMsQ0FBQztvQkFDTixDQUFDO29CQUVELFVBQVUsQ0FBQyxPQUE0Qjt3QkFDcEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQ3BELENBQUM7b0JBRUQsZ0JBQWdCLEtBQUssT0FBTyxFQUFFLENBQUEsQ0FBQyxDQUFDO29CQUFBLENBQUM7aUJBQ25DO2dCQUVELE1BQWEsU0FBVSxTQUFRLElBQUk7b0JBQ2hDLElBQUk7d0JBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBQSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDM0MsQ0FBQztvQkFDRCxjQUFjO3dCQUNYLE9BQU8sVUFBQSxRQUFRLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDckUsQ0FBQztvQkFDRCxjQUFjO3dCQUNYLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQztnQ0FDbkIsVUFBQSxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBQSxZQUFZLENBQUMsRUFBRSxHQUFHLENBQUM7Z0NBQy9FLFVBQUEsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQUEsY0FBYyxDQUFDLEVBQUUsR0FBRyxDQUFDO2dDQUNuRixVQUFBLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFBLFNBQVMsQ0FBQyxFQUFFLEdBQUcsQ0FBQzs2QkFDM0UsQ0FBQyxDQUFDO29CQUNOLENBQUM7aUJBQ0g7Z0JBZlksaUJBQVMsWUFlckIsQ0FBQTtnQkFFRCxNQUFhLE1BQU8sU0FBUSxJQUFJO29CQUM3QixJQUFJO3dCQUVELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQUEsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3hDLENBQUM7b0JBQ0QsY0FBYzt3QkFDWCxPQUFPLFVBQUEsUUFBUSxDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2xFLENBQUM7b0JBQ0QsY0FBYzt3QkFDWCxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUM7Z0NBQ25CLFVBQUEsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQUEsWUFBWSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dDQUM5RSxVQUFBLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFBLGNBQWMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQ0FDbEYsVUFBQSxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBQSxTQUFTLENBQUMsRUFBRSxHQUFHLENBQUM7NkJBQzFFLENBQUMsQ0FBQztvQkFDTixDQUFDO2lCQUNIO2dCQWZZLGNBQU0sU0FlbEIsQ0FBQTtZQUNKLENBQUMsRUFyRW9DLE9BQU8sR0FBUCxnQkFBTyxLQUFQLGdCQUFPLFFBcUUzQztRQUFELENBQUMsRUFyRTJCLFFBQVEsR0FBUixrQkFBUSxLQUFSLGtCQUFRLFFBcUVuQztJQUFELENBQUMsRUFyRWlCLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBcUUxQjtBQUFELENBQUMsRUFyRVMsT0FBTyxLQUFQLE9BQU8sUUFxRWhCIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIENpcmN1aXQuQ29tcG9uZW50Ll9CaXBvbGFyLkNsYXNzZXMge1xyXG5cclxuICAgYWJzdHJhY3QgY2xhc3MgQmFzZSBleHRlbmRzIENvbXBvbmVudC5JbnN0YW5jZSBpbXBsZW1lbnRzIFR5cGVzLnZhbHVlcyB7XHJcbiAgICAgIGN1cnJlbnRHYWluOiBudW1iZXI7XHJcbiAgICAgIHR5cGU6IFwiTlBOXCIgfCBcIlBOUFwiXHJcbiAgICAgIGpvaW50czogW1ZlY3RvciwgVmVjdG9yLCBWZWN0b3JdO1xyXG4gICAgICBjb25zdHJ1Y3Rvcih2YWx1ZXM6IFR5cGVzLnZhbHVlcykge1xyXG4gICAgICAgICBzdXBlcih2YWx1ZXMpO1xyXG4gICAgICAgICAkKHRoaXMuZ3JvdXAuZWxlbWVudCkuYWRkQ2xhc3MoXCJjb21wb25lbnQgXCIgKyB0aGlzLm5hbWUpO1xyXG4gICAgICAgICB0aGlzLmpvaW50cyA9IHZhbHVlcy5qb2ludHM7XHJcbiAgICAgICAgIHRoaXMudHlwZSA9IHZhbHVlcy50eXBlO1xyXG4gICAgICAgICB0aGlzLmN1cnJlbnRHYWluID0gdmFsdWVzLmN1cnJlbnRHYWluO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBnZXRQcm9wZXJ0aWVzKCk6IFR5cGVzLnByb3BlcnRpZXMge1xyXG4gICAgICAgICByZXR1cm4gVXRpbGl0eS5kZWVwQ29weSh7XHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcclxuICAgICAgICAgICAgY3VycmVudEdhaW46IHRoaXMuY3VycmVudEdhaW4sXHJcbiAgICAgICAgICAgIHR5cGU6IHRoaXMudHlwZVxyXG4gICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZ2V0U3RhdGUoKTogVHlwZXMuc3RhdGUge1xyXG4gICAgICAgICByZXR1cm4gVXRpbGl0eS5kZWVwQ29weSh7XHJcbiAgICAgICAgICAgIGpvaW50czogdGhpcy5qb2ludHMsXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmRpc2FibGVkXHJcbiAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpbnNlcnRJbnRvKGVsZW1lbnQ/OiBTVkdHcmFwaGljc0VsZW1lbnQpIHtcclxuICAgICAgICAgVXRpbGl0eS5JbnNlcnQubGFzdCh0aGlzLmdyb3VwLmVsZW1lbnQsIGVsZW1lbnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0cmFuc2ZlckZ1bmN0aW9uKCkgeyByZXR1cm4gW10gfTtcclxuICAgfVxyXG5cclxuICAgZXhwb3J0IGNsYXNzIFNjaGVtYXRpYyBleHRlbmRzIEJhc2Uge1xyXG4gICAgICBkcmF3KCkge1xyXG4gICAgICAgICAvLyhQcmVwZW5kIHNvIGhhbmRsZXMgYXBwZWFyIG9uIHRvcClcclxuICAgICAgICAgdGhpcy5ncm91cC5wcmVwZW5kKGRyYXdTY2hlbWF0aWModGhpcykpO1xyXG4gICAgICB9XHJcbiAgICAgIGdldENvbm5lY3Rpb25zKCk6IENvbXBvbmVudC5UeXBlcy5jb25uZWN0b3JbXVtdW10ge1xyXG4gICAgICAgICByZXR1cm4gR2VuZXJpY3MuZ2V0Q29tcG9uZW50Q29ubmVjdGlvbnModGhpcywgbWFuaWZlc3Quc2NoZW1hdGljKTtcclxuICAgICAgfVxyXG4gICAgICBtYWtlQ29ubmVjdG9ycygpIHtcclxuICAgICAgICAgdGhpcy5jb25uZWN0b3JTZXRzID0gW1tcclxuICAgICAgICAgICAgR2VuZXJpY3MubWFrZUNvbm5lY3Rvcih0aGlzLCBcImVtaXR0ZXJcIiwgXCJub2RlXCIsIHRoaXMuam9pbnRzW0lOREVYRU1JVFRFUl0sIFwiZVwiKSxcclxuICAgICAgICAgICAgR2VuZXJpY3MubWFrZUNvbm5lY3Rvcih0aGlzLCBcImNvbGxlY3RvclwiLCBcIm5vZGVcIiwgdGhpcy5qb2ludHNbSU5ERVhDT0xMRUNUT1JdLCBcImNcIiksXHJcbiAgICAgICAgICAgIEdlbmVyaWNzLm1ha2VDb25uZWN0b3IodGhpcywgXCJiYXNlXCIsIFwibm9kZVwiLCB0aGlzLmpvaW50c1tJTkRFWEJBU0VdLCBcImJcIilcclxuICAgICAgICAgXV07XHJcbiAgICAgIH1cclxuICAgfVxyXG5cclxuICAgZXhwb3J0IGNsYXNzIExheW91dCBleHRlbmRzIEJhc2Uge1xyXG4gICAgICBkcmF3KCkge1xyXG4gICAgICAgICAvLyhQcmVwZW5kIHNvIGhhbmRsZXMgYXBwZWFyIG9uIHRvcClcclxuICAgICAgICAgdGhpcy5ncm91cC5wcmVwZW5kKGRyYXdMYXlvdXQodGhpcykpO1xyXG4gICAgICB9XHJcbiAgICAgIGdldENvbm5lY3Rpb25zKCk6IENvbXBvbmVudC5UeXBlcy5jb25uZWN0b3JbXVtdW10ge1xyXG4gICAgICAgICByZXR1cm4gR2VuZXJpY3MuZ2V0Q29tcG9uZW50Q29ubmVjdGlvbnModGhpcywgbWFuaWZlc3QubGF5b3V0KTtcclxuICAgICAgfVxyXG4gICAgICBtYWtlQ29ubmVjdG9ycygpIHtcclxuICAgICAgICAgdGhpcy5jb25uZWN0b3JTZXRzID0gW1tcclxuICAgICAgICAgICAgR2VuZXJpY3MubWFrZUNvbm5lY3Rvcih0aGlzLCBcImVtaXR0ZXJcIiwgXCJwaW5cIiwgdGhpcy5qb2ludHNbSU5ERVhFTUlUVEVSXSwgXCJlXCIpLFxyXG4gICAgICAgICAgICBHZW5lcmljcy5tYWtlQ29ubmVjdG9yKHRoaXMsIFwiY29sbGVjdG9yXCIsIFwicGluXCIsIHRoaXMuam9pbnRzW0lOREVYQ09MTEVDVE9SXSwgXCJjXCIpLFxyXG4gICAgICAgICAgICBHZW5lcmljcy5tYWtlQ29ubmVjdG9yKHRoaXMsIFwiYmFzZVwiLCBcInBpblwiLCB0aGlzLmpvaW50c1tJTkRFWEJBU0VdLCBcImJcIilcclxuICAgICAgICAgXV07XHJcbiAgICAgIH1cclxuICAgfVxyXG59XHJcbiJdfQ==