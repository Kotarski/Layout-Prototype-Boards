"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Capacitor;
        (function (_Capacitor) {
            _Capacitor.loadSchematic = (raw) => {
                const name = (raw.name);
                const capacitance = (raw.capacitance || raw.value);
                const isPolarised = (raw.isPolarised || derivePolarisation(capacitance, raw.polarised));
                const orientations = ["LR", "RL", "UD", "DU"];
                const orientation = ValueCheck.validate(orientations, "LR")(raw.orientation);
                const where = ValueCheck.where({ x: 0, y: 0 })(raw.where);
                const joints = (raw.joints || deriveJoints(orientation, where));
                return _Capacitor.makeSchematic({ name, capacitance, isPolarised, joints });
            };
            const derivePolarisation = (capacitance, polarisation) => {
                const isPolarValid = ValueCheck.test(["polar", "non-polar"]);
                return isPolarValid(polarisation) ? polarisation === "polar" : (capacitance > 1e-6);
            };
            const deriveJoints = (orientation, where) => {
                const baseJoints = ({
                    LR: [{ x: -20, y: 0 }, { x: 20, y: 0 }],
                    UD: [{ x: 0, y: -20 }, { x: 0, y: 20 }],
                    RL: [{ x: 20, y: 0 }, { x: -20, y: 0 }],
                    DU: [{ x: 0, y: 20 }, { x: 0, y: -20 }]
                })[orientation];
                return vector(baseJoints).sumWith(where).vectors;
            };
        })(_Capacitor = Component._Capacitor || (Component._Capacitor = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLWxvYWRTY2hlbWF0aWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50L19jYXBhY2l0b3IvLWxvYWRTY2hlbWF0aWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVUsT0FBTyxDQTZCaEI7QUE3QkQsV0FBVSxPQUFPO0lBQUMsSUFBQSxTQUFTLENBNkIxQjtJQTdCaUIsV0FBQSxTQUFTO1FBQUMsSUFBQSxVQUFVLENBNkJyQztRQTdCMkIsV0FBQSxVQUFVO1lBQ3RCLHdCQUFhLEdBQW9ELENBQUMsR0FBUSxFQUFFLEVBQUU7Z0JBQ3hGLE1BQU0sSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN4QixNQUFNLFdBQVcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUVuRCxNQUFNLFdBQVcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLElBQUksa0JBQWtCLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUV4RixNQUFNLFlBQVksR0FBNkIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDeEUsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUM3RSxNQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzFELE1BQU0sTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxZQUFZLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBRWhFLE9BQU8sV0FBQSxhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ3BFLENBQUMsQ0FBQTtZQUVELE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxXQUFtQixFQUFFLFlBQW9DLEVBQUUsRUFBRTtnQkFDdEYsTUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBd0IsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDcEYsT0FBTyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ3ZGLENBQUMsQ0FBQTtZQUVELE1BQU0sWUFBWSxHQUFHLENBQUMsV0FBc0MsRUFBRSxLQUFhLEVBQUUsRUFBRTtnQkFDNUUsTUFBTSxVQUFVLEdBQUcsQ0FBQztvQkFDakIsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0JBQ3ZDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO29CQUN2QyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztvQkFDdkMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7aUJBQ3pDLENBQUMsQ0FBQyxXQUFXLENBQXFCLENBQUM7Z0JBQ3BDLE9BQU8sTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDcEQsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxFQTdCMkIsVUFBVSxHQUFWLG9CQUFVLEtBQVYsb0JBQVUsUUE2QnJDO0lBQUQsQ0FBQyxFQTdCaUIsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUE2QjFCO0FBQUQsQ0FBQyxFQTdCUyxPQUFPLEtBQVAsT0FBTyxRQTZCaEIiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgQ2lyY3VpdC5Db21wb25lbnQuX0NhcGFjaXRvciB7XHJcbiAgIGV4cG9ydCBjb25zdCBsb2FkU2NoZW1hdGljOiBDb21wb25lbnQuVHlwZXMubG9hZEZ1bmN0aW9uPENsYXNzZXMuU2NoZW1hdGljPiA9IChyYXc6IGFueSkgPT4ge1xyXG4gICAgICBjb25zdCBuYW1lID0gKHJhdy5uYW1lKTtcclxuICAgICAgY29uc3QgY2FwYWNpdGFuY2UgPSAocmF3LmNhcGFjaXRhbmNlIHx8IHJhdy52YWx1ZSk7XHJcbiAgICAgIC8vUG9sYXJpc2F0aW9uIEJsb2NrXHJcbiAgICAgIGNvbnN0IGlzUG9sYXJpc2VkID0gKHJhdy5pc1BvbGFyaXNlZCB8fCBkZXJpdmVQb2xhcmlzYXRpb24oY2FwYWNpdGFuY2UsIHJhdy5wb2xhcmlzZWQpKTtcclxuICAgICAgLy9Kb2ludHMgQmxvY2tcclxuICAgICAgY29uc3Qgb3JpZW50YXRpb25zOiBbXCJMUlwiLCBcIlJMXCIsIFwiVURcIiwgXCJEVVwiXSA9IFtcIkxSXCIsIFwiUkxcIiwgXCJVRFwiLCBcIkRVXCJdO1xyXG4gICAgICBjb25zdCBvcmllbnRhdGlvbiA9IFZhbHVlQ2hlY2sudmFsaWRhdGUob3JpZW50YXRpb25zLCBcIkxSXCIpKHJhdy5vcmllbnRhdGlvbik7XHJcbiAgICAgIGNvbnN0IHdoZXJlID0gVmFsdWVDaGVjay53aGVyZSh7IHg6IDAsIHk6IDAgfSkocmF3LndoZXJlKTtcclxuICAgICAgY29uc3Qgam9pbnRzID0gKHJhdy5qb2ludHMgfHwgZGVyaXZlSm9pbnRzKG9yaWVudGF0aW9uLCB3aGVyZSkpO1xyXG5cclxuICAgICAgcmV0dXJuIG1ha2VTY2hlbWF0aWMoeyBuYW1lLCBjYXBhY2l0YW5jZSwgaXNQb2xhcmlzZWQsIGpvaW50cyB9KTtcclxuICAgfVxyXG5cclxuICAgY29uc3QgZGVyaXZlUG9sYXJpc2F0aW9uID0gKGNhcGFjaXRhbmNlOiBudW1iZXIsIHBvbGFyaXNhdGlvbj86IFwicG9sYXJcIiB8IFwibm9uLXBvbGFyXCIpID0+IHtcclxuICAgICAgY29uc3QgaXNQb2xhclZhbGlkID0gVmFsdWVDaGVjay50ZXN0PFwicG9sYXJcIiB8IFwibm9uLXBvbGFyXCI+KFtcInBvbGFyXCIsIFwibm9uLXBvbGFyXCJdKTtcclxuICAgICAgcmV0dXJuIGlzUG9sYXJWYWxpZChwb2xhcmlzYXRpb24pID8gcG9sYXJpc2F0aW9uID09PSBcInBvbGFyXCIgOiAoY2FwYWNpdGFuY2UgPiAxZS02KTtcclxuICAgfVxyXG5cclxuICAgY29uc3QgZGVyaXZlSm9pbnRzID0gKG9yaWVudGF0aW9uOiBcIkxSXCIgfCBcIlJMXCIgfCBcIlVEXCIgfCBcIkRVXCIsIHdoZXJlOiBWZWN0b3IpID0+IHtcclxuICAgICAgY29uc3QgYmFzZUpvaW50cyA9ICh7XHJcbiAgICAgICAgIExSOiBbeyB4OiAtMjAsIHk6IDAgfSwgeyB4OiAyMCwgeTogMCB9XSxcclxuICAgICAgICAgVUQ6IFt7IHg6IDAsIHk6IC0yMCB9LCB7IHg6IDAsIHk6IDIwIH1dLFxyXG4gICAgICAgICBSTDogW3sgeDogMjAsIHk6IDAgfSwgeyB4OiAtMjAsIHk6IDAgfV0sXHJcbiAgICAgICAgIERVOiBbeyB4OiAwLCB5OiAyMCB9LCB7IHg6IDAsIHk6IC0yMCB9XVxyXG4gICAgICB9KVtvcmllbnRhdGlvbl0gYXMgW1ZlY3RvciwgVmVjdG9yXTtcclxuICAgICAgcmV0dXJuIHZlY3RvcihiYXNlSm9pbnRzKS5zdW1XaXRoKHdoZXJlKS52ZWN0b3JzO1xyXG4gICB9XHJcbn0iXX0=