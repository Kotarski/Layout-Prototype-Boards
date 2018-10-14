"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var Addins;
        (function (Addins) {
            var Graphical;
            (function (Graphical) {
                Graphical.init = (component) => {
                    let element = component.group.element;
                    $(element).on(Events.draw, () => {
                        if (component.disabled === false) {
                            $(component.group.element).show();
                            component.group.clearChildren(":not(.handle,.connectivityhighlight)");
                            component.draw();
                            component.makeConnectors();
                        }
                        else {
                            $(component.group.element).hide();
                        }
                    });
                };
            })(Graphical = Addins.Graphical || (Addins.Graphical = {}));
        })(Addins = Component.Addins || (Component.Addins = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGhpY2FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vdHlwZXNjcmlwdC9jaXJjdWl0L2NvbXBvbmVudC9hZGRpbnMvZ3JhcGhpY2FsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE9BQU8sQ0FjaEI7QUFkRCxXQUFVLE9BQU87SUFBQyxJQUFBLFNBQVMsQ0FjMUI7SUFkaUIsV0FBQSxTQUFTO1FBQUMsSUFBQSxNQUFNLENBY2pDO1FBZDJCLFdBQUEsTUFBTTtZQUFDLElBQUEsU0FBUyxDQWMzQztZQWRrQyxXQUFBLFNBQVM7Z0JBQzVCLGNBQUksR0FBRyxDQUFDLFNBQTZCLEVBQUUsRUFBRTtvQkFDbkQsSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7b0JBQ3RDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7d0JBQzdCLElBQUksU0FBUyxDQUFDLFFBQVEsS0FBSyxLQUFLLEVBQUU7NEJBQy9CLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDOzRCQUNsQyxTQUFTLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDOzRCQUN0RSxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7NEJBQ2pCLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzt5QkFDN0I7NkJBQU07NEJBQ0osQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7eUJBQ3BDO29CQUNKLENBQUMsQ0FBQyxDQUFDO2dCQUNOLENBQUMsQ0FBQTtZQUNKLENBQUMsRUFka0MsU0FBUyxHQUFULGdCQUFTLEtBQVQsZ0JBQVMsUUFjM0M7UUFBRCxDQUFDLEVBZDJCLE1BQU0sR0FBTixnQkFBTSxLQUFOLGdCQUFNLFFBY2pDO0lBQUQsQ0FBQyxFQWRpQixTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQWMxQjtBQUFELENBQUMsRUFkUyxPQUFPLEtBQVAsT0FBTyxRQWNoQiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBDaXJjdWl0LkNvbXBvbmVudC5BZGRpbnMuR3JhcGhpY2FsIHtcclxuICAgZXhwb3J0IGNvbnN0IGluaXQgPSAoY29tcG9uZW50OiBDb21wb25lbnQuSW5zdGFuY2UpID0+IHtcclxuICAgICAgbGV0IGVsZW1lbnQgPSBjb21wb25lbnQuZ3JvdXAuZWxlbWVudDtcclxuICAgICAgJChlbGVtZW50KS5vbihFdmVudHMuZHJhdywgKCkgPT4ge1xyXG4gICAgICAgICBpZiAoY29tcG9uZW50LmRpc2FibGVkID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAkKGNvbXBvbmVudC5ncm91cC5lbGVtZW50KS5zaG93KCk7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudC5ncm91cC5jbGVhckNoaWxkcmVuKFwiOm5vdCguaGFuZGxlLC5jb25uZWN0aXZpdHloaWdobGlnaHQpXCIpO1xyXG4gICAgICAgICAgICBjb21wb25lbnQuZHJhdygpO1xyXG4gICAgICAgICAgICBjb21wb25lbnQubWFrZUNvbm5lY3RvcnMoKTtcclxuICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJChjb21wb25lbnQuZ3JvdXAuZWxlbWVudCkuaGlkZSgpO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICB9XHJcbn0iXX0=