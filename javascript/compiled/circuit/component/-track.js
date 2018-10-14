"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        Component.track = Component.makeMap({
            savename: "makeLayoutTrack",
            diagramType: "layout",
            instance: Component._Track.Classes.Layout,
            make: Component._Track.makeLayout,
            load: Component._Track.loadLayout
        });
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLXRyYWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdHlwZXNjcmlwdC9jaXJjdWl0L2NvbXBvbmVudC8tdHJhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUlBLElBQVUsT0FBTyxDQVNoQjtBQVRELFdBQVUsT0FBTztJQUFDLElBQUEsU0FBUyxDQVMxQjtJQVRpQixXQUFBLFNBQVM7UUFFWCxlQUFLLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQztZQUNwQyxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFdBQVcsRUFBRSxRQUFvQjtZQUNqQyxRQUFRLEVBQUUsVUFBQSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU07WUFDL0IsSUFBSSxFQUFFLFVBQUEsTUFBTSxDQUFDLFVBQVU7WUFDdkIsSUFBSSxFQUFFLFVBQUEsTUFBTSxDQUFDLFVBQVU7U0FDekIsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxFQVRpQixTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQVMxQjtBQUFELENBQUMsRUFUUyxPQUFPLEtBQVAsT0FBTyxRQVNoQiIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJfVHJhY2svfmNsYXNzZXMudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiX1RyYWNrLy1tYWtlTGF5b3V0LnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIl9UcmFjay8tbG9hZExheW91dC50c1wiIC8+XHJcblxyXG5uYW1lc3BhY2UgQ2lyY3VpdC5Db21wb25lbnQge1xyXG5cclxuICAgZXhwb3J0IGNvbnN0IHRyYWNrID0gQ29tcG9uZW50Lm1ha2VNYXAoe1xyXG4gICAgICBzYXZlbmFtZTogXCJtYWtlTGF5b3V0VHJhY2tcIixcclxuICAgICAgZGlhZ3JhbVR5cGU6IFwibGF5b3V0XCIgYXMgXCJsYXlvdXRcIixcclxuICAgICAgaW5zdGFuY2U6IF9UcmFjay5DbGFzc2VzLkxheW91dCxcclxuICAgICAgbWFrZTogX1RyYWNrLm1ha2VMYXlvdXQsXHJcbiAgICAgIGxvYWQ6IF9UcmFjay5sb2FkTGF5b3V0XHJcbiAgIH0pO1xyXG59Il19