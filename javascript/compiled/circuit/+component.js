var Component;
(function (Component) {
    let Types;
    (function (Types) {
        ;
        ;
        ;
        ;
    })(Types = Component.Types || (Component.Types = {}));
    class Instance {
        constructor(values) {
            this.group = Svg.Element.Group.make();
            this.connectorSets = [];
            this.name = values.name;
            this.disabled = values.disabled || false;
        }
    }
    Component.Instance = Instance;
    function getMaker(instanceClass, defaulter, initialiser) {
        return (partialValues, log = true) => {
            if (log) {
                console.groupCollapsed("Loading...");
            }
            const values = loadObjectWithDefaults(defaulter, partialValues, log);
            if (log) {
                console.groupEnd();
            }
            const component = new instanceClass(values);
            if (initialiser)
                initialiser(component);
            component.draw();
            component.makeConnectors();
            if (log) {
                console.groupCollapsed("%s: %o", component.name, component.group.element);
                console.log(component);
                console.groupEnd();
            }
            $(component.group.element).addClass(component.name);
            return component;
        };
    }
    Component.getMaker = getMaker;
    function loadObjectWithDefaults(defaulter, partial, log = true) {
        const result = Object.keys(defaulter).reduce((acc, key) => {
            if (log) {
                console.group(key);
            }
            const defaultFn = defaulter[key];
            const partialValue = (partial) ? partial[key] : undefined;
            acc[key] = defaultFn(partialValue, log);
            if (log) {
                console.groupEnd();
            }
            return acc;
        }, {});
        return result;
    }
    function makeMap(map, correspondsTo) {
        return Object.assign(map, { correspondsTo });
    }
    Component.makeMap = makeMap;
})(Component || (Component = {}));
export default Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiK2NvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3R5cGVzY3JpcHQvQ2lyY3VpdC8rY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLElBQVUsU0FBUyxDQWtLbEI7QUFsS0QsV0FBVSxTQUFTO0lBRWhCLElBQWlCLEtBQUssQ0FpRHJCO0lBakRELFdBQWlCLEtBQUs7UUFHbEIsQ0FBQztRQUlELENBQUM7UUFvQ0QsQ0FBQztRQUlELENBQUM7SUFFTCxDQUFDLEVBakRnQixLQUFLLEdBQUwsZUFBSyxLQUFMLGVBQUssUUFpRHJCO0lBRUQsTUFBc0IsUUFBUTtRQU0zQixZQUFZLE1BQXNDO1lBSmxELFVBQUssR0FBMkIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDekQsa0JBQWEsR0FBd0IsRUFBRSxDQUFDO1lBSXJDLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztZQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDO1FBQzVDLENBQUM7S0F1Qkg7SUFoQ3FCLGtCQUFRLFdBZ0M3QixDQUFBO0lBZUQsU0FBZ0IsUUFBUSxDQUlsQixhQUFvQyxFQUNwQyxTQUFrQyxFQUNsQyxXQUFtQztRQUN0QyxPQUFPLENBQ0osYUFBMEMsRUFDMUMsR0FBRyxHQUFHLElBQUksRUFDUixFQUFFO1lBQ1EsSUFBSSxHQUFHLEVBQUU7Z0JBQ2xCLE9BQU8sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDdkM7WUFDRCxNQUFNLE1BQU0sR0FBRyxzQkFBc0IsQ0FBQyxTQUFTLEVBQUUsYUFBYSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3pELElBQUksR0FBRyxFQUFFO2dCQUNsQixPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDckI7WUFFRCxNQUFNLFNBQVMsR0FBRyxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQU0sQ0FBQztZQUNqRCxJQUFJLFdBQVc7Z0JBQUUsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3hDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNqQixTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7WUFFZCxJQUFJLEdBQUcsRUFBRTtnQkFDbkIsT0FBTyxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMxRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN2QixPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDckI7WUFFRCxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBRW5ELE9BQU8sU0FBUyxDQUFDO1FBQ3BCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFsQ2Usa0JBQVEsV0FrQ3ZCLENBQUE7SUFFRCxTQUFTLHNCQUFzQixDQUFJLFNBQWtDLEVBQUUsT0FBWSxFQUFFLEdBQUcsR0FBRyxJQUFJO1FBRTVGLE1BQU0sTUFBTSxHQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBRTdDLElBQUksR0FBRyxFQUFFO2dCQUNuQixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3JCO1lBRUQsTUFBTSxTQUFTLEdBQStCLFNBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckUsTUFBTSxZQUFZLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDekQsR0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUE7WUFFbkMsSUFBSSxHQUFHLEVBQUU7Z0JBQ25CLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNyQjtZQUVELE9BQU8sR0FBRyxDQUFDO1FBQ2QsQ0FBQyxFQUFFLEVBQUUsQ0FBTSxDQUFDO1FBRVosT0FBTyxNQUFNLENBQUM7SUFDakIsQ0FBQztJQUVELFNBQWdCLE9BQU8sQ0FDbkIsR0FBTSxFQUFFLGFBQWtCO1FBQzNCLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFIZSxpQkFBTyxVQUd0QixDQUFBO0FBQ0osQ0FBQyxFQWxLUyxTQUFTLEtBQVQsU0FBUyxRQWtLbEI7QUFFRCxlQUFlLFNBQVMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJjb21wb25lbnQvfnZhbHVlQ2hlY2sudHNcIiAvPlxyXG5pbXBvcnQgVmFsdWVDaGVjayBmcm9tIFwiLi9jb21wb25lbnQvfnZhbHVlQ2hlY2tcIjtcclxuXHJcbm5hbWVzcGFjZSBDb21wb25lbnQge1xyXG5cclxuICAgZXhwb3J0IG5hbWVzcGFjZSBUeXBlcyB7XHJcbiAgICAgIGV4cG9ydCBpbnRlcmZhY2UgcHJvcGVydGllcyB7XHJcbiAgICAgICAgIG5hbWU6IHN0cmluZztcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGV4cG9ydCBpbnRlcmZhY2Ugc3RhdGUge1xyXG4gICAgICAgICBkaXNhYmxlZDogYm9vbGVhbjtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGV4cG9ydCBpbnRlcmZhY2UgaW5zZXJ0aW9uRnVuY3Rpb24ge1xyXG4gICAgICAgICAoZ3JvdXA6IFNWR0dFbGVtZW50LCB0YXJnZXQ6IFNWR0dFbGVtZW50LCAuLi5hbnk6IGFueVtdKTogdm9pZDtcclxuICAgICAgfVxyXG5cclxuICAgICAgZXhwb3J0IGludGVyZmFjZSBsb2FkRnVuY3Rpb248UiBleHRlbmRzIENvbXBvbmVudC5JbnN0YW5jZSB8IENvbXBvbmVudC5JbnN0YW5jZVtdPSBDb21wb25lbnQuSW5zdGFuY2U+IHtcclxuICAgICAgICAgKHJhdzogYW55KTogUjtcclxuICAgICAgfVxyXG5cclxuICAgICAgZXhwb3J0IGludGVyZmFjZSBjb25uZWN0aW9uRnVuY3Rpb24ge1xyXG4gICAgICAgICAoY29tcG9uZW50OiBJbnN0YW5jZSk6IGNvbm5lY3RvcltdW107XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGV4cG9ydCBpbnRlcmZhY2UgbWFwIHtcclxuICAgICAgICAgc2F2ZW5hbWU6IHN0cmluZztcclxuICAgICAgICAgZGlhZ3JhbVR5cGU6IFwibGF5b3V0XCIgfCBcInNjaGVtYXRpY1wiO1xyXG4gICAgICAgICBpbnN0YW5jZTogeyBuZXcodmFsdWVzOiBhbnkpOiBDb21wb25lbnQuSW5zdGFuY2UgfTtcclxuICAgICAgICAgbWFrZTogUmV0dXJuVHlwZTx0eXBlb2YgQ29tcG9uZW50LmdldE1ha2VyPjtcclxuICAgICAgICAgbG9hZDogQ29tcG9uZW50LlR5cGVzLmxvYWRGdW5jdGlvbjxDb21wb25lbnQuSW5zdGFuY2UgfCBDb21wb25lbnQuSW5zdGFuY2VbXT47XHJcbiAgICAgICAgIGNvcnJlc3BvbmRzVG8/OiBtYXA7XHJcbiAgICAgICAgIGlzVW5pcXVlPzogYm9vbGVhbjtcclxuICAgICAgICAgaXNCb2FyZD86IGJvb2xlYW47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGV4cG9ydCB0eXBlIGNvbm5lY3RvclR5cGVzID0gXCJwaW5cIiB8IFwiaG9sZVwiIHwgXCJicm9rZW5ob2xlXCIgfCBcIm5vZGVcIjtcclxuICAgICAgZXhwb3J0IGludGVyZmFjZSBjb25uZWN0b3Ige1xyXG4gICAgICAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgIHR5cGU6IGNvbm5lY3RvclR5cGVzO1xyXG4gICAgICAgICBwb2ludDogVmVjdG9yO1xyXG4gICAgICAgICBjb21wb25lbnQ6IEluc3RhbmNlO1xyXG4gICAgICAgICBzeW1ib2w/OiBzdHJpbmc7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGV4cG9ydCBpbnRlcmZhY2UgaG9sZSBleHRlbmRzIGNvbm5lY3RvciB7XHJcbiAgICAgICAgIHR5cGU6IFwiaG9sZVwiIHwgXCJicm9rZW5ob2xlXCJcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGV4cG9ydCBpbnRlcmZhY2Ugbm9kZSBleHRlbmRzIGNvbm5lY3RvciB7XHJcbiAgICAgICAgIHR5cGU6IFwibm9kZVwiXHJcbiAgICAgIH07XHJcblxyXG4gICB9XHJcblxyXG4gICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgSW5zdGFuY2UgaW1wbGVtZW50cyBUeXBlcy5wcm9wZXJ0aWVzLCBUeXBlcy5zdGF0ZSB7XHJcbiAgICAgIG5hbWU6IHN0cmluZztcclxuICAgICAgZ3JvdXA6IFN2Zy5FbGVtZW50Lkdyb3VwLnR5cGUgPSBTdmcuRWxlbWVudC5Hcm91cC5tYWtlKCk7XHJcbiAgICAgIGNvbm5lY3RvclNldHM6IFR5cGVzLmNvbm5lY3RvcltdW10gPSBbXTtcclxuICAgICAgZGlzYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgICBjb25zdHJ1Y3Rvcih2YWx1ZXM6IFR5cGVzLnByb3BlcnRpZXMgJiBUeXBlcy5zdGF0ZSkge1xyXG4gICAgICAgICB0aGlzLm5hbWUgPSB2YWx1ZXMubmFtZTtcclxuICAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHZhbHVlcy5kaXNhYmxlZCB8fCBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgYWJzdHJhY3QgZ2V0UHJvcGVydGllcygpOiBUeXBlcy5wcm9wZXJ0aWVzO1xyXG5cclxuICAgICAgYWJzdHJhY3QgZ2V0U3RhdGUoKTogVHlwZXMuc3RhdGU7XHJcblxyXG5cclxuICAgICAgYWJzdHJhY3QgZHJhdygpOiB2b2lkO1xyXG5cclxuICAgICAgLyoqIEJ1aWxkcyBhbmQgZHJhd3MgdGhlIGNvbXBvbmVudHMgY29ubmVjdG9ycyAqL1xyXG4gICAgICBhYnN0cmFjdCBtYWtlQ29ubmVjdG9ycygpOiB2b2lkO1xyXG5cclxuICAgICAgYWJzdHJhY3QgaW5zZXJ0SW50byhlbGVtZW50PzogU1ZHR3JhcGhpY3NFbGVtZW50KTogdm9pZDtcclxuXHJcbiAgICAgIC8qKiBHZXRzIG90aGVyIGNvbXBvbmVudHMgdGhhdCB0aGlzIGNvbXBvbmVudCBpcyBjb25uZWN0ZWQgdG8sIG9yIHRoYXRcclxuICAgICAgICogdGhlIGNvbXBvbmVudCBzcGVjaWZpZWQgaW4gXCJmcm9tXCIgaXMgY29ubmVjdGVkIHRvIHZpYSB0aGlzIGNvbXBvbmVudC5cclxuICAgICAgKi9cclxuICAgICAgYWJzdHJhY3QgZ2V0Q29ubmVjdGlvbnMoKTogVHlwZXMuY29ubmVjdG9yW11bXVtdO1xyXG5cclxuICAgICAgLyoqIC4uLlxyXG4gICAgICAqL1xyXG4gICAgICBhYnN0cmFjdCB0cmFuc2ZlckZ1bmN0aW9uKGZyb206IFR5cGVzLmNvbm5lY3Rvcik6IFR5cGVzLmNvbm5lY3RvcltdO1xyXG5cclxuICAgfVxyXG5cclxuICAgZXhwb3J0IGludGVyZmFjZSBnZXRNYWtlcjxcclxuICAgICAgQyBleHRlbmRzIEluc3RhbmNlLFxyXG4gICAgICBWIGV4dGVuZHMgUmV0dXJuVHlwZTxDW1wiZ2V0UHJvcGVydGllc1wiXT4gJiBSZXR1cm5UeXBlPENbXCJnZXRTdGF0ZVwiXT5cclxuICAgICAgPiB7XHJcbiAgICAgIChcclxuICAgICAgICAgaW5zdGFuY2VDbGFzczogeyBuZXcodmFsdWVzOiBWKTogQyB9LFxyXG4gICAgICAgICBkZWZhdWx0ZXI6IFZhbHVlQ2hlY2suRGVmYXVsdGVyPFY+LFxyXG4gICAgICAgICBpbml0aWFsaXNlcjogKGNvbXBvbmVudDogQykgPT4gdm9pZFxyXG4gICAgICApOiAoXHJcbiAgICAgICAgICAgIHBhcnRpYWxWYWx1ZXM6IEdsb2JhbC5UeXBlcy5EZWVwUGFydGlhbDxWPixcclxuICAgICAgICAgICAgbG9nOiBib29sZWFuXHJcbiAgICAgICAgICkgPT4gQ1xyXG4gICB9XHJcbiAgIGV4cG9ydCBmdW5jdGlvbiBnZXRNYWtlcjxcclxuICAgICAgQyBleHRlbmRzIEluc3RhbmNlLFxyXG4gICAgICBWIGV4dGVuZHMgUmV0dXJuVHlwZTxDW1wiZ2V0UHJvcGVydGllc1wiXT4gJiBSZXR1cm5UeXBlPENbXCJnZXRTdGF0ZVwiXT4sXHJcbiAgICAgID4oXHJcbiAgICAgICAgIGluc3RhbmNlQ2xhc3M6IHsgbmV3KHZhbHVlczogVik6IEMgfSxcclxuICAgICAgICAgZGVmYXVsdGVyOiBWYWx1ZUNoZWNrLkRlZmF1bHRlcjxWPixcclxuICAgICAgICAgaW5pdGlhbGlzZXI6IChjb21wb25lbnQ6IEMpID0+IHZvaWQpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICAgcGFydGlhbFZhbHVlczogR2xvYmFsLlR5cGVzLkRlZXBQYXJ0aWFsPFY+LFxyXG4gICAgICAgICBsb2cgPSB0cnVlXHJcbiAgICAgICk6IEMgPT4ge1xyXG4gICAgICAgICAvKkxPR1NUQVJUKi9pZiAobG9nKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQoXCJMb2FkaW5nLi4uXCIpO1xyXG4gICAgICAgICB9LypMT0dFTkQqL1xyXG4gICAgICAgICBjb25zdCB2YWx1ZXMgPSBsb2FkT2JqZWN0V2l0aERlZmF1bHRzKGRlZmF1bHRlciwgcGFydGlhbFZhbHVlcywgbG9nKTtcclxuICAgICAgICAgLypMT0dTVEFSVCovaWYgKGxvZykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XHJcbiAgICAgICAgIH0vKkxPR0VORCovXHJcblxyXG4gICAgICAgICBjb25zdCBjb21wb25lbnQgPSBuZXcgaW5zdGFuY2VDbGFzcyh2YWx1ZXMpIGFzIEM7XHJcbiAgICAgICAgIGlmIChpbml0aWFsaXNlcikgaW5pdGlhbGlzZXIoY29tcG9uZW50KTtcclxuICAgICAgICAgY29tcG9uZW50LmRyYXcoKTtcclxuICAgICAgICAgY29tcG9uZW50Lm1ha2VDb25uZWN0b3JzKCk7XHJcblxyXG4gICAgICAgICAvKkxPR1NUQVJUKi8gaWYgKGxvZykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmdyb3VwQ29sbGFwc2VkKFwiJXM6ICVvXCIsIGNvbXBvbmVudC5uYW1lLCBjb21wb25lbnQuZ3JvdXAuZWxlbWVudCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbXBvbmVudCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcclxuICAgICAgICAgfSAvKkxPR0VORCovXHJcblxyXG4gICAgICAgICAkKGNvbXBvbmVudC5ncm91cC5lbGVtZW50KS5hZGRDbGFzcyhjb21wb25lbnQubmFtZSlcclxuXHJcbiAgICAgICAgIHJldHVybiBjb21wb25lbnQ7XHJcbiAgICAgIH1cclxuICAgfVxyXG5cclxuICAgZnVuY3Rpb24gbG9hZE9iamVjdFdpdGhEZWZhdWx0czxUPihkZWZhdWx0ZXI6IFZhbHVlQ2hlY2suRGVmYXVsdGVyPFQ+LCBwYXJ0aWFsOiBhbnksIGxvZyA9IHRydWUpOiBUIHtcclxuICAgICAgLy9UUyBqdXN0IG5lZWRzIHRvIHRydXN0IG1lIGhlcmUuLi5cclxuICAgICAgY29uc3QgcmVzdWx0OiBUID0gT2JqZWN0LmtleXMoZGVmYXVsdGVyKS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XHJcblxyXG4gICAgICAgICAvKkxPR1NUQVJUKi8gaWYgKGxvZykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmdyb3VwKGtleSk7XHJcbiAgICAgICAgIH0vKkxPR0VORCovXHJcblxyXG4gICAgICAgICBjb25zdCBkZWZhdWx0Rm46IFZhbHVlQ2hlY2sudmFsaWRhdGVyPGFueT4gPSAoZGVmYXVsdGVyIGFzIGFueSlba2V5XTtcclxuICAgICAgICAgY29uc3QgcGFydGlhbFZhbHVlID0gKHBhcnRpYWwpID8gcGFydGlhbFtrZXldIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAoYWNjIGFzIGFueSlba2V5XSA9IGRlZmF1bHRGbihwYXJ0aWFsVmFsdWUsIGxvZylcclxuXHJcbiAgICAgICAgIC8qTE9HU1RBUlQqLyBpZiAobG9nKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcclxuICAgICAgICAgfS8qTE9HRU5EKi9cclxuXHJcbiAgICAgICAgIHJldHVybiBhY2M7XHJcbiAgICAgIH0sIHt9KSBhcyBUO1xyXG5cclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgfVxyXG5cclxuICAgZXhwb3J0IGZ1bmN0aW9uIG1ha2VNYXA8VCBleHRlbmRzIFR5cGVzLm1hcCwgQ1QgZXh0ZW5kcyBUeXBlcy5tYXA+XHJcbiAgICAgIChtYXA6IFQsIGNvcnJlc3BvbmRzVG8/OiBDVCk6IFQgJiB7IGNvcnJlc3BvbmRzVG8/OiBDVCwgaXNVbmlxdWU/OiBib29sZWFuLCBpc0JvYXJkPzogYm9vbGVhbiB9IHtcclxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24obWFwLCB7IGNvcnJlc3BvbmRzVG8gfSk7XHJcbiAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29tcG9uZW50O1xyXG5cclxuIl19