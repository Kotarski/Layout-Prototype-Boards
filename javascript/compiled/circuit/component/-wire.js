"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        const schematicMap = {
            savename: "makeWire",
            diagramType: "schematic",
            instance: Component._Wire.Classes.Schematic,
            make: Component._Wire.makeSchematic,
            load: Component._Wire.loadSchematic
        };
        const layoutMap = {
            savename: "makeLayoutWire",
            diagramType: "layout",
            instance: Component._Wire.Classes.Layout,
            make: Component._Wire.makeLayout,
            load: Component._Wire.loadLayout
        };
        Component.wire = {
            schematic: Component.makeMap(schematicMap),
            layout: Component.makeMap(layoutMap)
        };
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLXdpcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50Ly13aXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFNQSxJQUFVLE9BQU8sQ0FxQmhCO0FBckJELFdBQVUsT0FBTztJQUFDLElBQUEsU0FBUyxDQXFCMUI7SUFyQmlCLFdBQUEsU0FBUztRQUN4QixNQUFNLFlBQVksR0FBRztZQUNsQixRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsV0FBMEI7WUFDdkMsUUFBUSxFQUFFLFVBQUEsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTO1lBQ2pDLElBQUksRUFBRSxVQUFBLEtBQUssQ0FBQyxhQUFhO1lBQ3pCLElBQUksRUFBRSxVQUFBLEtBQUssQ0FBQyxhQUFhO1NBQzNCLENBQUE7UUFFRCxNQUFNLFNBQVMsR0FBRztZQUNmLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsV0FBVyxFQUFFLFFBQW9CO1lBQ2pDLFFBQVEsRUFBRSxVQUFBLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTTtZQUM5QixJQUFJLEVBQUUsVUFBQSxLQUFLLENBQUMsVUFBVTtZQUN0QixJQUFJLEVBQUUsVUFBQSxLQUFLLENBQUMsVUFBVTtTQUN4QixDQUFBO1FBRVksY0FBSSxHQUFHO1lBQ2pCLFNBQVMsRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztZQUMxQyxNQUFNLEVBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7U0FDdEMsQ0FBQTtJQUNKLENBQUMsRUFyQmlCLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBcUIxQjtBQUFELENBQUMsRUFyQlMsT0FBTyxLQUFQLE9BQU8sUUFxQmhCIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIl9XaXJlL35jbGFzc2VzLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIl9XaXJlLy1tYWtlU2NoZW1hdGljLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIl9XaXJlLy1sb2FkU2NoZW1hdGljLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIl9XaXJlLy1tYWtlTGF5b3V0LnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIl9XaXJlLy1sb2FkTGF5b3V0LnRzXCIgLz5cclxuXHJcbm5hbWVzcGFjZSBDaXJjdWl0LkNvbXBvbmVudCB7XHJcbiAgIGNvbnN0IHNjaGVtYXRpY01hcCA9IHtcclxuICAgICAgc2F2ZW5hbWU6IFwibWFrZVdpcmVcIixcclxuICAgICAgZGlhZ3JhbVR5cGU6IFwic2NoZW1hdGljXCIgYXMgXCJzY2hlbWF0aWNcIixcclxuICAgICAgaW5zdGFuY2U6IF9XaXJlLkNsYXNzZXMuU2NoZW1hdGljLFxyXG4gICAgICBtYWtlOiBfV2lyZS5tYWtlU2NoZW1hdGljLFxyXG4gICAgICBsb2FkOiBfV2lyZS5sb2FkU2NoZW1hdGljXHJcbiAgIH1cclxuXHJcbiAgIGNvbnN0IGxheW91dE1hcCA9IHtcclxuICAgICAgc2F2ZW5hbWU6IFwibWFrZUxheW91dFdpcmVcIixcclxuICAgICAgZGlhZ3JhbVR5cGU6IFwibGF5b3V0XCIgYXMgXCJsYXlvdXRcIixcclxuICAgICAgaW5zdGFuY2U6IF9XaXJlLkNsYXNzZXMuTGF5b3V0LFxyXG4gICAgICBtYWtlOiBfV2lyZS5tYWtlTGF5b3V0LFxyXG4gICAgICBsb2FkOiBfV2lyZS5sb2FkTGF5b3V0XHJcbiAgIH1cclxuXHJcbiAgIGV4cG9ydCBjb25zdCB3aXJlID0ge1xyXG4gICAgICBzY2hlbWF0aWM6IENvbXBvbmVudC5tYWtlTWFwKHNjaGVtYXRpY01hcCksXHJcbiAgICAgIGxheW91dDogQ29tcG9uZW50Lm1ha2VNYXAobGF5b3V0TWFwKVxyXG4gICB9XHJcbn0iXX0=