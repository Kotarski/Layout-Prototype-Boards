"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Resistor;
        (function (_Resistor) {
            _Resistor.loadLayout = (raw) => {
                const name = (raw.name);
                const resistance = (raw.resistance);
                const joints = (raw.joints);
                return _Resistor.makeLayout({ name, resistance, joints });
            };
        })(_Resistor = Component._Resistor || (Component._Resistor = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLWxvYWRMYXlvdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50L19SZXNpc3Rvci8tbG9hZExheW91dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxPQUFPLENBUWhCO0FBUkQsV0FBVSxPQUFPO0lBQUMsSUFBQSxTQUFTLENBUTFCO0lBUmlCLFdBQUEsU0FBUztRQUFDLElBQUEsU0FBUyxDQVFwQztRQVIyQixXQUFBLFNBQVM7WUFDckIsb0JBQVUsR0FBaUQsQ0FBQyxHQUFRLEVBQUUsRUFBRTtnQkFDbEYsTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hCLE1BQU0sVUFBVSxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNwQyxNQUFNLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFNUIsT0FBTyxVQUFBLFVBQVUsQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUNuRCxDQUFDLENBQUE7UUFDSixDQUFDLEVBUjJCLFNBQVMsR0FBVCxtQkFBUyxLQUFULG1CQUFTLFFBUXBDO0lBQUQsQ0FBQyxFQVJpQixTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQVExQjtBQUFELENBQUMsRUFSUyxPQUFPLEtBQVAsT0FBTyxRQVFoQiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBDaXJjdWl0LkNvbXBvbmVudC5fUmVzaXN0b3Ige1xyXG4gICBleHBvcnQgY29uc3QgbG9hZExheW91dDogQ29tcG9uZW50LlR5cGVzLmxvYWRGdW5jdGlvbjxDbGFzc2VzLkxheW91dD4gPSAocmF3OiBhbnkpID0+IHtcclxuICAgICAgY29uc3QgbmFtZSA9IChyYXcubmFtZSk7XHJcbiAgICAgIGNvbnN0IHJlc2lzdGFuY2UgPSAocmF3LnJlc2lzdGFuY2UpO1xyXG4gICAgICBjb25zdCBqb2ludHMgPSAocmF3LmpvaW50cyk7XHJcblxyXG4gICAgICByZXR1cm4gbWFrZUxheW91dCh7IG5hbWUsIHJlc2lzdGFuY2UsIGpvaW50cyB9KTtcclxuICAgfVxyXG59Il19