"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Power;
        (function (_Power) {
            _Power.loadLayout = (raw) => {
                const name = (raw.name);
                const voltage = (raw.voltage);
                const joints = (raw.joints);
                return _Power.makeLayout({ name, voltage, joints });
            };
        })(_Power = Component._Power || (Component._Power = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLWxvYWRMYXlvdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50L19Qb3dlci8tbG9hZExheW91dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxPQUFPLENBUWhCO0FBUkQsV0FBVSxPQUFPO0lBQUMsSUFBQSxTQUFTLENBUTFCO0lBUmlCLFdBQUEsU0FBUztRQUFDLElBQUEsTUFBTSxDQVFqQztRQVIyQixXQUFBLE1BQU07WUFDbEIsaUJBQVUsR0FBaUQsQ0FBQyxHQUFRLEVBQUUsRUFBRTtnQkFDbEYsTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hCLE1BQU0sT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM5QixNQUFNLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFNUIsT0FBTyxPQUFBLFVBQVUsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUNoRCxDQUFDLENBQUE7UUFDSixDQUFDLEVBUjJCLE1BQU0sR0FBTixnQkFBTSxLQUFOLGdCQUFNLFFBUWpDO0lBQUQsQ0FBQyxFQVJpQixTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQVExQjtBQUFELENBQUMsRUFSUyxPQUFPLEtBQVAsT0FBTyxRQVFoQiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBDaXJjdWl0LkNvbXBvbmVudC5fUG93ZXIge1xyXG4gICBleHBvcnQgY29uc3QgbG9hZExheW91dDogQ29tcG9uZW50LlR5cGVzLmxvYWRGdW5jdGlvbjxDbGFzc2VzLkxheW91dD4gPSAocmF3OiBhbnkpID0+IHtcclxuICAgICAgY29uc3QgbmFtZSA9IChyYXcubmFtZSk7XHJcbiAgICAgIGNvbnN0IHZvbHRhZ2UgPSAocmF3LnZvbHRhZ2UpO1xyXG4gICAgICBjb25zdCBqb2ludHMgPSAocmF3LmpvaW50cyk7XHJcblxyXG4gICAgICByZXR1cm4gbWFrZUxheW91dCh7IG5hbWUsIHZvbHRhZ2UsIGpvaW50cyB9KTtcclxuICAgfVxyXG59Il19