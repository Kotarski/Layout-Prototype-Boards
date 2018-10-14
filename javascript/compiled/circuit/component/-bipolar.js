"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        const schematicMap = {
            savename: "makeBipolar",
            diagramType: "schematic",
            instance: Component._Bipolar.Classes.Schematic,
            make: Component._Bipolar.makeSchematic,
            load: Component._Bipolar.loadSchematic,
        };
        const layoutMap = {
            savename: "makeLayoutBipolar",
            diagramType: "layout",
            instance: Component._Bipolar.Classes.Layout,
            make: Component._Bipolar.makeLayout,
            load: Component._Bipolar.loadLayout,
        };
        Component.bipolar = {
            schematic: Component.makeMap(schematicMap, layoutMap),
            layout: Component.makeMap(layoutMap, schematicMap)
        };
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLWJpcG9sYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50Ly1iaXBvbGFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFNQSxJQUFVLE9BQU8sQ0FxQmhCO0FBckJELFdBQVUsT0FBTztJQUFDLElBQUEsU0FBUyxDQXFCMUI7SUFyQmlCLFdBQUEsU0FBUztRQUN4QixNQUFNLFlBQVksR0FBRztZQUNsQixRQUFRLEVBQUUsYUFBYTtZQUN2QixXQUFXLEVBQUUsV0FBMEI7WUFDdkMsUUFBUSxFQUFFLFVBQUEsUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTO1lBQ3BDLElBQUksRUFBRSxVQUFBLFFBQVEsQ0FBQyxhQUFhO1lBQzVCLElBQUksRUFBRSxVQUFBLFFBQVEsQ0FBQyxhQUFhO1NBQzlCLENBQUE7UUFFRCxNQUFNLFNBQVMsR0FBRztZQUNmLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsV0FBVyxFQUFFLFFBQW9CO1lBQ2pDLFFBQVEsRUFBRSxVQUFBLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTTtZQUNqQyxJQUFJLEVBQUUsVUFBQSxRQUFRLENBQUMsVUFBVTtZQUN6QixJQUFJLEVBQUUsVUFBQSxRQUFRLENBQUMsVUFBVTtTQUMzQixDQUFBO1FBRVksaUJBQU8sR0FBRztZQUNwQixTQUFTLEVBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDO1lBQ3JELE1BQU0sRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUM7U0FDcEQsQ0FBQTtJQUNKLENBQUMsRUFyQmlCLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBcUIxQjtBQUFELENBQUMsRUFyQlMsT0FBTyxLQUFQLE9BQU8sUUFxQmhCIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIl9CaXBvbGFyL35jbGFzc2VzLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIl9CaXBvbGFyLy1tYWtlU2NoZW1hdGljLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIl9CaXBvbGFyLy1sb2FkU2NoZW1hdGljLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIl9CaXBvbGFyLy1tYWtlTGF5b3V0LnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIl9CaXBvbGFyLy1sb2FkTGF5b3V0LnRzXCIgLz5cclxuXHJcbm5hbWVzcGFjZSBDaXJjdWl0LkNvbXBvbmVudCB7XHJcbiAgIGNvbnN0IHNjaGVtYXRpY01hcCA9IHtcclxuICAgICAgc2F2ZW5hbWU6IFwibWFrZUJpcG9sYXJcIixcclxuICAgICAgZGlhZ3JhbVR5cGU6IFwic2NoZW1hdGljXCIgYXMgXCJzY2hlbWF0aWNcIixcclxuICAgICAgaW5zdGFuY2U6IF9CaXBvbGFyLkNsYXNzZXMuU2NoZW1hdGljLFxyXG4gICAgICBtYWtlOiBfQmlwb2xhci5tYWtlU2NoZW1hdGljLFxyXG4gICAgICBsb2FkOiBfQmlwb2xhci5sb2FkU2NoZW1hdGljLFxyXG4gICB9XHJcblxyXG4gICBjb25zdCBsYXlvdXRNYXAgPSB7XHJcbiAgICAgIHNhdmVuYW1lOiBcIm1ha2VMYXlvdXRCaXBvbGFyXCIsXHJcbiAgICAgIGRpYWdyYW1UeXBlOiBcImxheW91dFwiIGFzIFwibGF5b3V0XCIsXHJcbiAgICAgIGluc3RhbmNlOiBfQmlwb2xhci5DbGFzc2VzLkxheW91dCxcclxuICAgICAgbWFrZTogX0JpcG9sYXIubWFrZUxheW91dCxcclxuICAgICAgbG9hZDogX0JpcG9sYXIubG9hZExheW91dCxcclxuICAgfVxyXG5cclxuICAgZXhwb3J0IGNvbnN0IGJpcG9sYXIgPSB7XHJcbiAgICAgIHNjaGVtYXRpYzogQ29tcG9uZW50Lm1ha2VNYXAoc2NoZW1hdGljTWFwLCBsYXlvdXRNYXApLFxyXG4gICAgICBsYXlvdXQ6IENvbXBvbmVudC5tYWtlTWFwKGxheW91dE1hcCwgc2NoZW1hdGljTWFwKVxyXG4gICB9XHJcbn0iXX0=