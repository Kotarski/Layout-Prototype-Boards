"use strict";
var Svg;
(function (Svg) {
    var Element;
    (function (Element) {
        var Group;
        (function (Group) {
            var Dip;
            (function (Dip) {
                function make(pinsPerSide = 4, textLineOne = "", textLineTwo = "", textLineThree = "", classes = "") {
                    const element = Group.make("dip" + classes);
                    let gridSpacing = Constants.gridSpacing;
                    let bodySize = {
                        width: gridSpacing * pinsPerSide,
                        height: gridSpacing * 2.8
                    };
                    let centre = {
                        x: gridSpacing * (pinsPerSide - 1) / 2,
                        y: gridSpacing * 1.5
                    };
                    let pinString = "M " + (0) + " " + (-2.5)
                        + "h " + (-4)
                        + "v " + (3)
                        + "l " + (1) + " " + (0.5)
                        + "h " + (6)
                        + "l " + (1) + " " + (-0.5)
                        + "v " + (-3)
                        + "Z";
                    for (let i = 0; i < pinsPerSide; i++) {
                        element.append(Element.Path.make(pinString, "pin").scale({ x: 1, y: -1 }).translate({ x: gridSpacing * i, y: 0 }), Element.Path.make(pinString, "pin").translate({ x: gridSpacing * i, y: 3 * gridSpacing }));
                    }
                    ;
                    let notchString = "M " + (-0.5 * gridSpacing) + " " + (centre.y) +
                        "v " + (8) +
                        "a " + (1) + " " + (1) + " " + (0) + " " + (0) + " " + (0) + " " + (0) + " " + (-16) +
                        "Z";
                    element.append(Svg.Element.Rect.make(centre, bodySize, { x: 5, y: 5 }, "body"), Svg.Element.Path.make(notchString, "notch"), Svg.Element.Rect.make(centre, bodySize, { x: 5, y: 5 }, "body highlight"), Svg.Element.Text.make(textLineOne, { x: 0.25 * gridSpacing, y: 1 * gridSpacing }, "text"), Svg.Element.Text.make(textLineTwo, { x: 0.25 * gridSpacing, y: 1.75 * gridSpacing }, "text"), Svg.Element.Text.make(textLineThree, { x: 0.25 * gridSpacing, y: 2.5 * gridSpacing }, "text"));
                    return element;
                }
                Dip.make = make;
            })(Dip = Group.Dip || (Group.Dip = {}));
        })(Group = Element.Group || (Element.Group = {}));
    })(Element = Svg.Element || (Svg.Element = {}));
})(Svg || (Svg = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiK2RpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3R5cGVzY3JpcHQvc3ZnL2VsZW1lbnQvZ3JvdXBzLytkaXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVUsR0FBRyxDQXlEWjtBQXpERCxXQUFVLEdBQUc7SUFBQyxJQUFBLE9BQU8sQ0F5RHBCO0lBekRhLFdBQUEsT0FBTztRQUFDLElBQUEsS0FBSyxDQXlEMUI7UUF6RHFCLFdBQUEsS0FBSztZQUFDLElBQUEsR0FBRyxDQXlEOUI7WUF6RDJCLFdBQUEsR0FBRztnQkFFNUIsU0FBZ0IsSUFBSSxDQUNqQixjQUFzQixDQUFDLEVBQ3ZCLGNBQXNCLEVBQUUsRUFDeEIsY0FBc0IsRUFBRSxFQUN4QixnQkFBd0IsRUFBRSxFQUMxQixVQUFrQixFQUFFO29CQUVwQixNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQztvQkFFNUMsSUFBSSxXQUFXLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQztvQkFFeEMsSUFBSSxRQUFRLEdBQUc7d0JBQ1osS0FBSyxFQUFFLFdBQVcsR0FBRyxXQUFXO3dCQUNoQyxNQUFNLEVBQUUsV0FBVyxHQUFHLEdBQUc7cUJBQzNCLENBQUE7b0JBRUQsSUFBSSxNQUFNLEdBQUc7d0JBQ1YsQ0FBQyxFQUFFLFdBQVcsR0FBRyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO3dCQUN0QyxDQUFDLEVBQUUsV0FBVyxHQUFHLEdBQUc7cUJBQ3RCLENBQUM7b0JBRUYsSUFBSSxTQUFTLEdBQ1YsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7MEJBQ3ZCLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzBCQUNYLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQzswQkFDVixJQUFJLEdBQUcsQ0FBQyxDQUFD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dERlLFFBQUksT0FzRG5CLENBQUE7WUFDSixDQUFDLEVBekQyQixHQUFHLEdBQUgsU0FBRyxLQUFILFNBQUcsUUF5RDlCO1FBQUQsQ0FBQyxFQXpEcUIsS0FBSyxHQUFMLGFBQUssS0FBTCxhQUFLLFFBeUQxQjtJQUFELENBQUMsRUF6RGEsT0FBTyxHQUFQLFdBQU8sS0FBUCxXQUFPLFFBeURwQjtBQUFELENBQUMsRUF6RFMsR0FBRyxLQUFILEdBQUcsUUF5RFoiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgU3ZnLkVsZW1lbnQuR3JvdXAuRGlwIHtcclxuICAgZXhwb3J0IHR5cGUgdHlwZSA9IFJldHVyblR5cGU8dHlwZW9mIG1ha2U+O1xyXG4gICBleHBvcnQgZnVuY3Rpb24gbWFrZShcclxuICAgICAgcGluc1BlclNpZGU6IG51bWJlciA9IDQsXHJcbiAgICAgIHRleHRMaW5lT25lOiBzdHJpbmcgPSBcIlwiLFxyXG4gICAgICB0ZXh0TGluZVR3bzogc3RyaW5nID0gXCJcIixcclxuICAgICAgdGV4dExpbmVUaHJlZTogc3RyaW5nID0gXCJcIixcclxuICAgICAgY2xhc3Nlczogc3RyaW5nID0gXCJcIlxyXG4gICApIHtcclxuICAgICAgY29uc3QgZWxlbWVudCA9IEdyb3VwLm1ha2UoXCJkaXBcIiArIGNsYXNzZXMpO1xyXG5cclxuICAgICAgbGV0IGdyaWRTcGFjaW5nID0gQ29uc3RhbnRzLmdyaWRTcGFjaW5nO1xyXG5cclxuICAgICAgbGV0IGJvZHlTaXplID0ge1xyXG4gICAgICAgICB3aWR0aDogZ3JpZFNwYWNpbmcgKiBwaW5zUGVyU2lkZSxcclxuICAgICAgICAgaGVpZ2h0OiBncmlkU3BhY2luZyAqIDIuOFxyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgY2VudHJlID0ge1xyXG4gICAgICAgICB4OiBncmlkU3BhY2luZyAqIChwaW5zUGVyU2lkZSAtIDEpIC8gMixcclxuICAgICAgICAgeTogZ3JpZFNwYWNpbmcgKiAxLjVcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGxldCBwaW5TdHJpbmcgPVxyXG4gICAgICAgICBcIk0gXCIgKyAoMCkgKyBcIiBcIiArICgtMi41KVxyXG4gICAgICAgICArIFwiaCBcIiArICgtNClcclxuICAgICAgICAgKyBcInYgXCIgKyAoMylcclxuICAgICAgICAgKyBcImwgXCIgKyAoMSkgKyBcIiBcIiArICgwLjUpXHJcbiAgICAgICAgICsgXCJoIFwiICsgKDYpXHJcbiAgICAgICAgICsgXCJsIFwiICsgKDEpICsgXCIgXCIgKyAoLTAuNSlcclxuICAgICAgICAgKyBcInYgXCIgKyAoLTMpXHJcbiAgICAgICAgICsgXCJaXCI7XHJcblxyXG4gICAgICAvLyBsZXQgcGluWEJhc2UgPSAwO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBpbnNQZXJTaWRlOyBpKyspIHtcclxuICAgICAgICAgZWxlbWVudC5hcHBlbmQoXHJcbiAgICAgICAgICAgIFBhdGgubWFrZShwaW5TdHJpbmcsIFwicGluXCIpLnNjYWxlKHsgeDogMSwgeTogLTEgfSkudHJhbnNsYXRlKHsgeDogZ3JpZFNwYWNpbmcgKiBpLCB5OiAwIH0pLFxyXG4gICAgICAgICAgICBQYXRoLm1ha2UocGluU3RyaW5nLCBcInBpblwiKS50cmFuc2xhdGUoeyB4OiBncmlkU3BhY2luZyAqIGksIHk6IDMgKiBncmlkU3BhY2luZyB9KVxyXG4gICAgICAgICApO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgbGV0IG5vdGNoU3RyaW5nID1cclxuICAgICAgICAgXCJNIFwiICsgKC0wLjUgKiBncmlkU3BhY2luZykgKyBcIiBcIiArIChjZW50cmUueSkgK1xyXG4gICAgICAgICBcInYgXCIgKyAoOCkgK1xyXG4gICAgICAgICBcImEgXCIgKyAoMSkgKyBcIiBcIiArICgxKSArIFwiIFwiICsgKDApICsgXCIgXCIgKyAoMCkgKyBcIiBcIiArICgwKSArIFwiIFwiICsgKDApICsgXCIgXCIgKyAoLTE2KSArXHJcbiAgICAgICAgIFwiWlwiO1xyXG5cclxuICAgICAgZWxlbWVudC5hcHBlbmQoXHJcbiAgICAgICAgIFN2Zy5FbGVtZW50LlJlY3QubWFrZShjZW50cmUsIGJvZHlTaXplLCB7IHg6IDUsIHk6IDUgfSwgXCJib2R5XCIpLFxyXG4gICAgICAgICBTdmcuRWxlbWVudC5QYXRoLm1ha2Uobm90Y2hTdHJpbmcsIFwibm90Y2hcIiksXHJcbiAgICAgICAgIFN2Zy5FbGVtZW50LlJlY3QubWFrZShjZW50cmUsIGJvZHlTaXplLCB7IHg6IDUsIHk6IDUgfSwgXCJib2R5IGhpZ2hsaWdodFwiKSxcclxuICAgICAgICAgU3ZnLkVsZW1lbnQuVGV4dC5tYWtlKHRleHRMaW5lT25lLCB7IHg6IDAuMjUgKiBncmlkU3BhY2luZywgeTogMSAqIGdyaWRTcGFjaW5nIH0sIFwidGV4dFwiKSxcclxuICAgICAgICAgU3ZnLkVsZW1lbnQuVGV4dC5tYWtlKHRleHRMaW5lVHdvLCB7IHg6IDAuMjUgKiBncmlkU3BhY2luZywgeTogMS43NSAqIGdyaWRTcGFjaW5nIH0sIFwidGV4dFwiKSxcclxuICAgICAgICAgU3ZnLkVsZW1lbnQuVGV4dC5tYWtlKHRleHRMaW5lVGhyZWUsIHsgeDogMC4yNSAqIGdyaWRTcGFjaW5nLCB5OiAyLjUgKiBncmlkU3BhY2luZyB9LCBcInRleHRcIilcclxuICAgICAgKTtcclxuICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgIH1cclxufVxyXG4iXX0=