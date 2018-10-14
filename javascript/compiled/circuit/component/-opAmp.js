"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        const schematicMap = {
            savename: "makeOpAmp",
            diagramType: "schematic",
            instance: Component._OpAmp.Classes.Schematic,
            make: Component._OpAmp.makeSchematic,
            load: Component._OpAmp.loadSchematic,
        };
        const layoutMap = {
            savename: "makeLayoutOpAmp",
            diagramType: "layout",
            instance: Component._OpAmp.Classes.Layout,
            make: Component._OpAmp.makeLayout,
            load: Component._OpAmp.loadLayout,
        };
        Component.opAmp = {
            schematic: Component.makeMap(schematicMap, layoutMap),
            layout: Component.makeMap(layoutMap, schematicMap)
        };
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLW9wQW1wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdHlwZXNjcmlwdC9jaXJjdWl0L2NvbXBvbmVudC8tb3BBbXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU1BLElBQVUsT0FBTyxDQXFCaEI7QUFyQkQsV0FBVSxPQUFPO0lBQUMsSUFBQSxTQUFTLENBcUIxQjtJQXJCaUIsV0FBQSxTQUFTO1FBQ3hCLE1BQU0sWUFBWSxHQUFHO1lBQ2xCLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFdBQVcsRUFBRSxXQUEwQjtZQUN2QyxRQUFRLEVBQUUsVUFBQSxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVM7WUFDbEMsSUFBSSxFQUFFLFVBQUEsTUFBTSxDQUFDLGFBQWE7WUFDMUIsSUFBSSxFQUFFLFVBQUEsTUFBTSxDQUFDLGFBQWE7U0FDNUIsQ0FBQTtRQUVELE1BQU0sU0FBUyxHQUFHO1lBQ2YsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixXQUFXLEVBQUUsUUFBb0I7WUFDakMsUUFBUSxFQUFFLFVBQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNO1lBQy9CLElBQUksRUFBRSxVQUFBLE1BQU0sQ0FBQyxVQUFVO1lBQ3ZCLElBQUksRUFBRSxVQUFBLE1BQU0sQ0FBQyxVQUFVO1NBQ3pCLENBQUE7UUFFWSxlQUFLLEdBQUc7WUFDbEIsU0FBUyxFQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQztZQUNyRCxNQUFNLEVBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDO1NBQ3BELENBQUE7SUFDSixDQUFDLEVBckJpQixTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQXFCMUI7QUFBRCxDQUFDLEVBckJTLE9BQU8sS0FBUCxPQUFPLFFBcUJoQiIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJfT3BBbXAvfmNsYXNzZXMudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiX09wQW1wLy1tYWtlU2NoZW1hdGljLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIl9PcEFtcC8tbG9hZFNjaGVtYXRpYy50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJfT3BBbXAvLW1ha2VMYXlvdXQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiX09wQW1wLy1sb2FkTGF5b3V0LnRzXCIgLz5cclxuXHJcbm5hbWVzcGFjZSBDaXJjdWl0LkNvbXBvbmVudCB7XHJcbiAgIGNvbnN0IHNjaGVtYXRpY01hcCA9IHtcclxuICAgICAgc2F2ZW5hbWU6IFwibWFrZU9wQW1wXCIsXHJcbiAgICAgIGRpYWdyYW1UeXBlOiBcInNjaGVtYXRpY1wiIGFzIFwic2NoZW1hdGljXCIsXHJcbiAgICAgIGluc3RhbmNlOiBfT3BBbXAuQ2xhc3Nlcy5TY2hlbWF0aWMsXHJcbiAgICAgIG1ha2U6IF9PcEFtcC5tYWtlU2NoZW1hdGljLFxyXG4gICAgICBsb2FkOiBfT3BBbXAubG9hZFNjaGVtYXRpYyxcclxuICAgfVxyXG5cclxuICAgY29uc3QgbGF5b3V0TWFwID0ge1xyXG4gICAgICBzYXZlbmFtZTogXCJtYWtlTGF5b3V0T3BBbXBcIixcclxuICAgICAgZGlhZ3JhbVR5cGU6IFwibGF5b3V0XCIgYXMgXCJsYXlvdXRcIixcclxuICAgICAgaW5zdGFuY2U6IF9PcEFtcC5DbGFzc2VzLkxheW91dCxcclxuICAgICAgbWFrZTogX09wQW1wLm1ha2VMYXlvdXQsXHJcbiAgICAgIGxvYWQ6IF9PcEFtcC5sb2FkTGF5b3V0LFxyXG4gICB9XHJcblxyXG4gICBleHBvcnQgY29uc3Qgb3BBbXAgPSB7XHJcbiAgICAgIHNjaGVtYXRpYzogQ29tcG9uZW50Lm1ha2VNYXAoc2NoZW1hdGljTWFwLCBsYXlvdXRNYXApLFxyXG4gICAgICBsYXlvdXQ6IENvbXBvbmVudC5tYWtlTWFwKGxheW91dE1hcCwgc2NoZW1hdGljTWFwKVxyXG4gICB9XHJcbn0iXX0=