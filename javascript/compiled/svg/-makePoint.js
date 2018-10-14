"use strict";
var Svg;
(function (Svg) {
    function makePoint(vector) {
        const point = Svg.Element.make("svg").createSVGPoint();
        point.x = vector.x;
        point.y = vector.y;
        return point;
    }
    Svg.makePoint = makePoint;
})(Svg || (Svg = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLW1ha2VQb2ludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3R5cGVzY3JpcHQvc3ZnLy1tYWtlUG9pbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVUsR0FBRyxDQU9aO0FBUEQsV0FBVSxHQUFHO0lBQ1YsU0FBZ0IsU0FBUyxDQUFDLE1BQWM7UUFDckMsTUFBTSxLQUFLLEdBQUcsSUFBQSxPQUFPLENBQUMsSUFBSSxDQUFnQixLQUFLLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNsRSxLQUFLLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDbkIsS0FBSyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ25CLE9BQU8sS0FBSyxDQUFDO0lBQ2hCLENBQUM7SUFMZSxhQUFTLFlBS3hCLENBQUE7QUFDSixDQUFDLEVBUFMsR0FBRyxLQUFILEdBQUcsUUFPWiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBTdmcge1xyXG4gICBleHBvcnQgZnVuY3Rpb24gbWFrZVBvaW50KHZlY3RvcjogVmVjdG9yKTogU1ZHUG9pbnQge1xyXG4gICAgICBjb25zdCBwb2ludCA9IEVsZW1lbnQubWFrZTxTVkdTVkdFbGVtZW50PihcInN2Z1wiKS5jcmVhdGVTVkdQb2ludCgpO1xyXG4gICAgICBwb2ludC54ID0gdmVjdG9yLng7XHJcbiAgICAgIHBvaW50LnkgPSB2ZWN0b3IueTtcclxuICAgICAgcmV0dXJuIHBvaW50O1xyXG4gICB9XHJcbn1cclxuIl19