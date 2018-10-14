"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Power;
        (function (_Power) {
            function drawLayout(instance) {
                const bodyGroup = Svg.Element.Group.make("body");
                const text = instance.voltage.toFixed(1);
                bodyGroup.append(Svg.Element.Rect.make({ x: 0, y: -35 }, { width: 180, height: 95 }, { x: 10, y: 10 }, "body highlight"), Svg.Element.Rect.make({ x: 0, y: -45 }, { width: 160, height: 65 }, { x: 10, y: 10 }, "screen"), Svg.Element.Text.make("8".repeat(text.length - 1), { x: 0, y: -20 }, "screentext off"), Svg.Element.Text.make(text, { x: 0, y: -20 }, "screentext on"), Svg.Element.Circle.make({ x: 0, y: 0 }, 5, "hole"));
                return [
                    bodyGroup.translate(instance.joints[_Power.INDEXCONNECTION])
                ];
            }
            _Power.drawLayout = drawLayout;
        })(_Power = Component._Power || (Component._Power = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLWRyYXdMYXlvdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50L19wb3dlci8tZHJhd0xheW91dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxPQUFPLENBa0JoQjtBQWxCRCxXQUFVLE9BQU87SUFBQyxJQUFBLFNBQVMsQ0FrQjFCO0lBbEJpQixXQUFBLFNBQVM7UUFBQyxJQUFBLE1BQU0sQ0FrQmpDO1FBbEIyQixXQUFBLE1BQU07WUFDL0IsU0FBZ0IsVUFBVSxDQUFDLFFBQXdCO2dCQUNoRCxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRWpELE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUV6QyxTQUFTLENBQUMsTUFBTSxDQUNiLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLGdCQUFnQixDQUFDLEVBQ3ZHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxFQUMvRixHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxnQkFBZ0IsQ0FBQyxFQUN0RixHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxlQUFlLENBQUMsRUFDOUQsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUNwRCxDQUFDO2dCQUVGLE9BQU87b0JBQ0osU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQUEsZUFBZSxDQUFDLENBQUM7aUJBQ3ZELENBQUM7WUFDTCxDQUFDO1lBaEJlLGlCQUFVLGFBZ0J6QixDQUFBO1FBQ0osQ0FBQyxFQWxCMkIsTUFBTSxHQUFOLGdCQUFNLEtBQU4sZ0JBQU0sUUFrQmpDO0lBQUQsQ0FBQyxFQWxCaUIsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFrQjFCO0FBQUQsQ0FBQyxFQWxCUyxPQUFPLEtBQVAsT0FBTyxRQWtCaEIiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgQ2lyY3VpdC5Db21wb25lbnQuX1Bvd2VyIHtcclxuICAgZXhwb3J0IGZ1bmN0aW9uIGRyYXdMYXlvdXQoaW5zdGFuY2U6IENsYXNzZXMuTGF5b3V0KSB7XHJcbiAgICAgIGNvbnN0IGJvZHlHcm91cCA9IFN2Zy5FbGVtZW50Lkdyb3VwLm1ha2UoXCJib2R5XCIpO1xyXG5cclxuICAgICAgY29uc3QgdGV4dCA9IGluc3RhbmNlLnZvbHRhZ2UudG9GaXhlZCgxKTtcclxuXHJcbiAgICAgIGJvZHlHcm91cC5hcHBlbmQoXHJcbiAgICAgICAgIFN2Zy5FbGVtZW50LlJlY3QubWFrZSh7IHg6IDAsIHk6IC0zNSB9LCB7IHdpZHRoOiAxODAsIGhlaWdodDogOTUgfSwgeyB4OiAxMCwgeTogMTAgfSwgXCJib2R5IGhpZ2hsaWdodFwiKSxcclxuICAgICAgICAgU3ZnLkVsZW1lbnQuUmVjdC5tYWtlKHsgeDogMCwgeTogLTQ1IH0sIHsgd2lkdGg6IDE2MCwgaGVpZ2h0OiA2NSB9LCB7IHg6IDEwLCB5OiAxMCB9LCBcInNjcmVlblwiKSxcclxuICAgICAgICAgU3ZnLkVsZW1lbnQuVGV4dC5tYWtlKFwiOFwiLnJlcGVhdCh0ZXh0Lmxlbmd0aCAtIDEpLCB7IHg6IDAsIHk6IC0yMCB9LCBcInNjcmVlbnRleHQgb2ZmXCIpLFxyXG4gICAgICAgICBTdmcuRWxlbWVudC5UZXh0Lm1ha2UodGV4dCwgeyB4OiAwLCB5OiAtMjAgfSwgXCJzY3JlZW50ZXh0IG9uXCIpLFxyXG4gICAgICAgICBTdmcuRWxlbWVudC5DaXJjbGUubWFrZSh7IHg6IDAsIHk6IDAgfSwgNSwgXCJob2xlXCIpXHJcbiAgICAgICk7XHJcblxyXG4gICAgICByZXR1cm4gW1xyXG4gICAgICAgICBib2R5R3JvdXAudHJhbnNsYXRlKGluc3RhbmNlLmpvaW50c1tJTkRFWENPTk5FQ1RJT05dKVxyXG4gICAgICBdO1xyXG4gICB9XHJcbn0iXX0=