"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        const smallMap = {
            savename: "makeLayoutBreadboardSmall",
            diagramType: "layout",
            instance: Component._Breadboard.Classes.Small,
            make: Component._Breadboard.makeSmall,
            load: Component._Breadboard.loadSmall,
            isBoard: true
        };
        const largeMap = {
            savename: "makeLayoutBreadboardLarge",
            diagramType: "layout",
            instance: Component._Breadboard.Classes.Large,
            make: Component._Breadboard.makeLarge,
            load: Component._Breadboard.loadLarge,
            isBoard: true
        };
        Component.breadboard = {
            layoutSmall: Component.makeMap(smallMap),
            layoutLarge: Component.makeMap(largeMap)
        };
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLWJyZWFkYm9hcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50Ly1icmVhZGJvYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFNQSxJQUFVLE9BQU8sQ0F3QmhCO0FBeEJELFdBQVUsT0FBTztJQUFDLElBQUEsU0FBUyxDQXdCMUI7SUF4QmlCLFdBQUEsU0FBUztRQUN4QixNQUFNLFFBQVEsR0FBRztZQUNkLFFBQVEsRUFBRSwyQkFBMkI7WUFDckMsV0FBVyxFQUFFLFFBQW9CO1lBQ2pDLFFBQVEsRUFBRSxVQUFBLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSztZQUNuQyxJQUFJLEVBQUUsVUFBQSxXQUFXLENBQUMsU0FBUztZQUMzQixJQUFJLEVBQUUsVUFBQSxXQUFXLENBQUMsU0FBUztZQUMzQixPQUFPLEVBQUUsSUFBSTtTQUNmLENBQUE7UUFFRCxNQUFNLFFBQVEsR0FBRztZQUNkLFFBQVEsRUFBRSwyQkFBMkI7WUFDckMsV0FBVyxFQUFFLFFBQW9CO1lBQ2pDLFFBQVEsRUFBRSxVQUFBLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSztZQUNuQyxJQUFJLEVBQUUsVUFBQSxXQUFXLENBQUMsU0FBUztZQUMzQixJQUFJLEVBQUUsVUFBQSxXQUFXLENBQUMsU0FBUztZQUMzQixPQUFPLEVBQUUsSUFBSTtTQUNmLENBQUE7UUFHWSxvQkFBVSxHQUFHO1lBQ3ZCLFdBQVcsRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztZQUN4QyxXQUFXLEVBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7U0FDMUMsQ0FBQTtJQUNKLENBQUMsRUF4QmlCLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBd0IxQjtBQUFELENBQUMsRUF4QlMsT0FBTyxLQUFQLE9BQU8sUUF3QmhCIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIl9CcmVhZGJvYXJkL35jbGFzc2VzLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIl9CcmVhZGJvYXJkLy1tYWtlU21hbGwudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiX0JyZWFkYm9hcmQvLWxvYWRTbWFsbC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJfQnJlYWRib2FyZC8tbWFrZUxhcmdlLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIl9CcmVhZGJvYXJkLy1sb2FkTGFyZ2UudHNcIiAvPlxyXG5cclxubmFtZXNwYWNlIENpcmN1aXQuQ29tcG9uZW50IHtcclxuICAgY29uc3Qgc21hbGxNYXAgPSB7XHJcbiAgICAgIHNhdmVuYW1lOiBcIm1ha2VMYXlvdXRCcmVhZGJvYXJkU21hbGxcIixcclxuICAgICAgZGlhZ3JhbVR5cGU6IFwibGF5b3V0XCIgYXMgXCJsYXlvdXRcIixcclxuICAgICAgaW5zdGFuY2U6IF9CcmVhZGJvYXJkLkNsYXNzZXMuU21hbGwsXHJcbiAgICAgIG1ha2U6IF9CcmVhZGJvYXJkLm1ha2VTbWFsbCxcclxuICAgICAgbG9hZDogX0JyZWFkYm9hcmQubG9hZFNtYWxsLFxyXG4gICAgICBpc0JvYXJkOiB0cnVlXHJcbiAgIH1cclxuXHJcbiAgIGNvbnN0IGxhcmdlTWFwID0ge1xyXG4gICAgICBzYXZlbmFtZTogXCJtYWtlTGF5b3V0QnJlYWRib2FyZExhcmdlXCIsXHJcbiAgICAgIGRpYWdyYW1UeXBlOiBcImxheW91dFwiIGFzIFwibGF5b3V0XCIsXHJcbiAgICAgIGluc3RhbmNlOiBfQnJlYWRib2FyZC5DbGFzc2VzLkxhcmdlLFxyXG4gICAgICBtYWtlOiBfQnJlYWRib2FyZC5tYWtlTGFyZ2UsXHJcbiAgICAgIGxvYWQ6IF9CcmVhZGJvYXJkLmxvYWRMYXJnZSxcclxuICAgICAgaXNCb2FyZDogdHJ1ZVxyXG4gICB9XHJcblxyXG5cclxuICAgZXhwb3J0IGNvbnN0IGJyZWFkYm9hcmQgPSB7XHJcbiAgICAgIGxheW91dFNtYWxsOiBDb21wb25lbnQubWFrZU1hcChzbWFsbE1hcCksXHJcbiAgICAgIGxheW91dExhcmdlOiBDb21wb25lbnQubWFrZU1hcChsYXJnZU1hcClcclxuICAgfVxyXG59Il19