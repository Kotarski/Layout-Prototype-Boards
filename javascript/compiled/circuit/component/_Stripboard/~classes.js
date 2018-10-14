"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Stripboard;
        (function (_Stripboard) {
            var Classes;
            (function (Classes) {
                class Layout extends Component.Instance {
                    constructor(values) {
                        super(values);
                        this.tracks = [];
                        this.connectorSets = [];
                        this.rows = values.rows;
                        this.columns = values.columns;
                        this.trackBreaks = values.trackBreaks;
                        this.joints = values.joints;
                    }
                    getProperties() {
                        return Utility.deepCopy({
                            name: this.name,
                            rows: this.rows,
                            columns: this.columns
                        });
                    }
                    getState() {
                        return Utility.deepCopy({
                            joints: this.joints,
                            disabled: this.disabled,
                            trackBreaks: this.trackBreaks
                        });
                    }
                    makeConnectors() {
                        this.tracks.forEach(track => track.makeConnectors());
                        this.tracks.forEach((track, trackIdx) => {
                            let trackBreaks = this.trackBreaks.filter(trackBreak => trackBreak.track === trackIdx);
                            track.connectorSets[0].forEach((hole, holeIdx) => {
                                if (trackBreaks.some(trackBreak => trackBreak.hole === holeIdx)) {
                                    hole.type = "brokenhole";
                                }
                            });
                        });
                    }
                    draw() {
                        let rotation = vector(this.joints[0]).getAngleTo(this.joints[1]);
                        this.tracks = _Stripboard.makeTracks(this);
                        const gS = Constants.gridSpacing;
                        const size = { width: (this.columns + 0.5) * gS, height: (this.rows + 0.5) * gS };
                        const cornerRounding = { x: 3, y: 3 };
                        this.group.append(Svg.Element.Rect.make(vector(0), size, cornerRounding, "body highlight").translate(this.joints[0]).rotate(rotation), this.tracks.map(t => t.group));
                    }
                    getConnections() {
                        return Component.Generics.getComponentConnections(this, manifest.layout);
                    }
                    insertInto(element) {
                        Utility.Insert.first(this.group.element, element);
                    }
                    transferFunction() { return []; }
                    ;
                }
                Classes.Layout = Layout;
            })(Classes = _Stripboard.Classes || (_Stripboard.Classes = {}));
        })(_Stripboard = Component._Stripboard || (Component._Stripboard = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoifmNsYXNzZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50L19TdHJpcGJvYXJkL35jbGFzc2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE9BQU8sQ0EyRWhCO0FBM0VELFdBQVUsT0FBTztJQUFDLElBQUEsU0FBUyxDQTJFMUI7SUEzRWlCLFdBQUEsU0FBUztRQUFDLElBQUEsV0FBVyxDQTJFdEM7UUEzRTJCLFdBQUEsV0FBVztZQUFDLElBQUEsT0FBTyxDQTJFOUM7WUEzRXVDLFdBQUEsT0FBTztnQkFHNUMsTUFBYSxNQUFPLFNBQVEsU0FBUyxDQUFDLFFBQVE7b0JBUTNDLFlBQVksTUFBc0M7d0JBQy9DLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFSakIsV0FBTSxHQUE0QixFQUFFLENBQUM7d0JBQ3JDLGtCQUFhLEdBQTZCLEVBQUUsQ0FBQzt3QkFRMUMsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO3dCQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7d0JBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQzt3QkFDdEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO29CQUMvQixDQUFDO29CQUVELGFBQWE7d0JBQ1YsT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDOzRCQUNyQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7NEJBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJOzRCQUNmLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTzt5QkFDdkIsQ0FBQyxDQUFDO29CQUNOLENBQUM7b0JBRUQsUUFBUTt3QkFDTCxPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUM7NEJBQ3JCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTs0QkFDbkIs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U0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUEyRTFCO0FBQUQsQ0FBQyxFQTNFUyxPQUFPLEtBQVAsT0FBTyxRQTJFaEIiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgQ2lyY3VpdC5Db21wb25lbnQuX1N0cmlwYm9hcmQuQ2xhc3NlcyB7XHJcblxyXG5cclxuICAgZXhwb3J0IGNsYXNzIExheW91dCBleHRlbmRzIENvbXBvbmVudC5JbnN0YW5jZSBpbXBsZW1lbnRzIFR5cGVzLnZhbHVlcyB7XHJcbiAgICAgIHRyYWNrczogX1RyYWNrLkNsYXNzZXMuTGF5b3V0W10gPSBbXTtcclxuICAgICAgY29ubmVjdG9yU2V0czogQ29tcG9uZW50LlR5cGVzLmhvbGVbXVtdID0gW107XHJcbiAgICAgIHRyYWNrQnJlYWtzOiBUeXBlcy50cmFja0JyZWFrW107XHJcbiAgICAgIHJvd3M6IG51bWJlcjtcclxuICAgICAgY29sdW1uczogbnVtYmVyO1xyXG4gICAgICBqb2ludHM6IFtWZWN0b3IsIFZlY3Rvcl07XHJcblxyXG4gICAgICBjb25zdHJ1Y3Rvcih2YWx1ZXM6IFR5cGVzLnByb3BlcnRpZXMgJiBUeXBlcy5zdGF0ZSkge1xyXG4gICAgICAgICBzdXBlcih2YWx1ZXMpO1xyXG4gICAgICAgICB0aGlzLnJvd3MgPSB2YWx1ZXMucm93cztcclxuICAgICAgICAgdGhpcy5jb2x1bW5zID0gdmFsdWVzLmNvbHVtbnM7XHJcbiAgICAgICAgIHRoaXMudHJhY2tCcmVha3MgPSB2YWx1ZXMudHJhY2tCcmVha3M7XHJcbiAgICAgICAgIHRoaXMuam9pbnRzID0gdmFsdWVzLmpvaW50cztcclxuICAgICAgfVxyXG5cclxuICAgICAgZ2V0UHJvcGVydGllcygpOiBUeXBlcy5wcm9wZXJ0aWVzIHtcclxuICAgICAgICAgcmV0dXJuIFV0aWxpdHkuZGVlcENvcHkoe1xyXG4gICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXHJcbiAgICAgICAgICAgIHJvd3M6IHRoaXMucm93cyxcclxuICAgICAgICAgICAgY29sdW1uczogdGhpcy5jb2x1bW5zXHJcbiAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBnZXRTdGF0ZSgpOiBUeXBlcy5zdGF0ZSB7XHJcbiAgICAgICAgIHJldHVybiBVdGlsaXR5LmRlZXBDb3B5KHtcclxuICAgICAgICAgICAgam9pbnRzOiB0aGlzLmpvaW50cyxcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZGlzYWJsZWQsXHJcbiAgICAgICAgICAgIHRyYWNrQnJlYWtzOiB0aGlzLnRyYWNrQnJlYWtzXHJcbiAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBtYWtlQ29ubmVjdG9ycygpIHtcclxuICAgICAgICAgdGhpcy50cmFja3MuZm9yRWFjaCh0cmFjayA9PiB0cmFjay5tYWtlQ29ubmVjdG9ycygpKTtcclxuICAgICAgICAgdGhpcy50cmFja3MuZm9yRWFjaCgodHJhY2ssIHRyYWNrSWR4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB0cmFja0JyZWFrcyA9IHRoaXMudHJhY2tCcmVha3MuZmlsdGVyKHRyYWNrQnJlYWsgPT4gdHJhY2tCcmVhay50cmFjayA9PT0gdHJhY2tJZHgpO1xyXG4gICAgICAgICAgICB0cmFjay5jb25uZWN0b3JTZXRzWzBdLmZvckVhY2goKGhvbGUsIGhvbGVJZHgpID0+IHtcclxuICAgICAgICAgICAgICAgaWYgKHRyYWNrQnJlYWtzLnNvbWUodHJhY2tCcmVhayA9PiB0cmFja0JyZWFrLmhvbGUgPT09IGhvbGVJZHgpKSB7XHJcbiAgICAgICAgICAgICAgICAgIGhvbGUudHlwZSA9IFwiYnJva2VuaG9sZVwiO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICB9KVxyXG4gICAgICB9XHJcblxyXG4gICAgICBkcmF3KCkge1xyXG5cclxuICAgICAgICAgbGV0IHJvdGF0aW9uID0gdmVjdG9yKHRoaXMuam9pbnRzWzBdKS5nZXRBbmdsZVRvKHRoaXMuam9pbnRzWzFdKTtcclxuICAgICAgICAgdGhpcy50cmFja3MgPSBtYWtlVHJhY2tzKHRoaXMpXHJcblxyXG5cclxuICAgICAgICAgY29uc3QgZ1MgPSBDb25zdGFudHMuZ3JpZFNwYWNpbmc7XHJcbiAgICAgICAgIC8vY29uc3QgY2VudHJlID0geyB4OiAodGhpcy5jb2x1bW5zIC0gMSkgKiBnUyAvIDIsIHk6ICh0aGlzLnJvd3MgLSAxKSAqIGdTIC8gMiB9O1xyXG4gICAgICAgICBjb25zdCBzaXplID0geyB3aWR0aDogKHRoaXMuY29sdW1ucyArIDAuNSkgKiBnUywgaGVpZ2h0OiAodGhpcy5yb3dzICsgMC41KSAqIGdTIH07XHJcbiAgICAgICAgIGNvbnN0IGNvcm5lclJvdW5kaW5nID0geyB4OiAzLCB5OiAzIH07XHJcblxyXG4gICAgICAgICB0aGlzLmdyb3VwLmFwcGVuZChcclxuICAgICAgICAgICAgU3ZnLkVsZW1lbnQuUmVjdC5tYWtlKHZlY3RvcigwKSwgc2l6ZSwgY29ybmVyUm91bmRpbmcsIFwiYm9keSBoaWdobGlnaHRcIikudHJhbnNsYXRlKHRoaXMuam9pbnRzWzBdKS5yb3RhdGUocm90YXRpb24pLFxyXG4gICAgICAgICAgICB0aGlzLnRyYWNrcy5tYXAodCA9PiB0Lmdyb3VwKVxyXG4gICAgICAgICApO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgZ2V0Q29ubmVjdGlvbnMoKTogQ29tcG9uZW50LlR5cGVzLmNvbm5lY3RvcltdW11bXSB7XHJcbiAgICAgICAgIHJldHVybiBHZW5lcmljcy5nZXRDb21wb25lbnRDb25uZWN0aW9ucyh0aGlzLCBtYW5pZmVzdC5sYXlvdXQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpbnNlcnRJbnRvKGVsZW1lbnQ/OiBTVkdHcmFwaGljc0VsZW1lbnQpIHtcclxuICAgICAgICAgVXRpbGl0eS5JbnNlcnQuZmlyc3QodGhpcy5ncm91cC5lbGVtZW50LCBlbGVtZW50KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdHJhbnNmZXJGdW5jdGlvbigpIHsgcmV0dXJuIFtdIH07XHJcbiAgIH1cclxufVxyXG4iXX0=