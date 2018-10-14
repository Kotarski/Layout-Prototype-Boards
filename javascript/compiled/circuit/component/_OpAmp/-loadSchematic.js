"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _OpAmp;
        (function (_OpAmp) {
            _OpAmp.loadSchematic = (raw) => {
                const name = (raw.name);
                const offsetVoltage = (raw.offsetVoltage);
                const orientations = ["LR", "RL"];
                const orientation = ValueCheck.validate(orientations, "LR")(raw.orientation);
                const inputsAtTop = ["inverting", "non-inverting"];
                const inputAtTop = ValueCheck.validate(inputsAtTop, "non-inverting")(raw.whichInputAtTop);
                const where = ValueCheck.where({ x: 0, y: 0 })(raw.where);
                const joints = (raw.joints || deriveJoints(orientation, inputAtTop, where));
                const opAmp = _OpAmp.makeSchematic({ name, offsetVoltage, joints });
                const isNumber = ValueCheck.test("number");
                const [minOutput, maxOutput] = [raw.minOutput, raw.maxOutput];
                if (isNumber(minOutput) && isNumber(maxOutput)) {
                    const topPower = Component.power.schematic.make({
                        voltage: maxOutput,
                        joints: vector([{ x: 0, y: -20 }]).sumWith(where).vectors
                    });
                    const bottomPower = Component.power.schematic.make({
                        voltage: minOutput,
                        joints: vector([{ x: 0, y: 20 }]).sumWith(where).vectors
                    });
                    return [topPower, bottomPower, opAmp];
                }
                else {
                    return opAmp;
                }
            };
            const deriveJoints = (orientation, inputAtTop, where) => {
                const [inHigh, inLow] = orientation === "LR"
                    ? [{ x: -30, y: -10 }, { x: -30, y: +10 }]
                    : [{ x: +30, y: -10 }, { x: +30, y: +10 }];
                const [inInverting, inNonInverting] = inputAtTop === "inverting"
                    ? [inHigh, inLow] : [inLow, inHigh];
                const [out] = orientation === "LR"
                    ? [{ x: +40, y: 0 }]
                    : [{ x: -40, y: 0 }];
                const [powPositive, powNegative] = inputAtTop === "inverting"
                    ? [{ x: 0, y: -20 }, { x: 0, y: +20 }]
                    : [{ x: 0, y: +20 }, { x: 0, y: -20 }];
                return vector([inInverting, inNonInverting, out, powPositive, powNegative]).sumWith(where).vectors;
            };
        })(_OpAmp = Component._OpAmp || (Component._OpAmp = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLWxvYWRTY2hlbWF0aWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50L19PcEFtcC8tbG9hZFNjaGVtYXRpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxPQUFPLENBd0RoQjtBQXhERCxXQUFVLE9BQU87SUFBQyxJQUFBLFNBQVMsQ0F3RDFCO0lBeERpQixXQUFBLFNBQVM7UUFBQyxJQUFBLE1BQU0sQ0F3RGpDO1FBeEQyQixXQUFBLE1BQU07WUFHbEIsb0JBQWEsR0FBMEMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtnQkFDOUUsTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hCLE1BQU0sYUFBYSxHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUcxQyxNQUFNLFlBQVksR0FBaUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ2hELE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDN0UsTUFBTSxXQUFXLEdBQW1DLENBQUMsV0FBVyxFQUFFLGVBQWUsQ0FBQyxDQUFBO2dCQUNsRixNQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxlQUFlLENBQUMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQzFGLE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDMUQsTUFBTSxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLFlBQVksQ0FBQyxXQUFXLEVBQUUs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LEVBQUUsRUFBRSxDQUFDO29CQUN0QyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBRTFDLE9BQU8sTUFBTSxDQUFDLENBQUMsV0FBVyxFQUFFLGNBQWMsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUN0RyxDQUFDLENBQUE7UUFDSixDQUFDLEVBeEQyQixNQUFNLEdBQU4sZ0JBQU0sS0FBTixnQkFBTSxRQXdEakM7SUFBRCxDQUFDLEVBeERpQixTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQXdEMUI7QUFBRCxDQUFDLEVBeERTLE9BQU8sS0FBUCxPQUFPLFFBd0RoQiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBDaXJjdWl0LkNvbXBvbmVudC5fT3BBbXAge1xyXG5cclxuICAgdHlwZSBSZXR1cm5zID0gQ2xhc3Nlcy5TY2hlbWF0aWMgfCBbQ29tcG9uZW50Lkluc3RhbmNlLCBDb21wb25lbnQuSW5zdGFuY2UsIENsYXNzZXMuU2NoZW1hdGljXVxyXG4gICBleHBvcnQgY29uc3QgbG9hZFNjaGVtYXRpYzogQ29tcG9uZW50LlR5cGVzLmxvYWRGdW5jdGlvbjxSZXR1cm5zPiA9IChyYXc6IGFueSkgPT4ge1xyXG4gICAgICBjb25zdCBuYW1lID0gKHJhdy5uYW1lKTtcclxuICAgICAgY29uc3Qgb2Zmc2V0Vm9sdGFnZSA9IChyYXcub2Zmc2V0Vm9sdGFnZSk7XHJcblxyXG4gICAgICAvL0pvaW50cyBCbG9ja1xyXG4gICAgICBjb25zdCBvcmllbnRhdGlvbnM6IFtcIkxSXCIsIFwiUkxcIl0gPSBbXCJMUlwiLCBcIlJMXCJdO1xyXG4gICAgICBjb25zdCBvcmllbnRhdGlvbiA9IFZhbHVlQ2hlY2sudmFsaWRhdGUob3JpZW50YXRpb25zLCBcIkxSXCIpKHJhdy5vcmllbnRhdGlvbik7XHJcbiAgICAgIGNvbnN0IGlucHV0c0F0VG9wOiBbXCJpbnZlcnRpbmdcIiwgXCJub24taW52ZXJ0aW5nXCJdID0gW1wiaW52ZXJ0aW5nXCIsIFwibm9uLWludmVydGluZ1wiXVxyXG4gICAgICBjb25zdCBpbnB1dEF0VG9wID0gVmFsdWVDaGVjay52YWxpZGF0ZShpbnB1dHNBdFRvcCwgXCJub24taW52ZXJ0aW5nXCIpKHJhdy53aGljaElucHV0QXRUb3ApO1xyXG4gICAgICBjb25zdCB3aGVyZSA9IFZhbHVlQ2hlY2sud2hlcmUoeyB4OiAwLCB5OiAwIH0pKHJhdy53aGVyZSk7XHJcbiAgICAgIGNvbnN0IGpvaW50cyA9IChyYXcuam9pbnRzIHx8IGRlcml2ZUpvaW50cyhvcmllbnRhdGlvbiwgaW5wdXRBdFRvcCwgd2hlcmUpKTtcclxuXHJcbiAgICAgIGNvbnN0IG9wQW1wID0gbWFrZVNjaGVtYXRpYyh7IG5hbWUsIG9mZnNldFZvbHRhZ2UsIGpvaW50cyB9KTtcclxuXHJcbiAgICAgIC8vIEFsc28gbWFrZSB0aGUgcG93ZXIgY29ubmVjdGlvbnNcclxuICAgICAgY29uc3QgaXNOdW1iZXIgPSBWYWx1ZUNoZWNrLnRlc3QoXCJudW1iZXJcIik7XHJcbiAgICAgIGNvbnN0IFttaW5PdXRwdXQsIG1heE91dHB1dF0gPSBbcmF3Lm1pbk91dHB1dCwgcmF3Lm1heE91dHB1dF07XHJcbiAgICAgIGlmIChpc051bWJlcihtaW5PdXRwdXQpICYmIGlzTnVtYmVyKG1heE91dHB1dCkpIHtcclxuXHJcbiAgICAgICAgIGNvbnN0IHRvcFBvd2VyID0gcG93ZXIuc2NoZW1hdGljLm1ha2Uoe1xyXG4gICAgICAgICAgICB2b2x0YWdlOiBtYXhPdXRwdXQsXHJcbiAgICAgICAgICAgIGpvaW50czogdmVjdG9yKFt7IHg6IDAsIHk6IC0yMCB9XSkuc3VtV2l0aCh3aGVyZSkudmVjdG9yc1xyXG4gICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgIGNvbnN0IGJvdHRvbVBvd2VyID0gcG93ZXIuc2NoZW1hdGljLm1ha2Uoe1xyXG4gICAgICAgICAgICB2b2x0YWdlOiBtaW5PdXRwdXQsXHJcbiAgICAgICAgICAgIGpvaW50czogdmVjdG9yKFt7IHg6IDAsIHk6IDIwIH1dKS5zdW1XaXRoKHdoZXJlKS52ZWN0b3JzXHJcbiAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgcmV0dXJuIFt0b3BQb3dlciwgYm90dG9tUG93ZXIsIG9wQW1wXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgcmV0dXJuIG9wQW1wO1xyXG4gICAgICB9XHJcbiAgIH1cclxuXHJcbiAgIGNvbnN0IGRlcml2ZUpvaW50cyA9IChvcmllbnRhdGlvbjogXCJMUlwiIHwgXCJSTFwiLCBpbnB1dEF0VG9wOiBcImludmVydGluZ1wiIHwgXCJub24taW52ZXJ0aW5nXCIsIHdoZXJlOiBWZWN0b3IpID0+IHtcclxuICAgICAgY29uc3QgW2luSGlnaCwgaW5Mb3ddID0gb3JpZW50YXRpb24gPT09IFwiTFJcIlxyXG4gICAgICAgICA/IFt7IHg6IC0zMCwgeTogLTEwIH0sIHsgeDogLTMwLCB5OiArMTAgfV1cclxuICAgICAgICAgOiBbeyB4OiArMzAsIHk6IC0xMCB9LCB7IHg6ICszMCwgeTogKzEwIH1dO1xyXG5cclxuICAgICAgY29uc3QgW2luSW52ZXJ0aW5nLCBpbk5vbkludmVydGluZ10gPSBpbnB1dEF0VG9wID09PSBcImludmVydGluZ1wiXHJcbiAgICAgICAgID8gW2luSGlnaCwgaW5Mb3ddIDogW2luTG93LCBpbkhpZ2hdXHJcblxyXG4gICAgICBjb25zdCBbb3V0XSA9IG9yaWVudGF0aW9uID09PSBcIkxSXCJcclxuICAgICAgICAgPyBbeyB4OiArNDAsIHk6IDAgfV1cclxuICAgICAgICAgOiBbeyB4OiAtNDAsIHk6IDAgfV07XHJcblxyXG4gICAgICBjb25zdCBbcG93UG9zaXRpdmUsIHBvd05lZ2F0aXZlXSA9IGlucHV0QXRUb3AgPT09IFwiaW52ZXJ0aW5nXCJcclxuICAgICAgICAgPyBbeyB4OiAwLCB5OiAtMjAgfSwgeyB4OiAwLCB5OiArMjAgfV1cclxuICAgICAgICAgOiBbeyB4OiAwLCB5OiArMjAgfSwgeyB4OiAwLCB5OiAtMjAgfV07XHJcblxyXG4gICAgICByZXR1cm4gdmVjdG9yKFtpbkludmVydGluZywgaW5Ob25JbnZlcnRpbmcsIG91dCwgcG93UG9zaXRpdmUsIHBvd05lZ2F0aXZlXSkuc3VtV2l0aCh3aGVyZSkudmVjdG9ycztcclxuICAgfVxyXG59Il19