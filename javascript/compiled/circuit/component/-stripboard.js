"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        const layoutMap = {
            savename: "makeLayoutStripboard",
            diagramType: "layout",
            instance: Component._Stripboard.Classes.Layout,
            make: Component._Stripboard.makeLayout,
            load: Component._Stripboard.loadLayout,
            isBoard: true
        };
        Component.stripboard = {
            layout: Component.makeMap(layoutMap),
        };
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLXN0cmlwYm9hcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50Ly1zdHJpcGJvYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFJQSxJQUFVLE9BQU8sQ0FjaEI7QUFkRCxXQUFVLE9BQU87SUFBQyxJQUFBLFNBQVMsQ0FjMUI7SUFkaUIsV0FBQSxTQUFTO1FBRXhCLE1BQU0sU0FBUyxHQUFHO1lBQ2YsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyxXQUFXLEVBQUUsUUFBb0I7WUFDakMsUUFBUSxFQUFFLFVBQUEsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNO1lBQ3BDLElBQUksRUFBRSxVQUFBLFdBQVcsQ0FBQyxVQUFVO1lBQzVCLElBQUksRUFBRSxVQUFBLFdBQVcsQ0FBQyxVQUFVO1lBQzVCLE9BQU8sRUFBRSxJQUFJO1NBQ2YsQ0FBQTtRQUVZLG9CQUFVLEdBQUc7WUFDdkIsTUFBTSxFQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1NBQ3RDLENBQUE7SUFDSixDQUFDLEVBZGlCLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBYzFCO0FBQUQsQ0FBQyxFQWRTLE9BQU8sS0FBUCxPQUFPLFFBY2hCIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIl9TdHJpcGJvYXJkL35jbGFzc2VzLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIl9TdHJpcGJvYXJkLy1tYWtlTGF5b3V0LnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIl9TdHJpcGJvYXJkLy1sb2FkTGF5b3V0LnRzXCIgLz5cclxuXHJcbm5hbWVzcGFjZSBDaXJjdWl0LkNvbXBvbmVudCB7XHJcblxyXG4gICBjb25zdCBsYXlvdXRNYXAgPSB7XHJcbiAgICAgIHNhdmVuYW1lOiBcIm1ha2VMYXlvdXRTdHJpcGJvYXJkXCIsXHJcbiAgICAgIGRpYWdyYW1UeXBlOiBcImxheW91dFwiIGFzIFwibGF5b3V0XCIsXHJcbiAgICAgIGluc3RhbmNlOiBfU3RyaXBib2FyZC5DbGFzc2VzLkxheW91dCxcclxuICAgICAgbWFrZTogX1N0cmlwYm9hcmQubWFrZUxheW91dCxcclxuICAgICAgbG9hZDogX1N0cmlwYm9hcmQubG9hZExheW91dCxcclxuICAgICAgaXNCb2FyZDogdHJ1ZVxyXG4gICB9XHJcblxyXG4gICBleHBvcnQgY29uc3Qgc3RyaXBib2FyZCA9IHtcclxuICAgICAgbGF5b3V0OiBDb21wb25lbnQubWFrZU1hcChsYXlvdXRNYXApLFxyXG4gICB9XHJcbn0iXX0=