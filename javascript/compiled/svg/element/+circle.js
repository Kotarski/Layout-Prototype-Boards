"use strict";
var Svg;
(function (Svg) {
    var Element;
    (function (Element) {
        var Circle;
        (function (Circle) {
            function make(centreVector, radius, classes = "") {
                const element = Element.make("circle", classes);
                element.setAttribute("cx", centreVector.x.toString());
                element.setAttribute("cy", centreVector.y.toString());
                element.setAttribute("r", radius.toString());
                return svg(element);
            }
            Circle.make = make;
        })(Circle = Element.Circle || (Element.Circle = {}));
    })(Element = Svg.Element || (Svg.Element = {}));
})(Svg || (Svg = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiK2NpcmNsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3R5cGVzY3JpcHQvc3ZnL2VsZW1lbnQvK2NpcmNsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxHQUFHLENBU1o7QUFURCxXQUFVLEdBQUc7SUFBQyxJQUFBLE9BQU8sQ0FTcEI7SUFUYSxXQUFBLE9BQU87UUFBQyxJQUFBLE1BQU0sQ0FTM0I7UUFUcUIsV0FBQSxNQUFNO1lBRXpCLFNBQWdCLElBQUksQ0FBQyxZQUFvQixFQUFFLE1BQWMsRUFBRSxVQUFrQixFQUFFO2dCQUM1RSxNQUFNLE9BQU8sR0FBcUIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ2xFLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDdEQsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUN0RCxPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDN0MsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkIsQ0FBQztZQU5lLFdBQUksT0FNbkIsQ0FBQTtRQUNKLENBQUMsRUFUcUIsTUFBTSxHQUFOLGNBQU0sS0FBTixjQUFNLFFBUzNCO0lBQUQsQ0FBQyxFQVRhLE9BQU8sR0FBUCxXQUFPLEtBQVAsV0FBTyxRQVNwQjtBQUFELENBQUMsRUFUUyxHQUFHLEtBQUgsR0FBRyxRQVNaIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIFN2Zy5FbGVtZW50LkNpcmNsZSB7XHJcbiAgIGV4cG9ydCB0eXBlIHR5cGUgPSBSZXR1cm5UeXBlPHR5cGVvZiBtYWtlPjtcclxuICAgZXhwb3J0IGZ1bmN0aW9uIG1ha2UoY2VudHJlVmVjdG9yOiBWZWN0b3IsIHJhZGl1czogbnVtYmVyLCBjbGFzc2VzOiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgIGNvbnN0IGVsZW1lbnQ6IFNWR0NpcmNsZUVsZW1lbnQgPSBFbGVtZW50Lm1ha2UoXCJjaXJjbGVcIiwgY2xhc3Nlcyk7XHJcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiY3hcIiwgY2VudHJlVmVjdG9yLngudG9TdHJpbmcoKSk7XHJcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiY3lcIiwgY2VudHJlVmVjdG9yLnkudG9TdHJpbmcoKSk7XHJcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiclwiLCByYWRpdXMudG9TdHJpbmcoKSk7XHJcbiAgICAgIHJldHVybiBzdmcoZWxlbWVudCk7XHJcbiAgIH1cclxufVxyXG4iXX0=