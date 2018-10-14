"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Wire;
        (function (_Wire) {
            _Wire.loadSchematic = (raw) => {
                const name = (raw.name);
                const joints = (raw.joints);
                return _Wire.makeSchematic({ name, joints });
            };
        })(_Wire = Component._Wire || (Component._Wire = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLWxvYWRTY2hlbWF0aWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50L19XaXJlLy1sb2FkU2NoZW1hdGljLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE9BQU8sQ0FRaEI7QUFSRCxXQUFVLE9BQU87SUFBQyxJQUFBLFNBQVMsQ0FRMUI7SUFSaUIsV0FBQSxTQUFTO1FBQUMsSUFBQSxLQUFLLENBUWhDO1FBUjJCLFdBQUEsS0FBSztZQUNqQixtQkFBYSxHQUFvRCxDQUFDLEdBQVEsRUFBRSxFQUFFO2dCQUN4RixNQUFNLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFeEIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRTVCLE9BQU8sTUFBQSxhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUMxQyxDQUFDLENBQUE7UUFDSixDQUFDLEVBUjJCLEtBQUssR0FBTCxlQUFLLEtBQUwsZUFBSyxRQVFoQztJQUFELENBQUMsRUFSaUIsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFRMUI7QUFBRCxDQUFDLEVBUlMsT0FBTyxLQUFQLE9BQU8sUUFRaEIiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgQ2lyY3VpdC5Db21wb25lbnQuX1dpcmUge1xyXG4gICBleHBvcnQgY29uc3QgbG9hZFNjaGVtYXRpYzogQ29tcG9uZW50LlR5cGVzLmxvYWRGdW5jdGlvbjxDbGFzc2VzLlNjaGVtYXRpYz4gPSAocmF3OiBhbnkpID0+IHtcclxuICAgICAgY29uc3QgbmFtZSA9IChyYXcubmFtZSk7XHJcbiAgICAgIC8vSm9pbnRzIEJsb2NrXHJcbiAgICAgIGNvbnN0IGpvaW50cyA9IChyYXcuam9pbnRzKTtcclxuXHJcbiAgICAgIHJldHVybiBtYWtlU2NoZW1hdGljKHsgbmFtZSwgam9pbnRzIH0pO1xyXG4gICB9XHJcbn0iXX0=