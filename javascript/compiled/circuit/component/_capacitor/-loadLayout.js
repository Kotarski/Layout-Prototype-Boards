"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Capacitor;
        (function (_Capacitor) {
            _Capacitor.loadLayout = (raw) => {
                const name = (raw.name);
                const capacitance = (raw.capacitance);
                const isPolarised = (raw.isPolarised);
                const joints = (raw.joints);
                return _Capacitor.makeLayout({ name, capacitance, isPolarised, joints });
            };
        })(_Capacitor = Component._Capacitor || (Component._Capacitor = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLWxvYWRMYXlvdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50L19jYXBhY2l0b3IvLWxvYWRMYXlvdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVUsT0FBTyxDQVNoQjtBQVRELFdBQVUsT0FBTztJQUFDLElBQUEsU0FBUyxDQVMxQjtJQVRpQixXQUFBLFNBQVM7UUFBQyxJQUFBLFVBQVUsQ0FTckM7UUFUMkIsV0FBQSxVQUFVO1lBQ3RCLHFCQUFVLEdBQWlELENBQUMsR0FBUSxFQUFFLEVBQUU7Z0JBQ2xGLE1BQU0sSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN4QixNQUFNLFdBQVcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDdEMsTUFBTSxXQUFXLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3RDLE1BQU0sTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUU1QixPQUFPLFdBQUEsVUFBVSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUNqRSxDQUFDLENBQUE7UUFDSixDQUFDLEVBVDJCLFVBQVUsR0FBVixvQkFBVSxLQUFWLG9CQUFVLFFBU3JDO0lBQUQsQ0FBQyxFQVRpQixTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQVMxQjtBQUFELENBQUMsRUFUUyxPQUFPLEtBQVAsT0FBTyxRQVNoQiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBDaXJjdWl0LkNvbXBvbmVudC5fQ2FwYWNpdG9yIHtcclxuICAgZXhwb3J0IGNvbnN0IGxvYWRMYXlvdXQ6IENvbXBvbmVudC5UeXBlcy5sb2FkRnVuY3Rpb248Q2xhc3Nlcy5MYXlvdXQ+ID0gKHJhdzogYW55KSA9PiB7XHJcbiAgICAgIGNvbnN0IG5hbWUgPSAocmF3Lm5hbWUpO1xyXG4gICAgICBjb25zdCBjYXBhY2l0YW5jZSA9IChyYXcuY2FwYWNpdGFuY2UpO1xyXG4gICAgICBjb25zdCBpc1BvbGFyaXNlZCA9IChyYXcuaXNQb2xhcmlzZWQpO1xyXG4gICAgICBjb25zdCBqb2ludHMgPSAocmF3LmpvaW50cyk7XHJcblxyXG4gICAgICByZXR1cm4gbWFrZUxheW91dCh7IG5hbWUsIGNhcGFjaXRhbmNlLCBpc1BvbGFyaXNlZCwgam9pbnRzIH0pO1xyXG4gICB9XHJcbn0iXX0=