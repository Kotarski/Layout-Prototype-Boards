"use strict";
var Svg;
(function (Svg) {
    var Element;
    (function (Element) {
        var Group;
        (function (Group) {
            function make(classes = "") {
                return svg(Element.make("g", classes));
            }
            Group.make = make;
            let Functions;
            (function (Functions) {
                function append(element) {
                    return (...elements) => {
                        addChildren(element, (child) => {
                            element.appendChild(child);
                        }, ...elements);
                        return svg(element);
                    };
                }
                Functions.append = append;
                function prepend(element) {
                    return (...elements) => {
                        let firstChild = element.firstChild;
                        addChildren(element, (child) => {
                            element.insertBefore(child, firstChild);
                        }, ...elements);
                        return svg(element);
                    };
                }
                Functions.prepend = prepend;
                function clearChildren(element) {
                    return (inclusionSelector = "*") => {
                        $(element).children(inclusionSelector).remove();
                        return svg(element);
                    };
                }
                Functions.clearChildren = clearChildren;
                function addChildren(to, addCallback, ...elements) {
                    elements.forEach(item => {
                        let asArray = item instanceof Array ? item : [item];
                        asArray.forEach(member => {
                            let element = member instanceof SVGGraphicsElement ? member : member.element;
                            addCallback(element);
                        });
                    });
                    return to;
                }
            })(Functions = Group.Functions || (Group.Functions = {}));
        })(Group = Element.Group || (Element.Group = {}));
    })(Element = Svg.Element || (Svg.Element = {}));
})(Svg || (Svg = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiK2dyb3VwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdHlwZXNjcmlwdC9zdmcvZWxlbWVudC8rZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVUsR0FBRyxDQTBEWjtBQTFERCxXQUFVLEdBQUc7SUFBQyxJQUFBLE9BQU8sQ0EwRHBCO0lBMURhLFdBQUEsT0FBTztRQUFDLElBQUEsS0FBSyxDQTBEMUI7UUExRHFCLFdBQUEsS0FBSztZQUV4QixTQUFnQixJQUFJLENBQUMsVUFBa0IsRUFBRTtnQkFDdEMsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBYyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN2RCxDQUFDO1lBRmUsVUFBSSxPQUVuQixDQUFBO1lBRUQsSUFBaUIsU0FBUyxDQW1EekI7WUFuREQsV0FBaUIsU0FBUztnQkFPdkIsU0FBZ0IsTUFBTSxDQUF3QixPQUFVO29CQUNyRCxPQUFPLENBQUMsR0FBRyxRQUFvQixFQUFFLEVBQUU7d0JBQ2hDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUF5QixFQUFFLEVBQUU7NEJBQ2hELE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQzlCLENBQUMsRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFDO3dCQUNoQixPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDdkIsQ0FBQyxDQUFBO2dCQUNKLENBQUM7Z0JBUGUsZ0JBQU0sU0FPckIsQ0FBQTtnQkFHRCxTQUFnQixPQUFPLENBQXdCLE9BQVU7b0JBQ3RELE9BQU8sQ0FBQyxHQUFHLFFBQW9CLEVBQUUsRUFBRTt3QkFDaEMsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQzt3QkFDcEMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQXlCLEVBQUUsRUFBRTs0QkFDaEQsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7d0JBQzNDLENBQUMsRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFDO3dCQUNoQixPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDdkIsQ0FBQyxDQUFBO2dCQUNKLENBQUM7Z0JBUmUsaUJBQU8sVUFRdEIsQ0FBQTtnQkFFRCxTQUFnQixhQUFhLENBQXdCLE9BQVU7b0JBQzVELE9BQU8sQ0FBQyxvQkFBNEIsR0FBRyxFQUFFLEVBQUU7d0JBQ3hDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQzt3QkFDaEQsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3ZCLENBQUMsQ0FBQTtnQkFDSixDQUFDO2dCQUxlLHVCQUFhLGdCQUs1QixDQUFBO2dCQUVELFNBQVMsV0FBVyxDQUNqQixFQUFNLEVBQ04sV0FBa0QsRUFDbEQsR0FBRyxRQUFvQjtvQkFFdkIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFFckIsSUFBSSxPQUFPLEdBQUcsSUFBSSxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO3dCQUNuRCxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFOzRCQUN0QixJQUFJLE9BQU8sR0FBRyxNQUFNLFlBQVksa0JBQWtCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQzs0QkFDN0UsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFBO3dCQUN2QixDQUFDLENBQUMsQ0FBQztvQkFDTixDQUFDLENBQUMsQ0FBQTtvQkFHRixPQUFPLEVBQUUsQ0FBQztnQkFDYixDQUFDO1lBQ0osQ0FBQyxFQW5EZ0IsU0FBUyxHQUFULGVBQVMsS0FBVCxlQUFTLFFBbUR6QjtRQUNKLENBQUMsRUExRHFCLEtBQUssR0FBTCxhQUFLLEtBQUwsYUFBSyxRQTBEMUI7SUFBRCxDQUFDLEVBMURhLE9BQU8sR0FBUCxXQUFPLEtBQVAsV0FBTyxRQTBEcEI7QUFBRCxDQUFDLEVBMURTLEdBQUcsS0FBSCxHQUFHLFFBMERaIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIFN2Zy5FbGVtZW50Lkdyb3VwIHtcclxuICAgZXhwb3J0IHR5cGUgdHlwZSA9IFJldHVyblR5cGU8dHlwZW9mIG1ha2U+O1xyXG4gICBleHBvcnQgZnVuY3Rpb24gbWFrZShjbGFzc2VzOiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgIHJldHVybiBzdmcoRWxlbWVudC5tYWtlPFNWR0dFbGVtZW50PihcImdcIiwgY2xhc3NlcykpO1xyXG4gICB9XHJcblxyXG4gICBleHBvcnQgbmFtZXNwYWNlIEZ1bmN0aW9ucyB7XHJcbiAgICAgIHR5cGUgRWxlbWVudFNldCA9IChcclxuICAgICAgICAgU1ZHR3JhcGhpY3NFbGVtZW50IHxcclxuICAgICAgICAgeyBlbGVtZW50OiBTVkdHcmFwaGljc0VsZW1lbnQgfVxyXG4gICAgICAgICB8IFNWR0dyYXBoaWNzRWxlbWVudFtdIHxcclxuICAgICAgICAgeyBlbGVtZW50OiBTVkdHcmFwaGljc0VsZW1lbnQgfVtdKVtdO1xyXG5cclxuICAgICAgZXhwb3J0IGZ1bmN0aW9uIGFwcGVuZDxUIGV4dGVuZHMgU1ZHR0VsZW1lbnQ+KGVsZW1lbnQ6IFQpIHtcclxuICAgICAgICAgcmV0dXJuICguLi5lbGVtZW50czogRWxlbWVudFNldCkgPT4ge1xyXG4gICAgICAgICAgICBhZGRDaGlsZHJlbihlbGVtZW50LCAoY2hpbGQ6IFNWR0dyYXBoaWNzRWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNoaWxkKTtcclxuICAgICAgICAgICAgfSwgLi4uZWxlbWVudHMpO1xyXG4gICAgICAgICAgICByZXR1cm4gc3ZnKGVsZW1lbnQpO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vTm90ZSB3aGVuIGdpdmVuIGFuIGFycmF5LCB0aGUgei1vcmRlciBpcyBub3QgcmV2ZXJzZWQuXHJcbiAgICAgIGV4cG9ydCBmdW5jdGlvbiBwcmVwZW5kPFQgZXh0ZW5kcyBTVkdHRWxlbWVudD4oZWxlbWVudDogVCkge1xyXG4gICAgICAgICByZXR1cm4gKC4uLmVsZW1lbnRzOiBFbGVtZW50U2V0KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBmaXJzdENoaWxkID0gZWxlbWVudC5maXJzdENoaWxkO1xyXG4gICAgICAgICAgICBhZGRDaGlsZHJlbihlbGVtZW50LCAoY2hpbGQ6IFNWR0dyYXBoaWNzRWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICBlbGVtZW50Lmluc2VydEJlZm9yZShjaGlsZCwgZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgICAgIH0sIC4uLmVsZW1lbnRzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHN2ZyhlbGVtZW50KTtcclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBleHBvcnQgZnVuY3Rpb24gY2xlYXJDaGlsZHJlbjxUIGV4dGVuZHMgU1ZHR0VsZW1lbnQ+KGVsZW1lbnQ6IFQpIHtcclxuICAgICAgICAgcmV0dXJuIChpbmNsdXNpb25TZWxlY3Rvcjogc3RyaW5nID0gXCIqXCIpID0+IHtcclxuICAgICAgICAgICAgJChlbGVtZW50KS5jaGlsZHJlbihpbmNsdXNpb25TZWxlY3RvcikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBzdmcoZWxlbWVudCk7XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gYWRkQ2hpbGRyZW48R1QgZXh0ZW5kcyBTVkdHRWxlbWVudD4oXHJcbiAgICAgICAgIHRvOiBHVCxcclxuICAgICAgICAgYWRkQ2FsbGJhY2s6IChlbGVtZW50OiBTVkdHcmFwaGljc0VsZW1lbnQpID0+IHZvaWQsXHJcbiAgICAgICAgIC4uLmVsZW1lbnRzOiBFbGVtZW50U2V0XHJcbiAgICAgICk6IEdUIHtcclxuICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgLy9pdGVtID0gaXRlbSBpbnN0YW5jZW9mIEFycmF5ID8gaXRlbSA6IFtpdGVtXTtcclxuICAgICAgICAgICAgbGV0IGFzQXJyYXkgPSBpdGVtIGluc3RhbmNlb2YgQXJyYXkgPyBpdGVtIDogW2l0ZW1dXHJcbiAgICAgICAgICAgIGFzQXJyYXkuZm9yRWFjaChtZW1iZXIgPT4ge1xyXG4gICAgICAgICAgICAgICBsZXQgZWxlbWVudCA9IG1lbWJlciBpbnN0YW5jZW9mIFNWR0dyYXBoaWNzRWxlbWVudCA/IG1lbWJlciA6IG1lbWJlci5lbGVtZW50O1xyXG4gICAgICAgICAgICAgICBhZGRDYWxsYmFjayhlbGVtZW50KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgIC8vIFRvIGFsbG93IG1ldGhvZCBjaGFpbmluZztcclxuICAgICAgICAgcmV0dXJuIHRvO1xyXG4gICAgICB9XHJcbiAgIH1cclxufVxyXG4iXX0=