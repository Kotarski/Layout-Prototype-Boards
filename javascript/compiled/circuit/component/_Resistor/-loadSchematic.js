"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Resistor;
        (function (_Resistor) {
            _Resistor.loadSchematic = (raw) => {
                const name = (raw.name);
                const resistance = (raw.resistance || raw.value);
                const orientations = ["LR", "RL", "UD", "DU"];
                const orientation = ValueCheck.validate(orientations, "LR")(raw.orientation);
                const where = ValueCheck.where({ x: 0, y: 0 })(raw.where);
                const joints = (raw.joints || deriveJoints(orientation, where));
                return _Resistor.makeSchematic({ name, resistance, joints, });
            };
            const deriveJoints = (orientation, where) => {
                const baseJoints = ({
                    LR: [{ x: -30, y: 0 }, { x: 30, y: 0 }],
                    UD: [{ x: 0, y: -30 }, { x: 0, y: 30 }],
                    RL: [{ x: 30, y: 0 }, { x: -30, y: 0 }],
                    DU: [{ x: 0, y: 30 }, { x: 0, y: -30 }]
                })[orientation];
                return vector(baseJoints).sumWith(where).vectors;
            };
        })(_Resistor = Component._Resistor || (Component._Resistor = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLWxvYWRTY2hlbWF0aWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50L19SZXNpc3Rvci8tbG9hZFNjaGVtYXRpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxPQUFPLENBc0JoQjtBQXRCRCxXQUFVLE9BQU87SUFBQyxJQUFBLFNBQVMsQ0FzQjFCO0lBdEJpQixXQUFBLFNBQVM7UUFBQyxJQUFBLFNBQVMsQ0FzQnBDO1FBdEIyQixXQUFBLFNBQVM7WUFDckIsdUJBQWEsR0FBb0QsQ0FBQyxHQUFRLEVBQUUsRUFBRTtnQkFDeEYsTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hCLE1BQU0sVUFBVSxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRWpELE1BQU0sWUFBWSxHQUE2QixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN4RSxNQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzdFLE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDMUQsTUFBTSxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLFlBQVksQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFFaEUsT0FBTyxVQUFBLGFBQWEsQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUN2RCxDQUFDLENBQUE7WUFFRCxNQUFNLFlBQVksR0FBRyxDQUFDLFdBQXNDLEVBQUUsS0FBYSxFQUFFLEVBQUU7Z0JBQzVFLE1BQU0sVUFBVSxHQUFHLENBQUM7b0JBQ2pCLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO29CQUN2QyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztvQkFDdkMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0JBQ3ZDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2lCQUN6QyxDQUFDLENBQUMsV0FBVyxDQUFxQixDQUFDO2dCQUNwQyxPQUFPLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ3BELENBQUMsQ0FBQTtRQUNKLENBQUMsRUF0QjJCLFNBQVMsR0FBVCxtQkFBUyxLQUFULG1CQUFTLFFBc0JwQztJQUFELENBQUMsRUF0QmlCLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBc0IxQjtBQUFELENBQUMsRUF0QlMsT0FBTyxLQUFQLE9BQU8sUUFzQmhCIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIENpcmN1aXQuQ29tcG9uZW50Ll9SZXNpc3RvciB7XHJcbiAgIGV4cG9ydCBjb25zdCBsb2FkU2NoZW1hdGljOiBDb21wb25lbnQuVHlwZXMubG9hZEZ1bmN0aW9uPENsYXNzZXMuU2NoZW1hdGljPiA9IChyYXc6IGFueSkgPT4ge1xyXG4gICAgICBjb25zdCBuYW1lID0gKHJhdy5uYW1lKTtcclxuICAgICAgY29uc3QgcmVzaXN0YW5jZSA9IChyYXcucmVzaXN0YW5jZSB8fCByYXcudmFsdWUpO1xyXG4gICAgICAvL0pvaW50cyBCbG9ja1xyXG4gICAgICBjb25zdCBvcmllbnRhdGlvbnM6IFtcIkxSXCIsIFwiUkxcIiwgXCJVRFwiLCBcIkRVXCJdID0gW1wiTFJcIiwgXCJSTFwiLCBcIlVEXCIsIFwiRFVcIl07XHJcbiAgICAgIGNvbnN0IG9yaWVudGF0aW9uID0gVmFsdWVDaGVjay52YWxpZGF0ZShvcmllbnRhdGlvbnMsIFwiTFJcIikocmF3Lm9yaWVudGF0aW9uKTtcclxuICAgICAgY29uc3Qgd2hlcmUgPSBWYWx1ZUNoZWNrLndoZXJlKHsgeDogMCwgeTogMCB9KShyYXcud2hlcmUpO1xyXG4gICAgICBjb25zdCBqb2ludHMgPSAocmF3LmpvaW50cyB8fCBkZXJpdmVKb2ludHMob3JpZW50YXRpb24sIHdoZXJlKSk7XHJcblxyXG4gICAgICByZXR1cm4gbWFrZVNjaGVtYXRpYyh7IG5hbWUsIHJlc2lzdGFuY2UsIGpvaW50cywgfSk7XHJcbiAgIH1cclxuXHJcbiAgIGNvbnN0IGRlcml2ZUpvaW50cyA9IChvcmllbnRhdGlvbjogXCJMUlwiIHwgXCJSTFwiIHwgXCJVRFwiIHwgXCJEVVwiLCB3aGVyZTogVmVjdG9yKSA9PiB7XHJcbiAgICAgIGNvbnN0IGJhc2VKb2ludHMgPSAoe1xyXG4gICAgICAgICBMUjogW3sgeDogLTMwLCB5OiAwIH0sIHsgeDogMzAsIHk6IDAgfV0sXHJcbiAgICAgICAgIFVEOiBbeyB4OiAwLCB5OiAtMzAgfSwgeyB4OiAwLCB5OiAzMCB9XSxcclxuICAgICAgICAgUkw6IFt7IHg6IDMwLCB5OiAwIH0sIHsgeDogLTMwLCB5OiAwIH1dLFxyXG4gICAgICAgICBEVTogW3sgeDogMCwgeTogMzAgfSwgeyB4OiAwLCB5OiAtMzAgfV1cclxuICAgICAgfSlbb3JpZW50YXRpb25dIGFzIFtWZWN0b3IsIFZlY3Rvcl07XHJcbiAgICAgIHJldHVybiB2ZWN0b3IoYmFzZUpvaW50cykuc3VtV2l0aCh3aGVyZSkudmVjdG9ycztcclxuICAgfVxyXG59Il19