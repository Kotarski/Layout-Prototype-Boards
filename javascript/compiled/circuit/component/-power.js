"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        const schematicMap = {
            savename: "makePower",
            diagramType: "schematic",
            instance: Component._Power.Classes.Schematic,
            make: Component._Power.makeSchematic,
            load: Component._Power.loadSchematic,
        };
        const layoutMap = {
            savename: "makeLayoutPower",
            diagramType: "layout",
            instance: Component._Power.Classes.Layout,
            make: Component._Power.makeLayout,
            load: Component._Power.loadLayout,
            isUnique: true
        };
        Component.power = {
            schematic: Component.makeMap(schematicMap, layoutMap),
            layout: Component.makeMap(layoutMap, schematicMap)
        };
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLXBvd2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdHlwZXNjcmlwdC9jaXJjdWl0L2NvbXBvbmVudC8tcG93ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU1BLElBQVUsT0FBTyxDQXVCaEI7QUF2QkQsV0FBVSxPQUFPO0lBQUMsSUFBQSxTQUFTLENBdUIxQjtJQXZCaUIsV0FBQSxTQUFTO1FBRXhCLE1BQU0sWUFBWSxHQUFHO1lBQ2xCLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFdBQVcsRUFBRSxXQUEwQjtZQUN2QyxRQUFRLEVBQUUsVUFBQSxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVM7WUFDbEMsSUFBSSxFQUFFLFVBQUEsTUFBTSxDQUFDLGFBQWE7WUFDMUIsSUFBSSxFQUFFLFVBQUEsTUFBTSxDQUFDLGFBQWE7U0FDNUIsQ0FBQTtRQUVELE1BQU0sU0FBUyxHQUFHO1lBQ2YsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixXQUFXLEVBQUUsUUFBb0I7WUFDakMsUUFBUSxFQUFFLFVBQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNO1lBQy9CLElBQUksRUFBRSxVQUFBLE1BQU0sQ0FBQyxVQUFVO1lBQ3ZCLElBQUksRUFBRSxVQUFBLE1BQU0sQ0FBQyxVQUFVO1lBQ3ZCLFFBQVEsRUFBRSxJQUFJO1NBQ2hCLENBQUE7UUFFWSxlQUFLLEdBQUc7WUFDbEIsU0FBUyxFQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQztZQUNyRCxNQUFNLEVBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDO1NBQ3BELENBQUE7SUFDSixDQUFDLEVBdkJpQixTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQXVCMUI7QUFBRCxDQUFDLEVBdkJTLE9BQU8sS0FBUCxPQUFPLFFBdUJoQiIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJfUG93ZXIvfmNsYXNzZXMudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiX1Bvd2VyLy1tYWtlU2NoZW1hdGljLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIl9Qb3dlci8tbG9hZFNjaGVtYXRpYy50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJfUG93ZXIvLW1ha2VMYXlvdXQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiX1Bvd2VyLy1sb2FkTGF5b3V0LnRzXCIgLz5cclxuXHJcbm5hbWVzcGFjZSBDaXJjdWl0LkNvbXBvbmVudCB7XHJcblxyXG4gICBjb25zdCBzY2hlbWF0aWNNYXAgPSB7XHJcbiAgICAgIHNhdmVuYW1lOiBcIm1ha2VQb3dlclwiLFxyXG4gICAgICBkaWFncmFtVHlwZTogXCJzY2hlbWF0aWNcIiBhcyBcInNjaGVtYXRpY1wiLFxyXG4gICAgICBpbnN0YW5jZTogX1Bvd2VyLkNsYXNzZXMuU2NoZW1hdGljLFxyXG4gICAgICBtYWtlOiBfUG93ZXIubWFrZVNjaGVtYXRpYyxcclxuICAgICAgbG9hZDogX1Bvd2VyLmxvYWRTY2hlbWF0aWMsXHJcbiAgIH1cclxuXHJcbiAgIGNvbnN0IGxheW91dE1hcCA9IHtcclxuICAgICAgc2F2ZW5hbWU6IFwibWFrZUxheW91dFBvd2VyXCIsXHJcbiAgICAgIGRpYWdyYW1UeXBlOiBcImxheW91dFwiIGFzIFwibGF5b3V0XCIsXHJcbiAgICAgIGluc3RhbmNlOiBfUG93ZXIuQ2xhc3Nlcy5MYXlvdXQsXHJcbiAgICAgIG1ha2U6IF9Qb3dlci5tYWtlTGF5b3V0LFxyXG4gICAgICBsb2FkOiBfUG93ZXIubG9hZExheW91dCxcclxuICAgICAgaXNVbmlxdWU6IHRydWVcclxuICAgfVxyXG5cclxuICAgZXhwb3J0IGNvbnN0IHBvd2VyID0ge1xyXG4gICAgICBzY2hlbWF0aWM6IENvbXBvbmVudC5tYWtlTWFwKHNjaGVtYXRpY01hcCwgbGF5b3V0TWFwKSxcclxuICAgICAgbGF5b3V0OiBDb21wb25lbnQubWFrZU1hcChsYXlvdXRNYXAsIHNjaGVtYXRpY01hcClcclxuICAgfVxyXG59Il19