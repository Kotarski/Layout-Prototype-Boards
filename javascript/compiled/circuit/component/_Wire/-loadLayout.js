"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Wire;
        (function (_Wire) {
            _Wire.loadLayout = (raw) => {
                const name = (raw.name);
                const color = (raw.color || raw.colour);
                const joints = (raw.joints);
                return _Wire.makeLayout({ name, color, joints });
            };
        })(_Wire = Component._Wire || (Component._Wire = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLWxvYWRMYXlvdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50L19XaXJlLy1sb2FkTGF5b3V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE9BQU8sQ0FTaEI7QUFURCxXQUFVLE9BQU87SUFBQyxJQUFBLFNBQVMsQ0FTMUI7SUFUaUIsV0FBQSxTQUFTO1FBQUMsSUFBQSxLQUFLLENBU2hDO1FBVDJCLFdBQUEsS0FBSztZQUNqQixnQkFBVSxHQUFpRCxDQUFDLEdBQVEsRUFBRSxFQUFFO2dCQUNsRixNQUFNLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDeEIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFeEMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRTVCLE9BQU8sTUFBQSxVQUFVLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDOUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxFQVQyQixLQUFLLEdBQUwsZUFBSyxLQUFMLGVBQUssUUFTaEM7SUFBRCxDQUFDLEVBVGlCLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBUzFCO0FBQUQsQ0FBQyxFQVRTLE9BQU8sS0FBUCxPQUFPLFFBU2hCIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIENpcmN1aXQuQ29tcG9uZW50Ll9XaXJlIHtcclxuICAgZXhwb3J0IGNvbnN0IGxvYWRMYXlvdXQ6IENvbXBvbmVudC5UeXBlcy5sb2FkRnVuY3Rpb248Q2xhc3Nlcy5MYXlvdXQ+ID0gKHJhdzogYW55KSA9PiB7XHJcbiAgICAgIGNvbnN0IG5hbWUgPSAocmF3Lm5hbWUpO1xyXG4gICAgICBjb25zdCBjb2xvciA9IChyYXcuY29sb3IgfHwgcmF3LmNvbG91cik7XHJcbiAgICAgIC8vSm9pbnRzIEJsb2NrXHJcbiAgICAgIGNvbnN0IGpvaW50cyA9IChyYXcuam9pbnRzKTtcclxuXHJcbiAgICAgIHJldHVybiBtYWtlTGF5b3V0KHsgbmFtZSwgY29sb3IsIGpvaW50cyB9KTtcclxuICAgfVxyXG59Il19