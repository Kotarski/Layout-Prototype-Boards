"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Diode;
        (function (_Diode) {
            _Diode.loadLayout = (raw) => {
                const name = (raw.name);
                const breakdownVoltage = (raw.breakdownVoltage);
                const saturationCurrent = (raw.saturationCurrent);
                const color = (raw.color);
                const joints = (raw.joints);
                return _Diode.makeLayout({ name, breakdownVoltage, saturationCurrent, color, joints });
            };
        })(_Diode = Component._Diode || (Component._Diode = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLWxvYWRMYXlvdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50L19EaW9kZS8tbG9hZExheW91dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxPQUFPLENBVWhCO0FBVkQsV0FBVSxPQUFPO0lBQUMsSUFBQSxTQUFTLENBVTFCO0lBVmlCLFdBQUEsU0FBUztRQUFDLElBQUEsTUFBTSxDQVVqQztRQVYyQixXQUFBLE1BQU07WUFDbEIsaUJBQVUsR0FBaUQsQ0FBQyxHQUFRLEVBQUUsRUFBRTtnQkFDbEYsTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hCLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDaEQsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUNsRCxNQUFNLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDMUIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRTVCLE9BQU8sT0FBQSxVQUFVLENBQUMsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDbkYsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxFQVYyQixNQUFNLEdBQU4sZ0JBQU0sS0FBTixnQkFBTSxRQVVqQztJQUFELENBQUMsRUFWaUIsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFVMUI7QUFBRCxDQUFDLEVBVlMsT0FBTyxLQUFQLE9BQU8sUUFVaEIiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgQ2lyY3VpdC5Db21wb25lbnQuX0Rpb2RlIHtcclxuICAgZXhwb3J0IGNvbnN0IGxvYWRMYXlvdXQ6IENvbXBvbmVudC5UeXBlcy5sb2FkRnVuY3Rpb248Q2xhc3Nlcy5MYXlvdXQ+ID0gKHJhdzogYW55KSA9PiB7XHJcbiAgICAgIGNvbnN0IG5hbWUgPSAocmF3Lm5hbWUpO1xyXG4gICAgICBjb25zdCBicmVha2Rvd25Wb2x0YWdlID0gKHJhdy5icmVha2Rvd25Wb2x0YWdlKTtcclxuICAgICAgY29uc3Qgc2F0dXJhdGlvbkN1cnJlbnQgPSAocmF3LnNhdHVyYXRpb25DdXJyZW50KTtcclxuICAgICAgY29uc3QgY29sb3IgPSAocmF3LmNvbG9yKTtcclxuICAgICAgY29uc3Qgam9pbnRzID0gKHJhdy5qb2ludHMpO1xyXG5cclxuICAgICAgcmV0dXJuIG1ha2VMYXlvdXQoeyBuYW1lLCBicmVha2Rvd25Wb2x0YWdlLCBzYXR1cmF0aW9uQ3VycmVudCwgY29sb3IsIGpvaW50cyB9KTtcclxuICAgfVxyXG59Il19