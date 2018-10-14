var Insert;
(function (Insert) {
    function last(element, target) {
        if (element === target || target === undefined) {
            $(element).insertAfter($(element).siblings().last());
        }
        else if ($(target).children().length) {
            $(element).insertAfter($(target).children().last());
        }
        else {
            $(element).appendTo(target);
        }
    }
    Insert.last = last;
    function first(element, target) {
        if (element === target || target === undefined) {
            $(element).insertBefore($(element).siblings().first());
        }
        else if ($(target).children().length) {
            $(element).insertBefore($(target).children().first());
        }
        else {
            $(element).prependTo(target);
        }
    }
    Insert.first = first;
    function before(element, targetOrRef, referenceSelector = "*") {
        let target = (typeof targetOrRef === "string") ? undefined : targetOrRef;
        referenceSelector = (typeof targetOrRef === "string") ? targetOrRef : referenceSelector;
        if (element === target || target === undefined) {
            $(element).insertBefore($(element).siblings(referenceSelector).first());
        }
        else if ($(target).children(referenceSelector).length) {
            $(element).insertBefore($(target).children(referenceSelector).first());
        }
        else {
            $(element).prependTo(target);
        }
    }
    Insert.before = before;
    function after(element, targetOrRef, referenceSelector = "*") {
        let target = (typeof targetOrRef === "string") ? undefined : targetOrRef;
        referenceSelector = (typeof targetOrRef === "string") ? targetOrRef : referenceSelector;
        if (element === target || target === undefined) {
            $(element).insertAfter($(element).siblings(referenceSelector).last());
        }
        else if ($(target).children(referenceSelector).length) {
            $(element).insertAfter($(target).children(referenceSelector).last());
        }
        else {
            $(element).prependTo(target);
        }
    }
    Insert.after = after;
})(Insert || (Insert = {}));
export default Insert;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoifmluc2VydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3R5cGVzY3JpcHQvdXRpbGl0eS9+aW5zZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsTUFBTSxDQWtEZjtBQWxERCxXQUFVLE1BQU07SUFDYixTQUFnQixJQUFJLENBQUMsT0FBZ0IsRUFBRSxNQUFnQjtRQUNwRCxJQUFJLE9BQU8sS0FBSyxNQUFNLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUM3QyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZEO2FBQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFO1lBQ3JDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7U0FDdEQ7YUFBTTtZQUNKLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDOUI7SUFDSixDQUFDO0lBUmUsV0FBSSxPQVFuQixDQUFBO0lBRUQsU0FBZ0IsS0FBSyxDQUFDLE9BQWdCLEVBQUUsTUFBZ0I7UUFDckQsSUFBSSxPQUFPLEtBQUssTUFBTSxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDN0MsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUN6RDthQUFNLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRTtZQUNyQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQ3hEO2FBQU07WUFDSixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQy9CO0lBQ0osQ0FBQztJQVJlLFlBQUssUUFRcEIsQ0FBQTtJQUtELFNBQWdCLE1BQU0sQ0FBQyxPQUFnQixFQUFFLFdBQThCLEVBQUUsb0JBQTRCLEdBQUc7UUFDckcsSUFBSSxNQUFNLEdBQUcsQ0FBQyxPQUFPLFdBQVcsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7UUFDekUsaUJBQWlCLEdBQUcsQ0FBQyxPQUFPLFdBQVcsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQztRQUN4RixJQUFJLE9BQU8sS0FBSyxNQUFNLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUM3QyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQzFFO2FBQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUMsTUFBTSxFQUFFO1lBQ3RELENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDekU7YUFBTTtZQUNKLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDL0I7SUFDSixDQUFDO0lBVmUsYUFBTSxTQVVyQixDQUFBO0lBS0QsU0FBZ0IsS0FBSyxDQUFDLE9BQWdCLEVBQUUsV0FBOEIsRUFBRSxvQkFBNEIsR0FBRztRQUNwRyxJQUFJLE1BQU0sR0FBRyxDQUFDLE9BQU8sV0FBVyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUN6RSxpQkFBaUIsR0FBRyxDQUFDLE9BQU8sV0FBVyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1FBQ3hGLElBQUksT0FBTyxLQUFLLE1BQU0sSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQzdDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7U0FDeEU7YUFBTSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxNQUFNLEVBQUU7WUFDdEQsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUN2RTthQUFNO1lBQ0osQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMvQjtJQUNKLENBQUM7SUFWZSxZQUFLLFFBVXBCLENBQUE7QUFDSixDQUFDLEVBbERTLE1BQU0sS0FBTixNQUFNLFFBa0RmO0FBRUQsZUFBZSxNQUFNLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgSW5zZXJ0IHtcclxuICAgZXhwb3J0IGZ1bmN0aW9uIGxhc3QoZWxlbWVudDogRWxlbWVudCwgdGFyZ2V0PzogRWxlbWVudCkge1xyXG4gICAgICBpZiAoZWxlbWVudCA9PT0gdGFyZ2V0IHx8IHRhcmdldCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICQoZWxlbWVudCkuaW5zZXJ0QWZ0ZXIoJChlbGVtZW50KS5zaWJsaW5ncygpLmxhc3QoKSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoJCh0YXJnZXQpLmNoaWxkcmVuKCkubGVuZ3RoKSB7XHJcbiAgICAgICAgICQoZWxlbWVudCkuaW5zZXJ0QWZ0ZXIoJCh0YXJnZXQpLmNoaWxkcmVuKCkubGFzdCgpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgJChlbGVtZW50KS5hcHBlbmRUbyh0YXJnZXQpO1xyXG4gICAgICB9XHJcbiAgIH1cclxuXHJcbiAgIGV4cG9ydCBmdW5jdGlvbiBmaXJzdChlbGVtZW50OiBFbGVtZW50LCB0YXJnZXQ/OiBFbGVtZW50KSB7XHJcbiAgICAgIGlmIChlbGVtZW50ID09PSB0YXJnZXQgfHwgdGFyZ2V0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgJChlbGVtZW50KS5pbnNlcnRCZWZvcmUoJChlbGVtZW50KS5zaWJsaW5ncygpLmZpcnN0KCkpO1xyXG4gICAgICB9IGVsc2UgaWYgKCQodGFyZ2V0KS5jaGlsZHJlbigpLmxlbmd0aCkge1xyXG4gICAgICAgICAkKGVsZW1lbnQpLmluc2VydEJlZm9yZSgkKHRhcmdldCkuY2hpbGRyZW4oKS5maXJzdCgpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgJChlbGVtZW50KS5wcmVwZW5kVG8odGFyZ2V0KTtcclxuICAgICAgfVxyXG4gICB9XHJcblxyXG4gICBleHBvcnQgZnVuY3Rpb24gYmVmb3JlKGVsZW1lbnQ6IEVsZW1lbnQsIHRhcmdldD86IEVsZW1lbnQpOiB2b2lkXHJcbiAgIGV4cG9ydCBmdW5jdGlvbiBiZWZvcmUoZWxlbWVudDogRWxlbWVudCwgcmVmZXJlbmNlU2VsZWN0b3I6IHN0cmluZyk6IHZvaWRcclxuICAgZXhwb3J0IGZ1bmN0aW9uIGJlZm9yZShlbGVtZW50OiBFbGVtZW50LCB0YXJnZXQ/OiBFbGVtZW50LCByZWZlcmVuY2VTZWxlY3Rvcj86IHN0cmluZyk6IHZvaWRcclxuICAgZXhwb3J0IGZ1bmN0aW9uIGJlZm9yZShlbGVtZW50OiBFbGVtZW50LCB0YXJnZXRPclJlZj86IEVsZW1lbnQgfCBzdHJpbmcsIHJlZmVyZW5jZVNlbGVjdG9yOiBzdHJpbmcgPSBcIipcIik6IHZvaWQge1xyXG4gICAgICBsZXQgdGFyZ2V0ID0gKHR5cGVvZiB0YXJnZXRPclJlZiA9PT0gXCJzdHJpbmdcIikgPyB1bmRlZmluZWQgOiB0YXJnZXRPclJlZjtcclxuICAgICAgcmVmZXJlbmNlU2VsZWN0b3IgPSAodHlwZW9mIHRhcmdldE9yUmVmID09PSBcInN0cmluZ1wiKSA/IHRhcmdldE9yUmVmIDogcmVmZXJlbmNlU2VsZWN0b3I7XHJcbiAgICAgIGlmIChlbGVtZW50ID09PSB0YXJnZXQgfHwgdGFyZ2V0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgJChlbGVtZW50KS5pbnNlcnRCZWZvcmUoJChlbGVtZW50KS5zaWJsaW5ncyhyZWZlcmVuY2VTZWxlY3RvcikuZmlyc3QoKSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoJCh0YXJnZXQpLmNoaWxkcmVuKHJlZmVyZW5jZVNlbGVjdG9yKS5sZW5ndGgpIHtcclxuICAgICAgICAgJChlbGVtZW50KS5pbnNlcnRCZWZvcmUoJCh0YXJnZXQpLmNoaWxkcmVuKHJlZmVyZW5jZVNlbGVjdG9yKS5maXJzdCgpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgJChlbGVtZW50KS5wcmVwZW5kVG8odGFyZ2V0KTtcclxuICAgICAgfVxyXG4gICB9XHJcblxyXG4gICBleHBvcnQgZnVuY3Rpb24gYWZ0ZXIoZWxlbWVudDogRWxlbWVudCwgdGFyZ2V0PzogRWxlbWVudCk6IHZvaWRcclxuICAgZXhwb3J0IGZ1bmN0aW9uIGFmdGVyKGVsZW1lbnQ6IEVsZW1lbnQsIHJlZmVyZW5jZVNlbGVjdG9yOiBzdHJpbmcpOiB2b2lkXHJcbiAgIGV4cG9ydCBmdW5jdGlvbiBhZnRlcihlbGVtZW50OiBFbGVtZW50LCB0YXJnZXQ/OiBFbGVtZW50LCByZWZlcmVuY2VTZWxlY3Rvcj86IHN0cmluZyk6IHZvaWRcclxuICAgZXhwb3J0IGZ1bmN0aW9uIGFmdGVyKGVsZW1lbnQ6IEVsZW1lbnQsIHRhcmdldE9yUmVmPzogRWxlbWVudCB8IHN0cmluZywgcmVmZXJlbmNlU2VsZWN0b3I6IHN0cmluZyA9IFwiKlwiKTogdm9pZCB7XHJcbiAgICAgIGxldCB0YXJnZXQgPSAodHlwZW9mIHRhcmdldE9yUmVmID09PSBcInN0cmluZ1wiKSA/IHVuZGVmaW5lZCA6IHRhcmdldE9yUmVmO1xyXG4gICAgICByZWZlcmVuY2VTZWxlY3RvciA9ICh0eXBlb2YgdGFyZ2V0T3JSZWYgPT09IFwic3RyaW5nXCIpID8gdGFyZ2V0T3JSZWYgOiByZWZlcmVuY2VTZWxlY3RvcjtcclxuICAgICAgaWYgKGVsZW1lbnQgPT09IHRhcmdldCB8fCB0YXJnZXQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAkKGVsZW1lbnQpLmluc2VydEFmdGVyKCQoZWxlbWVudCkuc2libGluZ3MocmVmZXJlbmNlU2VsZWN0b3IpLmxhc3QoKSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoJCh0YXJnZXQpLmNoaWxkcmVuKHJlZmVyZW5jZVNlbGVjdG9yKS5sZW5ndGgpIHtcclxuICAgICAgICAgJChlbGVtZW50KS5pbnNlcnRBZnRlcigkKHRhcmdldCkuY2hpbGRyZW4ocmVmZXJlbmNlU2VsZWN0b3IpLmxhc3QoKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICQoZWxlbWVudCkucHJlcGVuZFRvKHRhcmdldCk7XHJcbiAgICAgIH1cclxuICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbnNlcnQ7Il19