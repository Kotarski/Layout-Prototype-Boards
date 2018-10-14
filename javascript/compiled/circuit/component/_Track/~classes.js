"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Track;
        (function (_Track) {
            var Classes;
            (function (Classes) {
                class Layout extends Component.Instance {
                    constructor(values) {
                        super(values);
                        this.connectorSets = [];
                        this.name = values.name;
                        this.holeSpacings = values.holeSpacings;
                        this.style = values.style;
                        this.joints = values.joints;
                    }
                    getProperties() {
                        return Utility.deepCopy({
                            name: this.name,
                            holeSpacings: this.holeSpacings,
                            style: this.style
                        });
                    }
                    getState() {
                        return Utility.deepCopy({
                            joints: this.joints,
                            disabled: this.disabled
                        });
                    }
                    draw() {
                        this.group.prepend(_Track.drawLayout(this));
                    }
                    makeConnectors() {
                        const start = this.joints[0];
                        const step = this.joints[1];
                        this.connectorSets = [[]];
                        let accHs = 0;
                        this.holeSpacings.forEach((hS) => {
                            accHs += hS;
                            let holePos = vector(step)
                                .scaleWith(accHs)
                                .sumWith(start)
                                .vector;
                            this.connectorSets[0].push(Component.Generics.makeConnector(this, "", "hole", holePos));
                        });
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, manifest.layout);
                    }
                    insertInto(element) {
                        Utility.Insert.last(this.group.element, element);
                    }
                    transferFunction(from) {
                        let fromIdx = this.connectorSets[0].indexOf(from);
                        let connected = [];
                        for (let i = fromIdx + 1; i < this.connectorSets[0].length; i++) {
                            if (this.connectorSets[0][i].type === "brokenhole")
                                break;
                            connected.push(this.connectorSets[0][i]);
                        }
                        for (let i = fromIdx - 1; i >= 0; i--) {
                            if (this.connectorSets[0][i].type === "brokenhole")
                                break;
                            connected.push(this.connectorSets[0][i]);
                        }
                        return connected;
                    }
                }
                Classes.Layout = Layout;
            })(Classes = _Track.Classes || (_Track.Classes = {}));
        })(_Track = Component._Track || (Component._Track = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoifmNsYXNzZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50L19UcmFjay9+Y2xhc3Nlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxPQUFPLENBd0ZoQjtBQXhGRCxXQUFVLE9BQU87SUFBQyxJQUFBLFNBQVMsQ0F3RjFCO0lBeEZpQixXQUFBLFNBQVM7UUFBQyxJQUFBLE1BQU0sQ0F3RmpDO1FBeEYyQixXQUFBLE1BQU07WUFBQyxJQUFBLE9BQU8sQ0F3RnpDO1lBeEZrQyxXQUFBLE9BQU87Z0JBRXZDLE1BQWEsTUFBTyxTQUFRLFNBQVMsQ0FBQyxRQUFRO29CQU8zQyxZQUFZLE1BQXNDO3dCQUMvQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBTGpCLGtCQUFhLEdBQTZCLEVBQUUsQ0FBQzt3QkFNMUMsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO3dCQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUM7d0JBQ3hDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQzt3QkFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO29CQUMvQixDQUFDO29CQUVELGFBQWE7d0JBQ1YsT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDOzRCQUNyQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7NEJBQ2YsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZOzRCQUMvQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7eUJBQ25CLENBQUMsQ0FBQztvQkFDTixDQUFDO29CQUVELFFBQVE7d0JBQ0wsT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDOzRCQUNyQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07NEJBQ25CLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTt5QkFDekIs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QUFDLEVBeEZTLE9BQU8sS0FBUCxPQUFPLFFBd0ZoQiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBDaXJjdWl0LkNvbXBvbmVudC5fVHJhY2suQ2xhc3NlcyB7XHJcblxyXG4gICBleHBvcnQgY2xhc3MgTGF5b3V0IGV4dGVuZHMgQ29tcG9uZW50Lkluc3RhbmNlIGltcGxlbWVudHMgVHlwZXMucHJvcGVydGllcywgVHlwZXMuc3RhdGUge1xyXG4gICAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAgIGhvbGVTcGFjaW5nczogbnVtYmVyW107XHJcbiAgICAgIGNvbm5lY3RvclNldHM6IENvbXBvbmVudC5UeXBlcy5ob2xlW11bXSA9IFtdO1xyXG4gICAgICBzdHlsZTogXCJicmVhZGJvYXJkXCIgfCBcInN0cmlwYm9hcmRcIjtcclxuICAgICAgam9pbnRzOiBbVmVjdG9yLCBWZWN0b3JdO1xyXG5cclxuICAgICAgY29uc3RydWN0b3IodmFsdWVzOiBUeXBlcy5wcm9wZXJ0aWVzICYgVHlwZXMuc3RhdGUpIHtcclxuICAgICAgICAgc3VwZXIodmFsdWVzKTtcclxuICAgICAgICAgdGhpcy5uYW1lID0gdmFsdWVzLm5hbWU7XHJcbiAgICAgICAgIHRoaXMuaG9sZVNwYWNpbmdzID0gdmFsdWVzLmhvbGVTcGFjaW5ncztcclxuICAgICAgICAgdGhpcy5zdHlsZSA9IHZhbHVlcy5zdHlsZTtcclxuICAgICAgICAgdGhpcy5qb2ludHMgPSB2YWx1ZXMuam9pbnRzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBnZXRQcm9wZXJ0aWVzKCk6IFR5cGVzLnByb3BlcnRpZXMge1xyXG4gICAgICAgICByZXR1cm4gVXRpbGl0eS5kZWVwQ29weSh7XHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcclxuICAgICAgICAgICAgaG9sZVNwYWNpbmdzOiB0aGlzLmhvbGVTcGFjaW5ncyxcclxuICAgICAgICAgICAgc3R5bGU6IHRoaXMuc3R5bGVcclxuICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGdldFN0YXRlKCk6IFR5cGVzLnN0YXRlIHtcclxuICAgICAgICAgcmV0dXJuIFV0aWxpdHkuZGVlcENvcHkoe1xyXG4gICAgICAgICAgICBqb2ludHM6IHRoaXMuam9pbnRzLFxyXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5kaXNhYmxlZFxyXG4gICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIGRyYXcoKSB7XHJcbiAgICAgICAgIC8vKFByZXBlbmQgc28gaGFuZGxlcyBhcHBlYXIgb24gdG9wKVxyXG4gICAgICAgICB0aGlzLmdyb3VwLnByZXBlbmQoZHJhd0xheW91dCh0aGlzKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8qKiBCdWlsZHMgYW5kIGRyYXdzIHRoZSBjb21wb25lbnRzIGNvbm5lY3RvcnMgKi9cclxuICAgICAgbWFrZUNvbm5lY3RvcnMoKSB7XHJcblxyXG4gICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMuam9pbnRzWzBdO1xyXG4gICAgICAgICBjb25zdCBzdGVwID0gdGhpcy5qb2ludHNbMV07XHJcblxyXG5cclxuICAgICAgICAgdGhpcy5jb25uZWN0b3JTZXRzID0gW1tdXTtcclxuICAgICAgICAgLy8gQ3JlYXRlIHRoZSBob2xlc1xyXG4gICAgICAgICBsZXQgYWNjSHMgPSAwO1xyXG4gICAgICAgICB0aGlzLmhvbGVTcGFjaW5ncy5mb3JFYWNoKChoUykgPT4ge1xyXG4gICAgICAgICAgICBhY2NIcyArPSBoUztcclxuXHJcbiAgICAgICAgICAgIGxldCBob2xlUG9zID0gdmVjdG9yKHN0ZXApXHJcbiAgICAgICAgICAgICAgIC5zY2FsZVdpdGgoYWNjSHMpXHJcbiAgICAgICAgICAgICAgIC5zdW1XaXRoKHN0YXJ0KVxyXG4gICAgICAgICAgICAgICAudmVjdG9yO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0b3JTZXRzWzBdLnB1c2goXHJcbiAgICAgICAgICAgICAgIENvbXBvbmVudC5HZW5lcmljcy5tYWtlQ29ubmVjdG9yKHRoaXMsIFwiXCIsIFwiaG9sZVwiLCBob2xlUG9zKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICB9KVxyXG4gICAgICB9XHJcblxyXG4gICAgICBnZXRDb25uZWN0aW9ucygpOiBDb21wb25lbnQuVHlwZXMuY29ubmVjdG9yW11bXVtdIHtcclxuICAgICAgICAgcmV0dXJuIEdlbmVyaWNzLmdldENvbXBvbmVudENvbm5lY3Rpb25zKHRoaXMsIG1hbmlmZXN0LmxheW91dCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGluc2VydEludG8oZWxlbWVudD86IFNWR0dyYXBoaWNzRWxlbWVudCkge1xyXG4gICAgICAgICBVdGlsaXR5Lkluc2VydC5sYXN0KHRoaXMuZ3JvdXAuZWxlbWVudCwgZWxlbWVudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8qKiAuLi5cclxuICAgICAgKi9cclxuICAgICAgdHJhbnNmZXJGdW5jdGlvbihmcm9tOiBDb21wb25lbnQuVHlwZXMuaG9sZSk6IENvbXBvbmVudC5UeXBlcy5jb25uZWN0b3JbXSB7XHJcbiAgICAgICAgIGxldCBmcm9tSWR4ID0gdGhpcy5jb25uZWN0b3JTZXRzWzBdLmluZGV4T2YoZnJvbSk7XHJcbiAgICAgICAgIGxldCBjb25uZWN0ZWQ6IENvbXBvbmVudC5UeXBlcy5jb25uZWN0b3JbXSA9IFtdO1xyXG4gICAgICAgICBmb3IgKGxldCBpID0gZnJvbUlkeCArIDE7IGkgPCB0aGlzLmNvbm5lY3RvclNldHNbMF0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29ubmVjdG9yU2V0c1swXVtpXS50eXBlID09PSBcImJyb2tlbmhvbGVcIikgYnJlYWs7XHJcbiAgICAgICAgICAgIGNvbm5lY3RlZC5wdXNoKHRoaXMuY29ubmVjdG9yU2V0c1swXVtpXSk7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgZm9yIChsZXQgaSA9IGZyb21JZHggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb25uZWN0b3JTZXRzWzBdW2ldLnR5cGUgPT09IFwiYnJva2VuaG9sZVwiKSBicmVhaztcclxuICAgICAgICAgICAgY29ubmVjdGVkLnB1c2godGhpcy5jb25uZWN0b3JTZXRzWzBdW2ldKTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgcmV0dXJuIGNvbm5lY3RlZDtcclxuICAgICAgfVxyXG5cclxuICAgfVxyXG59XHJcbiJdfQ==