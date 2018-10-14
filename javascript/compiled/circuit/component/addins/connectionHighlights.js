"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var Addins;
        (function (Addins) {
            var ConnectionHighlights;
            (function (ConnectionHighlights) {
                ConnectionHighlights.init = (component, propogate = true, colorPalette = defaultColorPalette) => {
                    let element = component.group.element;
                    $(element).on(Events.select, () => {
                        createConnectionsHighlights(component, propogate, colorPalette);
                    });
                    $(element).on(Events.draw, () => {
                        clearConnectionsHighlights(component);
                        if ($(component.group.element).hasClass("selected")) {
                            createConnectionsHighlights(component, propogate, colorPalette);
                        }
                    });
                    $(element).on(Events.deselect, () => {
                        clearConnectionsHighlights(component);
                    });
                };
                const createConnectorHighlights = (component, connection, color) => {
                    let highlight = Svg.Element.Circle.make(connection.point, 4, "highlight highlightwithfill connectivityhighlight");
                    $(highlight.element).css({ "fill": color, "stroke": color });
                    component.group.append(highlight);
                    if (connection.symbol !== undefined) {
                        let symbol = Svg.Element.Text.make(connection.symbol, connection.point, "text connectivityhighlight");
                        component.group.append(symbol);
                    }
                };
                const createConnectionsHighlights = (component, propogate, colorPalette) => {
                    let connectionSets = component.getConnections();
                    connectionSets.forEach(connectionSet => {
                        connectionSet.forEach((connectorConnections, i) => {
                            let color = colorPalette[i % colorPalette.length];
                            if (connectorConnections.length > 1 && propogate) {
                                connectorConnections.slice(1).forEach(connector => {
                                    createConnectorHighlights(component, connector, color);
                                });
                            }
                            createConnectorHighlights(component, connectorConnections[0], color);
                        });
                    });
                };
                const clearConnectionsHighlights = (component) => {
                    $(component.group.element).find(".connectivityhighlight").remove();
                };
                const defaultColorPalette = [
                    "red",
                    "#8bc34a",
                    "pink",
                    "yellow",
                    "cyan",
                    "orange",
                    "purple",
                    "magenta"
                ];
            })(ConnectionHighlights = Addins.ConnectionHighlights || (Addins.ConnectionHighlights = {}));
        })(Addins = Component.Addins || (Component.Addins = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGlvbkhpZ2hsaWdodHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50L2FkZGlucy9jb25uZWN0aW9uSGlnaGxpZ2h0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxPQUFPLENBa0VoQjtBQWxFRCxXQUFVLE9BQU87SUFBQyxJQUFBLFNBQVMsQ0FrRTFCO0lBbEVpQixXQUFBLFNBQVM7UUFBQyxJQUFBLE1BQU0sQ0FrRWpDO1FBbEUyQixXQUFBLE1BQU07WUFBQyxJQUFBLG9CQUFvQixDQWtFdEQ7WUFsRWtDLFdBQUEsb0JBQW9CO2dCQUl2Qyx5QkFBSSxHQUFHLENBQUMsU0FBNkIsRUFBRSxZQUFxQixJQUFJLEVBQUUsZUFBNkIsbUJBQW1CLEVBQUUsRUFBRTtvQkFDaEksSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7b0JBRXRDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7d0JBQy9CLDJCQUEyQixDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7b0JBQ25FLENBQUMsQ0FBQyxDQUFDO29CQUNILENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7d0JBQzdCLDBCQUEwQixDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUN0QyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTs0QkFDbEQsMkJBQTJCLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQzt5QkFDbEU7b0JBQ0osQ0FBQyxDQUFDLENBQUM7b0JBQ0gsQ0FBQyxDQUFDLE9BQU8sQ0FB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YW1lc3BhY2UgQ2lyY3VpdC5Db21wb25lbnQuQWRkaW5zLkNvbm5lY3Rpb25IaWdobGlnaHRzIHtcclxuXHJcbiAgIHR5cGUgY29sb3JQYWxldHRlID0gc3RyaW5nW107XHJcblxyXG4gICBleHBvcnQgY29uc3QgaW5pdCA9IChjb21wb25lbnQ6IENvbXBvbmVudC5JbnN0YW5jZSwgcHJvcG9nYXRlOiBib29sZWFuID0gdHJ1ZSwgY29sb3JQYWxldHRlOiBjb2xvclBhbGV0dGUgPSBkZWZhdWx0Q29sb3JQYWxldHRlKSA9PiB7XHJcbiAgICAgIGxldCBlbGVtZW50ID0gY29tcG9uZW50Lmdyb3VwLmVsZW1lbnQ7XHJcblxyXG4gICAgICAkKGVsZW1lbnQpLm9uKEV2ZW50cy5zZWxlY3QsICgpID0+IHtcclxuICAgICAgICAgY3JlYXRlQ29ubmVjdGlvbnNIaWdobGlnaHRzKGNvbXBvbmVudCwgcHJvcG9nYXRlLCBjb2xvclBhbGV0dGUpO1xyXG4gICAgICB9KTtcclxuICAgICAgJChlbGVtZW50KS5vbihFdmVudHMuZHJhdywgKCkgPT4ge1xyXG4gICAgICAgICBjbGVhckNvbm5lY3Rpb25zSGlnaGxpZ2h0cyhjb21wb25lbnQpO1xyXG4gICAgICAgICBpZiAoJChjb21wb25lbnQuZ3JvdXAuZWxlbWVudCkuaGFzQ2xhc3MoXCJzZWxlY3RlZFwiKSkge1xyXG4gICAgICAgICAgICBjcmVhdGVDb25uZWN0aW9uc0hpZ2hsaWdodHMoY29tcG9uZW50LCBwcm9wb2dhdGUsIGNvbG9yUGFsZXR0ZSk7XHJcbiAgICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgICQoZWxlbWVudCkub24oRXZlbnRzLmRlc2VsZWN0LCAoKSA9PiB7XHJcbiAgICAgICAgIGNsZWFyQ29ubmVjdGlvbnNIaWdobGlnaHRzKGNvbXBvbmVudCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgfVxyXG5cclxuICAgY29uc3QgY3JlYXRlQ29ubmVjdG9ySGlnaGxpZ2h0cyA9IChjb21wb25lbnQ6IENvbXBvbmVudC5JbnN0YW5jZSwgY29ubmVjdGlvbjogQ29tcG9uZW50LlR5cGVzLmNvbm5lY3RvciwgY29sb3I6IHN0cmluZykgPT4ge1xyXG4gICAgICBsZXQgaGlnaGxpZ2h0ID0gU3ZnLkVsZW1lbnQuQ2lyY2xlLm1ha2UoY29ubmVjdGlvbi5wb2ludCwgNCwgXCJoaWdobGlnaHQgaGlnaGxpZ2h0d2l0aGZpbGwgY29ubmVjdGl2aXR5aGlnaGxpZ2h0XCIpO1xyXG5cclxuICAgICAgJChoaWdobGlnaHQuZWxlbWVudCkuY3NzKHsgXCJmaWxsXCI6IGNvbG9yLCBcInN0cm9rZVwiOiBjb2xvciB9KVxyXG4gICAgICBjb21wb25lbnQuZ3JvdXAuYXBwZW5kKGhpZ2hsaWdodCk7XHJcblxyXG4gICAgICBpZiAoY29ubmVjdGlvbi5zeW1ib2wgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICBsZXQgc3ltYm9sID0gU3ZnLkVsZW1lbnQuVGV4dC5tYWtlKGNvbm5lY3Rpb24uc3ltYm9sLCBjb25uZWN0aW9uLnBvaW50LCBcInRleHQgY29ubmVjdGl2aXR5aGlnaGxpZ2h0XCIpO1xyXG4gICAgICAgICBjb21wb25lbnQuZ3JvdXAuYXBwZW5kKHN5bWJvbCk7XHJcbiAgICAgIH1cclxuICAgfVxyXG5cclxuICAgY29uc3QgY3JlYXRlQ29ubmVjdGlvbnNIaWdobGlnaHRzID0gKGNvbXBvbmVudDogQ29tcG9uZW50Lkluc3RhbmNlLCBwcm9wb2dhdGU6IGJvb2xlYW4sIGNvbG9yUGFsZXR0ZTogY29sb3JQYWxldHRlKSA9PiB7XHJcbiAgICAgIGxldCBjb25uZWN0aW9uU2V0cyA9IGNvbXBvbmVudC5nZXRDb25uZWN0aW9ucygpO1xyXG4gICAgICBjb25uZWN0aW9uU2V0cy5mb3JFYWNoKGNvbm5lY3Rpb25TZXQgPT4ge1xyXG4gICAgICAgICBjb25uZWN0aW9uU2V0LmZvckVhY2goKGNvbm5lY3RvckNvbm5lY3Rpb25zLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjb2xvciA9IGNvbG9yUGFsZXR0ZVtpICUgY29sb3JQYWxldHRlLmxlbmd0aF07XHJcbiAgICAgICAgICAgIGlmIChjb25uZWN0b3JDb25uZWN0aW9ucy5sZW5ndGggPiAxICYmIHByb3BvZ2F0ZSkge1xyXG4gICAgICAgICAgICAgICBjb25uZWN0b3JDb25uZWN0aW9ucy5zbGljZSgxKS5mb3JFYWNoKGNvbm5lY3RvciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGNyZWF0ZUNvbm5lY3RvckhpZ2hsaWdodHMoY29tcG9uZW50LCBjb25uZWN0b3IsIGNvbG9yKVxyXG4gICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNyZWF0ZUNvbm5lY3RvckhpZ2hsaWdodHMoY29tcG9uZW50LCBjb25uZWN0b3JDb25uZWN0aW9uc1swXSwgY29sb3IpO1xyXG4gICAgICAgICB9KVxyXG4gICAgICB9KVxyXG5cclxuICAgfVxyXG5cclxuXHJcbiAgIGNvbnN0IGNsZWFyQ29ubmVjdGlvbnNIaWdobGlnaHRzID0gKGNvbXBvbmVudDogQ29tcG9uZW50Lkluc3RhbmNlKSA9PiB7XHJcbiAgICAgICQoY29tcG9uZW50Lmdyb3VwLmVsZW1lbnQpLmZpbmQoXCIuY29ubmVjdGl2aXR5aGlnaGxpZ2h0XCIpLnJlbW92ZSgpO1xyXG4gICB9XHJcblxyXG4gICBjb25zdCBkZWZhdWx0Q29sb3JQYWxldHRlOiBjb2xvclBhbGV0dGUgPSBbXHJcbiAgICAgIFwicmVkXCIsXHJcbiAgICAgIFwiIzhiYzM0YVwiLFxyXG4gICAgICBcInBpbmtcIixcclxuICAgICAgXCJ5ZWxsb3dcIixcclxuICAgICAgXCJjeWFuXCIsXHJcbiAgICAgIFwib3JhbmdlXCIsXHJcbiAgICAgIFwicHVycGxlXCIsXHJcbiAgICAgIFwibWFnZW50YVwiXHJcbiAgIF1cclxuXHJcbn0iXX0=