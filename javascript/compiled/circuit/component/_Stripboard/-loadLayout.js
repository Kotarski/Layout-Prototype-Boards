"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Stripboard;
        (function (_Stripboard) {
            _Stripboard.loadLayout = (raw) => {
                const name = (raw.name);
                const rows = (raw.rows);
                const columns = (raw.columns);
                const trackBreaks = (raw.trackBreaks);
                const joints = (raw.joints);
                return _Stripboard.makeLayout({ name, rows, columns, trackBreaks, joints });
            };
        })(_Stripboard = Component._Stripboard || (Component._Stripboard = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLWxvYWRMYXlvdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50L19TdHJpcGJvYXJkLy1sb2FkTGF5b3V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE9BQU8sQ0FVaEI7QUFWRCxXQUFVLE9BQU87SUFBQyxJQUFBLFNBQVMsQ0FVMUI7SUFWaUIsV0FBQSxTQUFTO1FBQUMsSUFBQSxXQUFXLENBVXRDO1FBVjJCLFdBQUEsV0FBVztZQUN2QixzQkFBVSxHQUFpRCxDQUFDLEdBQVEsRUFBRSxFQUFFO2dCQUNsRixNQUFNLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDeEIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hCLE1BQU0sT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM5QixNQUFNLFdBQVcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDdEMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRTVCLE9BQU8sWUFBQSxVQUFVLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUNuRSxDQUFDLENBQUE7UUFDSixDQUFDLEVBVjJCLFdBQVcsR0FBWCxxQkFBVyxLQUFYLHFCQUFXLFFBVXRDO0lBQUQsQ0FBQyxFQVZpQixTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQVUxQjtBQUFELENBQUMsRUFWUyxPQUFPLEtBQVAsT0FBTyxRQVVoQiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBDaXJjdWl0LkNvbXBvbmVudC5fU3RyaXBib2FyZCB7XHJcbiAgIGV4cG9ydCBjb25zdCBsb2FkTGF5b3V0OiBDb21wb25lbnQuVHlwZXMubG9hZEZ1bmN0aW9uPENsYXNzZXMuTGF5b3V0PiA9IChyYXc6IGFueSkgPT4ge1xyXG4gICAgICBjb25zdCBuYW1lID0gKHJhdy5uYW1lKTtcclxuICAgICAgY29uc3Qgcm93cyA9IChyYXcucm93cyk7XHJcbiAgICAgIGNvbnN0IGNvbHVtbnMgPSAocmF3LmNvbHVtbnMpO1xyXG4gICAgICBjb25zdCB0cmFja0JyZWFrcyA9IChyYXcudHJhY2tCcmVha3MpO1xyXG4gICAgICBjb25zdCBqb2ludHMgPSAocmF3LmpvaW50cyk7XHJcblxyXG4gICAgICByZXR1cm4gbWFrZUxheW91dCh7IG5hbWUsIHJvd3MsIGNvbHVtbnMsIHRyYWNrQnJlYWtzLCBqb2ludHMgfSk7XHJcbiAgIH1cclxufSJdfQ==