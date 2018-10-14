"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _OpAmp;
        (function (_OpAmp) {
            function drawSchematic(instance) {
                const bodyGroup = Svg.Element.Group.make("body");
                const inPEnd = instance.joints[_OpAmp.INDEXINPOS];
                const inNEnd = instance.joints[_OpAmp.INDEXINNEG];
                const outEnd = instance.joints[_OpAmp.INDEXOUT];
                const pow1End = instance.joints[_OpAmp.INDEXPOW1];
                const pow2End = instance.joints[_OpAmp.INDEXPOW2];
                const bodyJoints = [{ x: -25, y: -25 }, { x: 25, y: 0 }, { x: -25, y: 25 }, { x: -25, y: -25 }];
                bodyGroup.append(Svg.Element.Path.make(bodyJoints, "highlight highlightwithfill extrathick"), Svg.Element.Path.make(bodyJoints, "body white"), Svg.Element.Line.make({ x: -22, y: -10 }, { x: -14, y: -10 }, "line thin"), Svg.Element.Line.make({ x: -18, y: -6 }, { x: -18, y: -14 }, "line thin"), Svg.Element.Line.make({ x: -22, y: +10 }, { x: -14, y: +10 }, "line thin"));
                let centre = vector(pow1End, pow2End).centre().vector;
                let angleCentreBase = vector(centre).getAngleTo(outEnd);
                let angleInPInN = vector(pow1End).getAngleTo(pow2End);
                let rotation = angleInPInN - 90;
                let scale = (((angleInPInN - angleCentreBase + 360) % 360) > 180)
                    ? { x: -1 }
                    : { x: 1 };
                let [inPStart, inNStart, outStart, powPStart, powNStart] = vector({ x: -25, y: -10 }, { x: -25, y: 10 }, { x: 25, y: 0 }, { x: 0, y: -13 }, { x: 0, y: 13 }).scaleWith(scale).rotate(rotation).sumWith(centre).vectors;
                let joints = [
                    [inPStart, inPEnd],
                    [inNStart, inNEnd],
                    [outStart, outEnd],
                    [powPStart, pow1End],
                    [powNStart, pow2End],
                ];
                return [
                    bodyGroup.translate(centre).rotate(rotation).scale(scale, false),
                    Svg.Element.Path.make(joints, "line thin"),
                ];
            }
            _OpAmp.drawSchematic = drawSchematic;
        })(_OpAmp = Component._OpAmp || (Component._OpAmp = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLWRyYXdTY2hlbWF0aWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50L19vcEFtcC8tZHJhd1NjaGVtYXRpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxPQUFPLENBc0VoQjtBQXRFRCxXQUFVLE9BQU87SUFBQyxJQUFBLFNBQVMsQ0FzRTFCO0lBdEVpQixXQUFBLFNBQVM7UUFBQyxJQUFBLE1BQU0sQ0FzRWpDO1FBdEUyQixXQUFBLE1BQU07WUFDL0IsU0FBZ0IsYUFBYSxDQUFDLFFBQTJCO2dCQUN0RCxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRWpELE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBQSxVQUFVLENBQUMsQ0FBQztnQkFDM0MsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFBLFVBQVUsQ0FBQyxDQUFDO2dCQUMzQyxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQUEsUUFBUSxDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBQSxTQUFTLENBQUMsQ0FBQztnQkFDM0MsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFBLFNBQVMsQ0FBQyxDQUFDO2dCQUczQyxNQUFNLFVBQVUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFF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LENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQztpQkFDdEIsQ0FBQTtnQkFFRCxPQUFPO29CQUNKLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO29CQUNoRSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQztpQkFDNUMsQ0FBQztZQUNMLENBQUM7WUFwRWUsb0JBQWEsZ0JBb0U1QixDQUFBO1FBQ0osQ0FBQyxFQXRFMkIsTUFBTSxHQUFOLGdCQUFNLEtBQU4sZ0JBQU0sUUFzRWpDO0lBQUQsQ0FBQyxFQXRFaUIsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFzRTFCO0FBQUQsQ0FBQyxFQXRFUyxPQUFPLEtBQVAsT0FBTyxRQXNFaEIiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgQ2lyY3VpdC5Db21wb25lbnQuX09wQW1wIHtcclxuICAgZXhwb3J0IGZ1bmN0aW9uIGRyYXdTY2hlbWF0aWMoaW5zdGFuY2U6IENsYXNzZXMuU2NoZW1hdGljKSB7XHJcbiAgICAgIGNvbnN0IGJvZHlHcm91cCA9IFN2Zy5FbGVtZW50Lkdyb3VwLm1ha2UoXCJib2R5XCIpO1xyXG5cclxuICAgICAgY29uc3QgaW5QRW5kID0gaW5zdGFuY2Uuam9pbnRzW0lOREVYSU5QT1NdO1xyXG4gICAgICBjb25zdCBpbk5FbmQgPSBpbnN0YW5jZS5qb2ludHNbSU5ERVhJTk5FR107XHJcbiAgICAgIGNvbnN0IG91dEVuZCA9IGluc3RhbmNlLmpvaW50c1tJTkRFWE9VVF07XHJcbiAgICAgIGNvbnN0IHBvdzFFbmQgPSBpbnN0YW5jZS5qb2ludHNbSU5ERVhQT1cxXTtcclxuICAgICAgY29uc3QgcG93MkVuZCA9IGluc3RhbmNlLmpvaW50c1tJTkRFWFBPVzJdO1xyXG5cclxuICAgICAgLy8gQ29ybmVycyBvZiB0aGUgYm9keSB0cmlhbmdsZVxyXG4gICAgICBjb25zdCBib2R5Sm9pbnRzID0gW3sgeDogLTI1LCB5OiAtMjUgfSwgeyB4OiAyNSwgeTogMCB9LCB7IHg6IC0yNSwgeTogMjUgfSwgeyB4OiAtMjUsIHk6IC0yNSB9XTtcclxuXHJcbiAgICAgIC8vIFRoZSBkcmF3aW5ncyBvcmllbnRhdGlvbiAoYmVmb3JlIHRyYW5zZm9ybXMpIGlzOiBcclxuICAgICAgLy8gICBlbWl0dGVyIGF0IHRoZSB0b3BcclxuICAgICAgLy8gICBjb2xsZWN0b3IgYXQgdGhlIGJvdHRvbVxyXG4gICAgICAvLyAgIGJhc2UgdG8gdGhlIHJpZ2h0XHJcbiAgICAgIGJvZHlHcm91cC5hcHBlbmQoXHJcblxyXG4gICAgICAgICAvL0hpZ2hsaWdodFxyXG4gICAgICAgICBTdmcuRWxlbWVudC5QYXRoLm1ha2UoYm9keUpvaW50cywgXCJoaWdobGlnaHQgaGlnaGxpZ2h0d2l0aGZpbGwgZXh0cmF0aGlja1wiKSxcclxuICAgICAgICAgLy9NYWluIGJvZHkgdHJpYW5nbGVcclxuICAgICAgICAgU3ZnLkVsZW1lbnQuUGF0aC5tYWtlKGJvZHlKb2ludHMsIFwiYm9keSB3aGl0ZVwiKSxcclxuXHJcbiAgICAgICAgIC8vUGx1c1xyXG4gICAgICAgICBTdmcuRWxlbWVudC5MaW5lLm1ha2UoeyB4OiAtMjIsIHk6IC0xMCB9LCB7IHg6IC0xNCwgeTogLTEwIH0sIFwibGluZSB0aGluXCIpLFxyXG4gICAgICAgICBTdmcuRWxlbWVudC5MaW5lLm1ha2UoeyB4OiAtMTgsIHk6IC02IH0sIHsgeDogLTE4LCB5OiAtMTQgfSwgXCJsaW5lIHRoaW5cIiksXHJcblxyXG4gICAgICAgICAvL01pbnVzXHJcbiAgICAgICAgIFN2Zy5FbGVtZW50LkxpbmUubWFrZSh7IHg6IC0yMiwgeTogKzEwIH0sIHsgeDogLTE0LCB5OiArMTAgfSwgXCJsaW5lIHRoaW5cIiksXHJcbiAgICAgICk7XHJcblxyXG5cclxuICAgICAgLy8gSW1hZ2UgY2VudHJlIGRvZXMgbm90IHRha2UgYmFzZSBpbnRvIGFjY291bnRcclxuICAgICAgLy8gSXMgYWx3YXlzIGRpcmVjdGx5IGJldHdlZW4gdGhlIGVtaXR0ZXIgYW5kIGNvbGxlY3RvclxyXG4gICAgICBsZXQgY2VudHJlID0gdmVjdG9yKHBvdzFFbmQsIHBvdzJFbmQpLmNlbnRyZSgpLnZlY3RvcjtcclxuXHJcbiAgICAgIC8vIGFsbCBhbmdsZXMgYXJlIHJlbGF0aXZlIHRvIHRoZSB4LWF4aXMsIGhlbmNlIGluIGRlZmF1bHQgb3JpZW50YXRpb246XHJcbiAgICAgIC8vICAgd2hlbiBubyByb3RhdGlvbiBpcyByZXF1aXJlZCwgYW5nbGVFbWl0dGVyQ2VudHJlID0gOTAsIFxyXG4gICAgICBsZXQgYW5nbGVDZW50cmVCYXNlID0gdmVjdG9yKGNlbnRyZSkuZ2V0QW5nbGVUbyhvdXRFbmQpO1xyXG4gICAgICBsZXQgYW5nbGVJblBJbk4gPSB2ZWN0b3IocG93MUVuZCkuZ2V0QW5nbGVUbyhwb3cyRW5kKTtcclxuXHJcbiAgICAgIGxldCByb3RhdGlvbiA9IGFuZ2xlSW5QSW5OIC0gOTA7XHJcblxyXG4gICAgICAvLyBEb24ndCBhc2suXHJcbiAgICAgIGxldCBzY2FsZSA9ICgoKGFuZ2xlSW5QSW5OIC0gYW5nbGVDZW50cmVCYXNlICsgMzYwKSAlIDM2MCkgPiAxODApXHJcbiAgICAgICAgID8geyB4OiAtMSB9XHJcbiAgICAgICAgIDogeyB4OiAxIH07XHJcblxyXG4gICAgICAvLyBPbmx5IHRoZSBzdGFydCBvZiB0aGUgY29ubmVjdGlvbnMgc2hvdWxkIGJlIHRyYW5zZm9ybWVkLCBcclxuICAgICAgLy8gdGhlIGVuZHMgc2hvdWxkIGJlIGFic29sdXRlLlxyXG4gICAgICAvLyAoSGVuY2UgdXNpbmcgdmVjdG9yIHRyYW5zZm9ybXMsIG5vdCBzdmcgdHJhbnNmb3JtcylcclxuICAgICAgbGV0IFtpblBTdGFydCwgaW5OU3RhcnQsIG91dFN0YXJ0LCBwb3dQU3RhcnQsIHBvd05TdGFydF06IFZlY3RvcltdID0gdmVjdG9yKFxyXG4gICAgICAgICB7IHg6IC0yNSwgeTogLTEwIH0sIHsgeDogLTI1LCB5OiAxMCB9LCB7IHg6IDI1LCB5OiAwIH0sIHsgeDogMCwgeTogLTEzIH0sIHsgeDogMCwgeTogMTMgfVxyXG4gICAgICApLnNjYWxlV2l0aChzY2FsZSkucm90YXRlKHJvdGF0aW9uKS5zdW1XaXRoKGNlbnRyZSkudmVjdG9ycztcclxuXHJcblxyXG4gICAgICBsZXQgam9pbnRzID0gW1xyXG4gICAgICAgICBbaW5QU3RhcnQsIGluUEVuZF0sXHJcbiAgICAgICAgIFtpbk5TdGFydCwgaW5ORW5kXSxcclxuICAgICAgICAgW291dFN0YXJ0LCBvdXRFbmRdLFxyXG4gICAgICAgICBbcG93UFN0YXJ0LCBwb3cxRW5kXSxcclxuICAgICAgICAgW3Bvd05TdGFydCwgcG93MkVuZF0sXHJcbiAgICAgIF1cclxuXHJcbiAgICAgIHJldHVybiBbXHJcbiAgICAgICAgIGJvZHlHcm91cC50cmFuc2xhdGUoY2VudHJlKS5yb3RhdGUocm90YXRpb24pLnNjYWxlKHNjYWxlLCBmYWxzZSksXHJcbiAgICAgICAgIFN2Zy5FbGVtZW50LlBhdGgubWFrZShqb2ludHMsIFwibGluZSB0aGluXCIpLFxyXG4gICAgICBdO1xyXG4gICB9XHJcbn1cclxuIl19