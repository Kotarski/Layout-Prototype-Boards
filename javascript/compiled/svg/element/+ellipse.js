"use strict";
var Svg;
(function (Svg) {
    var Element;
    (function (Element) {
        var Ellipse;
        (function (Ellipse) {
            function make(centreVector, radiusVector, classes = "") {
                const element = Element.make("ellipse", classes);
                element.setAttribute("cx", centreVector.x.toString());
                element.setAttribute("cy", centreVector.y.toString());
                element.setAttribute("rx", radiusVector.x.toString());
                element.setAttribute("ry", radiusVector.y.toString());
                return svg(element);
            }
            Ellipse.make = make;
        })(Ellipse = Element.Ellipse || (Element.Ellipse = {}));
    })(Element = Svg.Element || (Svg.Element = {}));
})(Svg || (Svg = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiK2VsbGlwc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90eXBlc2NyaXB0L3N2Zy9lbGVtZW50LytlbGxpcHNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLEdBQUcsQ0FVWjtBQVZELFdBQVUsR0FBRztJQUFDLElBQUEsT0FBTyxDQVVwQjtJQVZhLFdBQUEsT0FBTztRQUFDLElBQUEsT0FBTyxDQVU1QjtRQVZxQixXQUFBLE9BQU87WUFFMUIsU0FBZ0IsSUFBSSxDQUFDLFlBQW9CLEVBQUUsWUFBb0IsRUFBRSxVQUFrQixFQUFFO2dCQUNsRixNQUFNLE9BQU8sR0FBc0IsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ3BFLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDdEQsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUN0RCxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQ3RELE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDdEQsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkIsQ0FBQztZQVBlLFlBQUksT0FPbkIsQ0FBQTtRQUNKLENBQUMsRUFWcUIsT0FBTyxHQUFQLGVBQU8sS0FBUCxlQUFPLFFBVTVCO0lBQUQsQ0FBQyxFQVZhLE9BQU8sR0FBUCxXQUFPLEtBQVAsV0FBTyxRQVVwQjtBQUFELENBQUMsRUFWUyxHQUFHLEtBQUgsR0FBRyxRQVVaIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIFN2Zy5FbGVtZW50LkVsbGlwc2Uge1xyXG4gICBleHBvcnQgdHlwZSB0eXBlID0gUmV0dXJuVHlwZTx0eXBlb2YgbWFrZT47XHJcbiAgIGV4cG9ydCBmdW5jdGlvbiBtYWtlKGNlbnRyZVZlY3RvcjogVmVjdG9yLCByYWRpdXNWZWN0b3I6IFZlY3RvciwgY2xhc3Nlczogc3RyaW5nID0gXCJcIikge1xyXG4gICAgICBjb25zdCBlbGVtZW50OiBTVkdFbGxpcHNlRWxlbWVudCA9IEVsZW1lbnQubWFrZShcImVsbGlwc2VcIiwgY2xhc3Nlcyk7XHJcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiY3hcIiwgY2VudHJlVmVjdG9yLngudG9TdHJpbmcoKSk7XHJcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiY3lcIiwgY2VudHJlVmVjdG9yLnkudG9TdHJpbmcoKSk7XHJcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwicnhcIiwgcmFkaXVzVmVjdG9yLngudG9TdHJpbmcoKSk7XHJcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwicnlcIiwgcmFkaXVzVmVjdG9yLnkudG9TdHJpbmcoKSk7XHJcbiAgICAgIHJldHVybiBzdmcoZWxlbWVudCk7XHJcbiAgIH1cclxufVxyXG4iXX0=