"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Breadboard;
        (function (_Breadboard) {
            _Breadboard.loadLarge = (raw) => {
                const name = (raw.name);
                const joints = (raw.joints);
                return _Breadboard.makeLarge({ name, joints });
            };
        })(_Breadboard = Component._Breadboard || (Component._Breadboard = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLWxvYWRMYXJnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3R5cGVzY3JpcHQvY2lyY3VpdC9jb21wb25lbnQvX0JyZWFkYm9hcmQvLWxvYWRMYXJnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxPQUFPLENBT2hCO0FBUEQsV0FBVSxPQUFPO0lBQUMsSUFBQSxTQUFTLENBTzFCO0lBUGlCLFdBQUEsU0FBUztRQUFDLElBQUEsV0FBVyxDQU90QztRQVAyQixXQUFBLFdBQVc7WUFDdkIscUJBQVMsR0FBZ0QsQ0FBQyxHQUFRLEVBQUUsRUFBRTtnQkFDaEYsTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hCLE1BQU0sTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUU1QixPQUFPLFlBQUEsU0FBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDdEMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxFQVAyQixXQUFXLEdBQVgscUJBQVcsS0FBWCxxQkFBVyxRQU90QztJQUFELENBQUMsRUFQaUIsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFPMUI7QUFBRCxDQUFDLEVBUFMsT0FBTyxLQUFQLE9BQU8sUUFPaEIiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgQ2lyY3VpdC5Db21wb25lbnQuX0JyZWFkYm9hcmQge1xyXG4gICBleHBvcnQgY29uc3QgbG9hZExhcmdlOiBDb21wb25lbnQuVHlwZXMubG9hZEZ1bmN0aW9uPENsYXNzZXMuTGFyZ2U+ID0gKHJhdzogYW55KSA9PiB7XHJcbiAgICAgIGNvbnN0IG5hbWUgPSAocmF3Lm5hbWUpO1xyXG4gICAgICBjb25zdCBqb2ludHMgPSAocmF3LmpvaW50cyk7XHJcblxyXG4gICAgICByZXR1cm4gbWFrZUxhcmdlKHsgbmFtZSwgam9pbnRzIH0pO1xyXG4gICB9XHJcbn0iXX0=