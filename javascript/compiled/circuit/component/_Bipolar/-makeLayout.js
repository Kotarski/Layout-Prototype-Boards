"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Bipolar;
        (function (_Bipolar) {
            const defaulterLayout = {
                joints: ValueCheck.joints([{ x: 0, y: 0 }, { x: 20, y: -20 }, { x: 40, y: 0 }]),
                disabled: ValueCheck.validate("boolean", false),
                name: ValueCheck.validate("string", "bipolar"),
                currentGain: ValueCheck.validate("number", 0),
                type: ValueCheck.validate(["NPN", "PNP"], "NPN")
            };
            _Bipolar.makeLayout = getMaker(_Bipolar.Classes.Layout, defaulterLayout, (component) => {
                Component.Addins.Graphical.init(component);
                Component.Addins.Draggable.init(component);
                Component.Addins.Selectable.init(component);
                Component.Addins.Extendable.init(component);
                Component.Addins.ConnectionHighlights.init(component);
            });
        })(_Bipolar = Component._Bipolar || (Component._Bipolar = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLW1ha2VMYXlvdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50L19CaXBvbGFyLy1tYWtlTGF5b3V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxJQUFVLE9BQU8sQ0FvQmhCO0FBcEJELFdBQVUsT0FBTztJQUFDLElBQUEsU0FBUyxDQW9CMUI7SUFwQmlCLFdBQUEsU0FBUztRQUFDLElBQUEsUUFBUSxDQW9CbkM7UUFwQjJCLFdBQUEsUUFBUTtZQUNqQyxNQUFNLGVBQWUsR0FBdUM7Z0JBQ3pELE1BQU0sRUFBRSxVQUFVLENBQUMsTUFBTSxDQUN0QixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FDdEQ7Z0JBQ0QsUUFBUSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQztnQkFDL0MsSUFBSSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQztnQkFDOUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDN0MsSUFBSSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQWdCLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQzthQUNqRSxDQUFDO1lBRVcsbUJBQVUsR0FBRyxRQUFRLENBQUMsU0FBQSxPQUFPLENBQUMsTUFBTSxFQUFFLGVBQWUsRUFDL0QsQ0FBQyxTQUF5QixFQUFFLEVBQUU7Z0JBQzNCLFVBQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ2pDLFVBQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ2pDLFVBQUEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ2xDLFVBQUEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ2xDLFVBQUEsTUFBTSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMvQyxDQUFDLENBQ0gsQ0FBQztRQUNMLENBQUMsRUFwQjJCLFFBQVEsR0FBUixrQkFBUSxLQUFSLGtCQUFRLFFBb0JuQztJQUFELENBQUMsRUFwQmlCLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBb0IxQjtBQUFELENBQUMsRUFwQlMsT0FBTyxLQUFQLE9BQU8sUUFvQmhCIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIn5jbGFzc2VzLnRzXCIgLz5cclxuXHJcbm5hbWVzcGFjZSBDaXJjdWl0LkNvbXBvbmVudC5fQmlwb2xhciB7XHJcbiAgIGNvbnN0IGRlZmF1bHRlckxheW91dDogVmFsdWVDaGVjay5EZWZhdWx0ZXI8VHlwZXMudmFsdWVzPiA9IHtcclxuICAgICAgam9pbnRzOiBWYWx1ZUNoZWNrLmpvaW50czxbVmVjdG9yLCBWZWN0b3IsIFZlY3Rvcl0+KFxyXG4gICAgICAgICBbeyB4OiAwLCB5OiAwIH0sIHsgeDogMjAsIHk6IC0yMCB9LCB7IHg6IDQwLCB5OiAwIH1dXHJcbiAgICAgICksXHJcbiAgICAgIGRpc2FibGVkOiBWYWx1ZUNoZWNrLnZhbGlkYXRlKFwiYm9vbGVhblwiLCBmYWxzZSksXHJcbiAgICAgIG5hbWU6IFZhbHVlQ2hlY2sudmFsaWRhdGUoXCJzdHJpbmdcIiwgXCJiaXBvbGFyXCIpLFxyXG4gICAgICBjdXJyZW50R2FpbjogVmFsdWVDaGVjay52YWxpZGF0ZShcIm51bWJlclwiLCAwKSxcclxuICAgICAgdHlwZTogVmFsdWVDaGVjay52YWxpZGF0ZTxcIk5QTlwiIHwgXCJQTlBcIj4oW1wiTlBOXCIsIFwiUE5QXCJdLCBcIk5QTlwiKVxyXG4gICB9O1xyXG5cclxuICAgZXhwb3J0IGNvbnN0IG1ha2VMYXlvdXQgPSBnZXRNYWtlcihDbGFzc2VzLkxheW91dCwgZGVmYXVsdGVyTGF5b3V0LFxyXG4gICAgICAoY29tcG9uZW50OiBDbGFzc2VzLkxheW91dCkgPT4ge1xyXG4gICAgICAgICBBZGRpbnMuR3JhcGhpY2FsLmluaXQoY29tcG9uZW50KTtcclxuICAgICAgICAgQWRkaW5zLkRyYWdnYWJsZS5pbml0KGNvbXBvbmVudCk7XHJcbiAgICAgICAgIEFkZGlucy5TZWxlY3RhYmxlLmluaXQoY29tcG9uZW50KTtcclxuICAgICAgICAgQWRkaW5zLkV4dGVuZGFibGUuaW5pdChjb21wb25lbnQpO1xyXG4gICAgICAgICBBZGRpbnMuQ29ubmVjdGlvbkhpZ2hsaWdodHMuaW5pdChjb21wb25lbnQpO1xyXG4gICAgICB9XHJcbiAgICk7XHJcbn0iXX0=