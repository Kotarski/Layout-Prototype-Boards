"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Bipolar;
        (function (_Bipolar) {
            _Bipolar.loadLayout = (raw) => {
                const name = (raw.name);
                const currentGain = (raw.currentGain);
                const type = (raw.type);
                const joints = (raw.joints);
                return _Bipolar.makeLayout({ name, currentGain, type, joints });
            };
        })(_Bipolar = Component._Bipolar || (Component._Bipolar = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLWxvYWRMYXlvdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50L19CaXBvbGFyLy1sb2FkTGF5b3V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE9BQU8sQ0FTaEI7QUFURCxXQUFVLE9BQU87SUFBQyxJQUFBLFNBQVMsQ0FTMUI7SUFUaUIsV0FBQSxTQUFTO1FBQUMsSUFBQSxRQUFRLENBU25DO1FBVDJCLFdBQUEsUUFBUTtZQUNwQixtQkFBVSxHQUFpRCxDQUFDLEdBQVEsRUFBRSxFQUFFO2dCQUNsRixNQUFNLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDeEIsTUFBTSxXQUFXLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3RDLE1BQU0sSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN4QixNQUFNLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFNUIsT0FBTyxTQUFBLFVBQVUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDMUQsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxFQVQyQixRQUFRLEdBQVIsa0JBQVEsS0FBUixrQkFBUSxRQVNuQztJQUFELENBQUMsRUFUaUIsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFTMUI7QUFBRCxDQUFDLEVBVFMsT0FBTyxLQUFQLE9BQU8sUUFTaEIiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgQ2lyY3VpdC5Db21wb25lbnQuX0JpcG9sYXIge1xyXG4gICBleHBvcnQgY29uc3QgbG9hZExheW91dDogQ29tcG9uZW50LlR5cGVzLmxvYWRGdW5jdGlvbjxDbGFzc2VzLkxheW91dD4gPSAocmF3OiBhbnkpID0+IHtcclxuICAgICAgY29uc3QgbmFtZSA9IChyYXcubmFtZSk7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRHYWluID0gKHJhdy5jdXJyZW50R2Fpbik7XHJcbiAgICAgIGNvbnN0IHR5cGUgPSAocmF3LnR5cGUpO1xyXG4gICAgICBjb25zdCBqb2ludHMgPSAocmF3LmpvaW50cyk7XHJcblxyXG4gICAgICByZXR1cm4gbWFrZUxheW91dCh7IG5hbWUsIGN1cnJlbnRHYWluLCB0eXBlLCBqb2ludHMgfSk7XHJcbiAgIH1cclxufSJdfQ==