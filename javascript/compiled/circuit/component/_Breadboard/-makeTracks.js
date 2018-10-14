"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Breadboard;
        (function (_Breadboard) {
            function makeTracks(parent, size) {
                return (size === "small") ? makeTracksSmall(parent) : makeTracksLarge(parent);
            }
            _Breadboard.makeTracks = makeTracks;
            function makeTracksSmall(parent) {
                let tracks = [];
                let gS = Constants.gridSpacing;
                let rotation = vector(parent.joints[0]).getAngleTo(parent.joints[1]);
                let powerTrackYPositions = [-9.5, -8.5, 8.5, 9.5];
                for (let y of powerTrackYPositions) {
                    const start = vector({ x: gS * -14, y: y * gS })
                        .rotate(rotation)
                        .sumWith(parent.joints[0]);
                    const step = vector({ x: gS, y: 0 }).rotate(rotation);
                    let track = Component.track.make({
                        holeSpacings: [0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1],
                        joints: [start, step]
                    }, false);
                    tracks.push(track);
                }
                let mainGridTrackXPositions = [...Array(30).keys()];
                let mainGridTrackYPositions = [-5.5, +1.5];
                for (let x of mainGridTrackXPositions) {
                    for (let y of mainGridTrackYPositions) {
                        const start = vector({ x: (x - 14.5) * gS, y: y * gS })
                            .rotate(rotation)
                            .sumWith(parent.joints[0]);
                        const step = vector({ x: 0, y: gS }).rotate(rotation);
                        let track = Component.track.make({
                            holeSpacings: [0, 1, 1, 1, 1],
                            joints: [start, step]
                        }, false);
                        tracks.push(track);
                    }
                }
                return tracks;
            }
            function makeTracksLarge(parent) {
                let tracks = [];
                let gS = Constants.gridSpacing;
                let rotation = vector(parent.joints[0]).getAngleTo(parent.joints[1]);
                let powerTrackYPositions = [-9.5, -8.5, 8.5, 9.5];
                let powerTrackXPositions = [-29.5, 1.5];
                for (let x of powerTrackXPositions) {
                    for (let y of powerTrackYPositions) {
                        const start = vector({ x: x * gS, y: y * gS })
                            .rotate(rotation)
                            .sumWith(parent.joints[0]);
                        const step = vector({ x: gS, y: 0 }).rotate(rotation);
                        let track = Component.track.make({
                            holeSpacings: [0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1],
                            joints: [start, step]
                        }, false);
                        tracks.push(track);
                    }
                }
                let mainGridTrackXPositions = [...Array(64).keys()];
                let mainGridTrackYPositions = [-5.5, +1.5];
                for (let x of mainGridTrackXPositions) {
                    for (let y of mainGridTrackYPositions) {
                        const start = vector({ x: (x - 31.5) * gS, y: y * gS })
                            .rotate(rotation)
                            .sumWith(parent.joints[0]);
                        const step = vector({ x: 0, y: gS }).rotate(rotation);
                        let track = Component.track.make({
                            holeSpacings: [0, 1, 1, 1, 1],
                            joints: [start, step]
                        }, false);
                        tracks.push(track);
                    }
                }
                return tracks;
            }
        })(_Breadboard = Component._Breadboard || (Component._Breadboard = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLW1ha2VUcmFja3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50L19icmVhZGJvYXJkLy1tYWtlVHJhY2tzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE9BQU8sQ0F1R2hCO0FBdkdELFdBQVUsT0FBTztJQUFDLElBQUEsU0FBUyxDQXVHMUI7SUF2R2lCLFdBQUEsU0FBUztRQUFDLElBQUEsV0FBVyxDQXVHdEM7UUF2RzJCLFdBQUEsV0FBVztZQUlwQyxTQUFnQixVQUFVLENBQUMsTUFBcUMsRUFBRSxJQUF1QjtnQkFDdEYsT0FBTyxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDakYsQ0FBQztZQUZlLHNCQUFVLGFBRXpCLENBQUE7WUFFRCxTQUFTLGVBQWUsQ0FBQyxNQUFxQjtnQkFDM0MsSUFBSSxNQUFNLEdBQTRCLEVBQUUsQ0FBQztnQkFFekMsSUFBSSxFQUFFLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQztnQkFFL0IsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVyRSxJQUFJLG9CQUFvQixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCxLQUFLLElBQUksQ0FBQyxJQUFJLG9CQUFvQixFQUFFO29CQUVqQyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcs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QVAsT0FBTyxRQXVHaEIiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgQ2lyY3VpdC5Db21wb25lbnQuX0JyZWFkYm9hcmQge1xyXG5cclxuICAgZXhwb3J0IGZ1bmN0aW9uIG1ha2VUcmFja3MocGFyZW50OiBDbGFzc2VzLlNtYWxsLCBzaXplOiBcInNtYWxsXCIpOiBfVHJhY2suQ2xhc3Nlcy5MYXlvdXRbXTtcclxuICAgZXhwb3J0IGZ1bmN0aW9uIG1ha2VUcmFja3MocGFyZW50OiBDbGFzc2VzLkxhcmdlLCBzaXplOiBcImxhcmdlXCIpOiBfVHJhY2suQ2xhc3Nlcy5MYXlvdXRbXTtcclxuICAgZXhwb3J0IGZ1bmN0aW9uIG1ha2VUcmFja3MocGFyZW50OiBDbGFzc2VzLlNtYWxsIHwgQ2xhc3Nlcy5MYXJnZSwgc2l6ZTogXCJzbWFsbFwiIHwgXCJsYXJnZVwiKSB7XHJcbiAgICAgIHJldHVybiAoc2l6ZSA9PT0gXCJzbWFsbFwiKSA/IG1ha2VUcmFja3NTbWFsbChwYXJlbnQpIDogbWFrZVRyYWNrc0xhcmdlKHBhcmVudCk7XHJcbiAgIH1cclxuXHJcbiAgIGZ1bmN0aW9uIG1ha2VUcmFja3NTbWFsbChwYXJlbnQ6IENsYXNzZXMuU21hbGwpOiBfVHJhY2suQ2xhc3Nlcy5MYXlvdXRbXSB7XHJcbiAgICAgIGxldCB0cmFja3M6IF9UcmFjay5DbGFzc2VzLkxheW91dFtdID0gW107XHJcblxyXG4gICAgICBsZXQgZ1MgPSBDb25zdGFudHMuZ3JpZFNwYWNpbmc7XHJcblxyXG4gICAgICBsZXQgcm90YXRpb24gPSB2ZWN0b3IocGFyZW50LmpvaW50c1swXSkuZ2V0QW5nbGVUbyhwYXJlbnQuam9pbnRzWzFdKTtcclxuXHJcbiAgICAgIGxldCBwb3dlclRyYWNrWVBvc2l0aW9ucyA9IFstOS41LCAtOC41LCA4LjUsIDkuNV07XHJcbiAgICAgIGZvciAobGV0IHkgb2YgcG93ZXJUcmFja1lQb3NpdGlvbnMpIHtcclxuXHJcbiAgICAgICAgIGNvbnN0IHN0YXJ0ID0gdmVjdG9yKHsgeDogZ1MgKiAtMTQsIHk6IHkgKiBnUyB9KVxyXG4gICAgICAgICAgICAucm90YXRlKHJvdGF0aW9uKVxyXG4gICAgICAgICAgICAuc3VtV2l0aChwYXJlbnQuam9pbnRzWzBdKTtcclxuXHJcbiAgICAgICAgIGNvbnN0IHN0ZXAgPSB2ZWN0b3IoeyB4OiBnUywgeTogMCB9KS5yb3RhdGUocm90YXRpb24pO1xyXG5cclxuICAgICAgICAgbGV0IHRyYWNrID0gQ29tcG9uZW50LnRyYWNrLm1ha2Uoe1xyXG4gICAgICAgICAgICBob2xlU3BhY2luZ3M6IFswLCAxLCAxLCAxLCAxLCAyLCAxLCAxLCAxLCAxLCAyLCAxLCAxLCAxLCAxLCAyLCAxLCAxLCAxLCAxLCAyLCAxLCAxLCAxLCAxXSxcclxuICAgICAgICAgICAgam9pbnRzOiBbc3RhcnQsIHN0ZXBdXHJcbiAgICAgICAgIH0sIGZhbHNlKTtcclxuICAgICAgICAgdHJhY2tzLnB1c2godHJhY2spO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgbWFpbkdyaWRUcmFja1hQb3NpdGlvbnMgPSBbLi4uQXJyYXkoMzApLmtleXMoKV07XHJcbiAgICAgIGxldCBtYWluR3JpZFRyYWNrWVBvc2l0aW9ucyA9IFstNS41LCArMS41XTtcclxuXHJcbiAgICAgIGZvciAobGV0IHggb2YgbWFpbkdyaWRUcmFja1hQb3NpdGlvbnMpIHtcclxuICAgICAgICAgZm9yIChsZXQgeSBvZiBtYWluR3JpZFRyYWNrWVBvc2l0aW9ucykge1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSB2ZWN0b3IoeyB4OiAoeCAtIDE0LjUpICogZ1MsIHk6IHkgKiBnUyB9KVxyXG4gICAgICAgICAgICAgICAucm90YXRlKHJvdGF0aW9uKVxyXG4gICAgICAgICAgICAgICAuc3VtV2l0aChwYXJlbnQuam9pbnRzWzBdKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHN0ZXAgPSB2ZWN0b3IoeyB4OiAwLCB5OiBnUyB9KS5yb3RhdGUocm90YXRpb24pO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRyYWNrID0gQ29tcG9uZW50LnRyYWNrLm1ha2Uoe1xyXG4gICAgICAgICAgICAgICBob2xlU3BhY2luZ3M6IFswLCAxLCAxLCAxLCAxXSxcclxuICAgICAgICAgICAgICAgam9pbnRzOiBbc3RhcnQsIHN0ZXBdXHJcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcclxuICAgICAgICAgICAgdHJhY2tzLnB1c2godHJhY2spO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0cmFja3M7XHJcbiAgIH1cclxuXHJcbiAgIGZ1bmN0aW9uIG1ha2VUcmFja3NMYXJnZShwYXJlbnQ6IENsYXNzZXMuTGFyZ2UpOiBfVHJhY2suQ2xhc3Nlcy5MYXlvdXRbXSB7XHJcbiAgICAgIGxldCB0cmFja3M6IF9UcmFjay5DbGFzc2VzLkxheW91dFtdID0gW107XHJcblxyXG4gICAgICBsZXQgZ1MgPSBDb25zdGFudHMuZ3JpZFNwYWNpbmc7XHJcblxyXG4gICAgICBsZXQgcm90YXRpb24gPSB2ZWN0b3IocGFyZW50LmpvaW50c1swXSkuZ2V0QW5nbGVUbyhwYXJlbnQuam9pbnRzWzFdKTtcclxuXHJcblxyXG4gICAgICBsZXQgcG93ZXJUcmFja1lQb3NpdGlvbnMgPSBbLTkuNSwgLTguNSwgOC41LCA5LjVdO1xyXG4gICAgICBsZXQgcG93ZXJUcmFja1hQb3NpdGlvbnMgPSBbLTI5LjUsIDEuNV07XHJcbiAgICAgIGZvciAobGV0IHggb2YgcG93ZXJUcmFja1hQb3NpdGlvbnMpIHtcclxuICAgICAgICAgZm9yIChsZXQgeSBvZiBwb3dlclRyYWNrWVBvc2l0aW9ucykge1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSB2ZWN0b3IoeyB4OiB4ICogZ1MsIHk6IHkgKiBnUyB9KVxyXG4gICAgICAgICAgICAgICAucm90YXRlKHJvdGF0aW9uKVxyXG4gICAgICAgICAgICAgICAuc3VtV2l0aChwYXJlbnQuam9pbnRzWzBdKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHN0ZXAgPSB2ZWN0b3IoeyB4OiBnUywgeTogMCB9KS5yb3RhdGUocm90YXRpb24pO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRyYWNrID0gQ29tcG9uZW50LnRyYWNrLm1ha2Uoe1xyXG4gICAgICAgICAgICAgICBob2xlU3BhY2luZ3M6IFswLCAxLCAxLCAxLCAxLCAyLCAxLCAxLCAxLCAxLCAyLCAxLCAxLCAxLCAxLCAyLCAxLCAxLCAxLCAxLCAyLCAxLCAxLCAxLCAxXSxcclxuICAgICAgICAgICAgICAgam9pbnRzOiBbc3RhcnQsIHN0ZXBdXHJcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcclxuICAgICAgICAgICAgdHJhY2tzLnB1c2godHJhY2spO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCBtYWluR3JpZFRyYWNrWFBvc2l0aW9ucyA9IFsuLi5BcnJheSg2NCkua2V5cygpXTtcclxuICAgICAgbGV0IG1haW5HcmlkVHJhY2tZUG9zaXRpb25zID0gWy01LjUsICsxLjVdO1xyXG5cclxuICAgICAgZm9yIChsZXQgeCBvZiBtYWluR3JpZFRyYWNrWFBvc2l0aW9ucykge1xyXG4gICAgICAgICBmb3IgKGxldCB5IG9mIG1haW5HcmlkVHJhY2tZUG9zaXRpb25zKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IHZlY3Rvcih7IHg6ICh4IC0gMzEuNSkgKiBnUywgeTogeSAqIGdTIH0pXHJcbiAgICAgICAgICAgICAgIC5yb3RhdGUocm90YXRpb24pXHJcbiAgICAgICAgICAgICAgIC5zdW1XaXRoKHBhcmVudC5qb2ludHNbMF0pO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3RlcCA9IHZlY3Rvcih7IHg6IDAsIHk6IGdTIH0pLnJvdGF0ZShyb3RhdGlvbik7XHJcblxyXG4gICAgICAgICAgICBsZXQgdHJhY2sgPSBDb21wb25lbnQudHJhY2subWFrZSh7XHJcbiAgICAgICAgICAgICAgIGhvbGVTcGFjaW5nczogWzAsIDEsIDEsIDEsIDFdLFxyXG4gICAgICAgICAgICAgICBqb2ludHM6IFtzdGFydCwgc3RlcF1cclxuICAgICAgICAgICAgfSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB0cmFja3MucHVzaCh0cmFjayk7XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRyYWNrcztcclxuICAgfVxyXG59Il19