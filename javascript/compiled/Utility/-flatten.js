"use strict";
var Utility;
(function (Utility) {
    Utility.flatten2d = (array) => [].concat.apply([], array);
    Utility.flatten3d = (array) => Utility.flatten2d(Utility.flatten2d(array));
})(Utility || (Utility = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLWZsYXR0ZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90eXBlc2NyaXB0L3V0aWxpdHkvLWZsYXR0ZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVUsT0FBTyxDQUdoQjtBQUhELFdBQVUsT0FBTztJQUNELGlCQUFTLEdBQUcsQ0FBSSxLQUFZLEVBQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNqRSxpQkFBUyxHQUFHLENBQUksS0FBYyxFQUFPLEVBQUUsQ0FBQyxRQUFBLFNBQVMsQ0FBQyxRQUFBLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ3BGLENBQUMsRUFIUyxPQUFPLEtBQVAsT0FBTyxRQUdoQiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBVdGlsaXR5IHtcclxuICAgZXhwb3J0IGNvbnN0IGZsYXR0ZW4yZCA9IDxUPihhcnJheTogVFtdW10pOiBUW10gPT4gW10uY29uY2F0LmFwcGx5KFtdLCBhcnJheSk7XHJcbiAgIGV4cG9ydCBjb25zdCBmbGF0dGVuM2QgPSA8VD4oYXJyYXk6IFRbXVtdW10pOiBUW10gPT4gZmxhdHRlbjJkKGZsYXR0ZW4yZChhcnJheSkpO1xyXG59Il19