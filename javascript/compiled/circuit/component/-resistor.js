"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        const schematicMap = {
            savename: "makeResistor",
            diagramType: "schematic",
            instance: Component._Resistor.Classes.Schematic,
            make: Component._Resistor.makeSchematic,
            load: Component._Resistor.loadSchematic,
        };
        const layoutMap = {
            savename: "makeLayoutResistor",
            diagramType: "layout",
            instance: Component._Resistor.Classes.Layout,
            make: Component._Resistor.makeLayout,
            load: Component._Resistor.loadLayout,
        };
        Component.resistor = {
            schematic: Component.makeMap(schematicMap, layoutMap),
            layout: Component.makeMap(layoutMap, schematicMap)
        };
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLXJlc2lzdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdHlwZXNjcmlwdC9jaXJjdWl0L2NvbXBvbmVudC8tcmVzaXN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU1BLElBQVUsT0FBTyxDQXFCaEI7QUFyQkQsV0FBVSxPQUFPO0lBQUMsSUFBQSxTQUFTLENBcUIxQjtJQXJCaUIsV0FBQSxTQUFTO1FBQ3hCLE1BQU0sWUFBWSxHQUFHO1lBQ2xCLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFdBQVcsRUFBRSxXQUEwQjtZQUN2QyxRQUFRLEVBQUUsVUFBQSxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVM7WUFDckMsSUFBSSxFQUFFLFVBQUEsU0FBUyxDQUFDLGFBQWE7WUFDN0IsSUFBSSxFQUFFLFVBQUEsU0FBUyxDQUFDLGFBQWE7U0FDL0IsQ0FBQTtRQUVELE1BQU0sU0FBUyxHQUFHO1lBQ2YsUUFBUSxFQUFFLG9CQUFvQjtZQUM5QixXQUFXLEVBQUUsUUFBb0I7WUFDakMsUUFBUSxFQUFFLFVBQUEsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNO1lBQ2xDLElBQUksRUFBRSxVQUFBLFNBQVMsQ0FBQyxVQUFVO1lBQzFCLElBQUksRUFBRSxVQUFBLFNBQVMsQ0FBQyxVQUFVO1NBQzVCLENBQUE7UUFFWSxrQkFBUSxHQUFHO1lBQ3JCLFNBQVMsRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUM7WUFDckQsTUFBTSxFQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQztTQUNwRCxDQUFBO0lBQ0osQ0FBQyxFQXJCaUIsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFxQjFCO0FBQUQsQ0FBQyxFQXJCUyxPQUFPLEtBQVAsT0FBTyxRQXFCaEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiX1Jlc2lzdG9yL35jbGFzc2VzLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIl9SZXNpc3Rvci8tbWFrZVNjaGVtYXRpYy50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJfUmVzaXN0b3IvLWxvYWRTY2hlbWF0aWMudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiX1Jlc2lzdG9yLy1tYWtlTGF5b3V0LnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIl9SZXNpc3Rvci8tbG9hZExheW91dC50c1wiIC8+XHJcblxyXG5uYW1lc3BhY2UgQ2lyY3VpdC5Db21wb25lbnQge1xyXG4gICBjb25zdCBzY2hlbWF0aWNNYXAgPSB7XHJcbiAgICAgIHNhdmVuYW1lOiBcIm1ha2VSZXNpc3RvclwiLFxyXG4gICAgICBkaWFncmFtVHlwZTogXCJzY2hlbWF0aWNcIiBhcyBcInNjaGVtYXRpY1wiLFxyXG4gICAgICBpbnN0YW5jZTogX1Jlc2lzdG9yLkNsYXNzZXMuU2NoZW1hdGljLFxyXG4gICAgICBtYWtlOiBfUmVzaXN0b3IubWFrZVNjaGVtYXRpYyxcclxuICAgICAgbG9hZDogX1Jlc2lzdG9yLmxvYWRTY2hlbWF0aWMsXHJcbiAgIH1cclxuXHJcbiAgIGNvbnN0IGxheW91dE1hcCA9IHtcclxuICAgICAgc2F2ZW5hbWU6IFwibWFrZUxheW91dFJlc2lzdG9yXCIsXHJcbiAgICAgIGRpYWdyYW1UeXBlOiBcImxheW91dFwiIGFzIFwibGF5b3V0XCIsXHJcbiAgICAgIGluc3RhbmNlOiBfUmVzaXN0b3IuQ2xhc3Nlcy5MYXlvdXQsXHJcbiAgICAgIG1ha2U6IF9SZXNpc3Rvci5tYWtlTGF5b3V0LFxyXG4gICAgICBsb2FkOiBfUmVzaXN0b3IubG9hZExheW91dCxcclxuICAgfVxyXG5cclxuICAgZXhwb3J0IGNvbnN0IHJlc2lzdG9yID0ge1xyXG4gICAgICBzY2hlbWF0aWM6IENvbXBvbmVudC5tYWtlTWFwKHNjaGVtYXRpY01hcCwgbGF5b3V0TWFwKSxcclxuICAgICAgbGF5b3V0OiBDb21wb25lbnQubWFrZU1hcChsYXlvdXRNYXAsIHNjaGVtYXRpY01hcClcclxuICAgfVxyXG59Il19