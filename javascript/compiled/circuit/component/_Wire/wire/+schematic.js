"use strict";
var Svg;
(function (Svg) {
    var Element;
    (function (Element) {
        var Group;
        (function (Group) {
            var Wire;
            (function (Wire) {
                var Schematic;
                (function (Schematic) {
                    function make(joints, classes = "") {
                        return [
                            Svg.Element.Path.make(joints, "line thin")
                        ];
                    }
                    Schematic.make = make;
                })(Schematic = Wire.Schematic || (Wire.Schematic = {}));
            })(Wire = Group.Wire || (Group.Wire = {}));
        })(Group = Element.Group || (Element.Group = {}));
    })(Element = Svg.Element || (Svg.Element = {}));
})(Svg || (Svg = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiK3NjaGVtYXRpYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3R5cGVzY3JpcHQvY2lyY3VpdC9jb21wb25lbnQvX3dpcmUvd2lyZS8rc2NoZW1hdGljLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLEdBQUcsQ0FPWjtBQVBELFdBQVUsR0FBRztJQUFDLElBQUEsT0FBTyxDQU9wQjtJQVBhLFdBQUEsT0FBTztRQUFDLElBQUEsS0FBSyxDQU8xQjtRQVBxQixXQUFBLEtBQUs7WUFBQyxJQUFBLElBQUksQ0FPL0I7WUFQMkIsV0FBQSxJQUFJO2dCQUFDLElBQUEsU0FBUyxDQU96QztnQkFQZ0MsV0FBQSxTQUFTO29CQUV2QyxTQUFnQixJQUFJLENBQUMsTUFBZ0IsRUFBRSxVQUFrQixFQUFFO3dCQUN4RCxPQUFPOzRCQUNKLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDO3lCQUM1QyxDQUFDO29CQUNMLENBQUM7b0JBSmUsY0FBSSxPQUluQixDQUFBO2dCQUNKLENBQUMsRUFQZ0MsU0FBUyxHQUFULGNBQVMsS0FBVCxjQUFTLFFBT3pDO1lBQUQsQ0FBQyxFQVAyQixJQUFJLEdBQUosVUFBSSxLQUFKLFVBQUksUUFPL0I7UUFBRCxDQUFDLEVBUHFCLEtBQUssR0FBTCxhQUFLLEtBQUwsYUFBSyxRQU8xQjtJQUFELENBQUMsRUFQYSxPQUFPLEdBQVAsV0FBTyxLQUFQLFdBQU8sUUFPcEI7QUFBRCxDQUFDLEVBUFMsR0FBRyxLQUFILEdBQUcsUUFPWiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBTdmcuRWxlbWVudC5Hcm91cC5XaXJlLlNjaGVtYXRpYyB7XHJcbiAgIGV4cG9ydCB0eXBlIHR5cGUgPSBSZXR1cm5UeXBlPHR5cGVvZiBtYWtlPjtcclxuICAgZXhwb3J0IGZ1bmN0aW9uIG1ha2Uoam9pbnRzOiBWZWN0b3JbXSwgY2xhc3Nlczogc3RyaW5nID0gXCJcIikge1xyXG4gICAgICByZXR1cm4gW1xyXG4gICAgICAgICBTdmcuRWxlbWVudC5QYXRoLm1ha2Uoam9pbnRzLCBcImxpbmUgdGhpblwiKVxyXG4gICAgICBdO1xyXG4gICB9XHJcbn1cclxuXHJcbiJdfQ==