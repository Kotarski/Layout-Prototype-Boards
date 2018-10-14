"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var Addins;
        (function (Addins) {
            var Board;
            (function (Board) {
                function init(component, isReversible) {
                    $(component.group.element).addClass("board");
                    Object.defineProperty(component, 'connectorSets', {
                        get: () => Utility.flatten2d(component.tracks.map(track => track.connectorSets))
                    });
                    if (isReversible) {
                        Reversible.init(component);
                    }
                }
                Board.init = init;
                let Reversible;
                (function (Reversible) {
                    Reversible.init = (component) => {
                        let element = component.group;
                        $(element.element).on(Events.select, () => {
                            createGhost(component);
                        });
                        $(element.element).on(Events.dragStart, () => {
                            clearGhost(component);
                        });
                        $(element.element).on(Events.rotate, () => {
                            clearGhost(component);
                            createGhost(component);
                        });
                        $(element.element).on(Events.dragStop, () => {
                            createGhost(component);
                        });
                        $(element.element).on(Events.deselect, () => {
                            clearGhost(component);
                        });
                        $(element.element).on(Events.draw, () => {
                            if ($(element.element).hasClass("selected")) {
                                clearGhost(component);
                                createGhost(component);
                            }
                        });
                    };
                    const createGhost = (component) => {
                        let ghostGroup = component.group.element.cloneNode();
                        let bbox = component.group.element.getBBox();
                        Svg.addTransform(ghostGroup, t => t.setScale(-1, 1), false);
                        Svg.addTransform(ghostGroup, t => t.setTranslate(-(bbox.width + bbox.x) * 2 - 1, 0), false);
                        ghostGroup.appendChild($(component.group.element).children(".body").clone()[0]);
                        $(ghostGroup).addClass("reverseghost");
                        $(ghostGroup).data("selects", component);
                        let parent = (component.group.element.parentElement);
                        if (parent)
                            parent.appendChild(ghostGroup);
                        let allValidConnectors = Utility.flatten2d(manifest.layout.map(el => Utility.flatten2d(el.connectorSets.map(connectorSet => connectorSet.filter(connector => connector.type === "pin")))));
                        component.tracks.forEach((track, trackIdx) => {
                            let trackGhostGroup = $(track.group.element).clone()[0];
                            ghostGroup.appendChild(trackGhostGroup);
                            track.connectorSets[0].forEach((hole, holeIdx) => {
                                let point = hole.point;
                                let breaker = Svg.Element.Circle.make(point, 6, "breaker");
                                if (hole.type === "brokenhole") {
                                    $(breaker.element).addClass("broken");
                                }
                                if (getPinsAtHole(hole, allValidConnectors).length) {
                                    $(breaker.element).addClass("withPin");
                                }
                                ;
                                trackGhostGroup.appendChild(breaker.element);
                                let holePosition = { track: trackIdx, hole: holeIdx };
                                $(breaker.element).click(() => {
                                    history.addEvent(component);
                                    if (hole.type === "hole") {
                                        $(breaker.element).addClass("broken");
                                        hole.type = "brokenhole";
                                        component.trackBreaks.push(holePosition);
                                    }
                                    else if (hole.type === "brokenhole") {
                                        $(breaker.element).removeClass("broken");
                                        hole.type = "hole";
                                        component.trackBreaks = component.trackBreaks.filter(trackBreak => (trackBreak.hole !== holePosition.hole || trackBreak.track !== holePosition.track));
                                    }
                                });
                            });
                        });
                    };
                    const clearGhost = (component) => {
                        let parent = (component.group.element.parentElement);
                        if (parent)
                            $(parent).children(".reverseghost").remove();
                    };
                    function getPinsAtHole(connector, allConnectors) {
                        let acceptedTypes = ["pin"];
                        let point = connector.point;
                        let attachedConnectors = allConnectors.filter(other => {
                            return (acceptedTypes.includes(other.type)
                                && vector(point).isCloseTo(other.point));
                        });
                        return attachedConnectors;
                    }
                })(Reversible || (Reversible = {}));
            })(Board = Addins.Board || (Addins.Board = {}));
        })(Addins = Component.Addins || (Component.Addins = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9hcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50L2FkZGlucy9ib2FyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsSUFBVSxPQUFPLENBeUpoQjtBQXpKRCxXQUFVLE9BQU87SUFBQyxJQUFBLFNBQVMsQ0F5SjFCO0lBekppQixXQUFBLFNBQVM7UUFBQyxJQUFBLE1BQU0sQ0F5SmpDO1FBekoyQixXQUFBLE1BQU07WUFBQyxJQUFBLEtBQUssQ0F5SnZDO1lBekprQyxXQUFBLEtBQUs7Z0JBWXJDLFNBQWdCLElBQUksQ0FBb0MsU0FBWSxFQUFFLFlBQXNCO29CQUN6RixDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBRzdDLE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLGVBQWUsRUFBRTt3QkFDL0MsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7cUJBQ2xGLENBQUMsQ0FBQztvQkFFSCxJQUFJLFlBQVksRUFBRTt3QkFDZixVQUFVLENBQUMsSUFBSSxDQUFDLFNBQTRCLENBQUMsQ0FBQztxQkFDaEQ7Z0JBQ0osQ0FBQztnQkFYZSxVQUFJLE9BV25CLENBQUE7Z0JBRUQsSUFBVSxVQUFVLENBK0huQjtnQkEvSEQsV0FBVSxVQUFVO29CQUVKLGVBQUksR0FBRyxDQUFDLFNBQTBCLEVBQUUsRUFBRTt3QkFDaEQsSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQzt3QkFFOUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFB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QUFJLE1BQU0sR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO3dCQUNyRCxJQUFJLE1BQU07NEJBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDNUQsQ0FBQyxDQUFBO29CQUVELFNBQVMsYUFBYSxDQUFDLFNBQStCLEVBQUUsYUFBMEM7d0JBQy9GLElBQUksYUFBYSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBRTVCLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7d0JBQzVCLElBQUksa0JBQWtCLEdBQWdDLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7NEJBQ2hGLE9BQU8sQ0FDSixhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7bUNBQy9CLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUN6QyxDQUFBO3dCQUNKLENBQUMsQ0FBQyxDQUFDO3dCQUVILE9BQU8sa0JBQWtCLENBQUM7b0JBQzdCLENBQUM7Z0JBQ0osQ0FBQyxFQS9IUyxVQUFVLEtBQVYsVUFBVSxRQStIbkI7WUFDSixDQUFDLEVBekprQyxLQUFLLEdBQUwsWUFBSyxLQUFMLFlBQUssUUF5SnZDO1FBQUQsQ0FBQyxFQXpKMkIsTUFBTSxHQUFOLGdCQUFNLEtBQU4sZ0JBQU0sUUF5SmpDO0lBQUQsQ0FBQyxFQXpKaUIsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUF5SjFCO0FBQUQsQ0FBQyxFQXpKUyxPQUFPLEtBQVAsT0FBTyxRQXlKaEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLXRyYWNrLnRzXCIgLz5cclxubmFtZXNwYWNlIENpcmN1aXQuQ29tcG9uZW50LkFkZGlucy5Cb2FyZCB7XHJcbiAgIGV4cG9ydCB0eXBlIGJvYXJkID0gQ29tcG9uZW50Lkluc3RhbmNlICYge1xyXG4gICAgICBjb25uZWN0b3JTZXRzOiBDb21wb25lbnQuVHlwZXMuaG9sZVtdW10sXHJcbiAgICAgIHRyYWNrczogX1RyYWNrLkNsYXNzZXMuTGF5b3V0W10sXHJcbiAgICAgIGpvaW50czogVmVjdG9yW11cclxuICAgfVxyXG4gICBleHBvcnQgaW50ZXJmYWNlIHJldmVyc2libGVCb2FyZCBleHRlbmRzIGJvYXJkIHtcclxuICAgICAgdHJhY2tCcmVha3M6IHsgdHJhY2s6IG51bWJlciwgaG9sZTogbnVtYmVyIH1bXTtcclxuICAgfVxyXG5cclxuICAgZXhwb3J0IGZ1bmN0aW9uIGluaXQ8QiBleHRlbmRzIGJvYXJkPihjb21wb25lbnQ6IEIpOiB2b2lkXHJcbiAgIGV4cG9ydCBmdW5jdGlvbiBpbml0PEIgZXh0ZW5kcyByZXZlcnNpYmxlQm9hcmQ+KGNvbXBvbmVudDogQiwgaXNSZXZlcnNpYmxlOiBib29sZWFuKTogdm9pZFxyXG4gICBleHBvcnQgZnVuY3Rpb24gaW5pdDxCIGV4dGVuZHMgYm9hcmQgfCByZXZlcnNpYmxlQm9hcmQ+KGNvbXBvbmVudDogQiwgaXNSZXZlcnNpYmxlPzogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAkKGNvbXBvbmVudC5ncm91cC5lbGVtZW50KS5hZGRDbGFzcyhcImJvYXJkXCIpO1xyXG5cclxuXHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb21wb25lbnQsICdjb25uZWN0b3JTZXRzJywge1xyXG4gICAgICAgICBnZXQ6ICgpID0+IFV0aWxpdHkuZmxhdHRlbjJkKGNvbXBvbmVudC50cmFja3MubWFwKHRyYWNrID0+IHRyYWNrLmNvbm5lY3RvclNldHMpKVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChpc1JldmVyc2libGUpIHtcclxuICAgICAgICAgUmV2ZXJzaWJsZS5pbml0KGNvbXBvbmVudCBhcyByZXZlcnNpYmxlQm9hcmQpO1xyXG4gICAgICB9XHJcbiAgIH1cclxuXHJcbiAgIG5hbWVzcGFjZSBSZXZlcnNpYmxlIHtcclxuXHJcbiAgICAgIGV4cG9ydCBjb25zdCBpbml0ID0gKGNvbXBvbmVudDogcmV2ZXJzaWJsZUJvYXJkKSA9PiB7XHJcbiAgICAgICAgIGxldCBlbGVtZW50ID0gY29tcG9uZW50Lmdyb3VwO1xyXG5cclxuICAgICAgICAgJChlbGVtZW50LmVsZW1lbnQpLm9uKEV2ZW50cy5zZWxlY3QsICgpID0+IHtcclxuICAgICAgICAgICAgY3JlYXRlR2hvc3QoY29tcG9uZW50KTtcclxuICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAkKGVsZW1lbnQuZWxlbWVudCkub24oRXZlbnRzLmRyYWdTdGFydCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBjbGVhckdob3N0KGNvbXBvbmVudCk7XHJcbiAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgJChlbGVtZW50LmVsZW1lbnQpLm9uKEV2ZW50cy5yb3RhdGUsICgpID0+IHtcclxuICAgICAgICAgICAgY2xlYXJHaG9zdChjb21wb25lbnQpO1xyXG4gICAgICAgICAgICBjcmVhdGVHaG9zdChjb21wb25lbnQpO1xyXG4gICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICQoZWxlbWVudC5lbGVtZW50KS5vbihFdmVudHMuZHJhZ1N0b3AsICgpID0+IHtcclxuICAgICAgICAgICAgY3JlYXRlR2hvc3QoY29tcG9uZW50KTtcclxuICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAkKGVsZW1lbnQuZWxlbWVudCkub24oRXZlbnRzLmRlc2VsZWN0LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsZWFyR2hvc3QoY29tcG9uZW50KTtcclxuICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAkKGVsZW1lbnQuZWxlbWVudCkub24oRXZlbnRzLmRyYXcsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCQoZWxlbWVudC5lbGVtZW50KS5oYXNDbGFzcyhcInNlbGVjdGVkXCIpKSB7XHJcbiAgICAgICAgICAgICAgIGNsZWFyR2hvc3QoY29tcG9uZW50KTtcclxuICAgICAgICAgICAgICAgY3JlYXRlR2hvc3QoY29tcG9uZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgY3JlYXRlR2hvc3QgPSAoY29tcG9uZW50OiByZXZlcnNpYmxlQm9hcmQpID0+IHtcclxuICAgICAgICAgLy8gQ3JlYXRlIHRoZSBncm91cFxyXG4gICAgICAgICBsZXQgZ2hvc3RHcm91cCA9IGNvbXBvbmVudC5ncm91cC5lbGVtZW50LmNsb25lTm9kZSgpIGFzIFNWR0dyYXBoaWNzRWxlbWVudDtcclxuXHJcbiAgICAgICAgIGxldCBiYm94ID0gY29tcG9uZW50Lmdyb3VwLmVsZW1lbnQuZ2V0QkJveCgpO1xyXG5cclxuICAgICAgICAgLy9TY2FsZVxyXG4gICAgICAgICBTdmcuYWRkVHJhbnNmb3JtKGdob3N0R3JvdXAsIHQgPT4gdC5zZXRTY2FsZSgtMSwgMSksIGZhbHNlKTtcclxuXHJcbiAgICAgICAgIC8vVHJhbnNsYXRlXHJcbiAgICAgICAgIFN2Zy5hZGRUcmFuc2Zvcm0oZ2hvc3RHcm91cCwgdCA9PiB0LnNldFRyYW5zbGF0ZSgtKGJib3gud2lkdGggKyBiYm94LngpICogMiAtIDEsIDApLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICBnaG9zdEdyb3VwLmFwcGVuZENoaWxkKCQoY29tcG9uZW50Lmdyb3VwLmVsZW1lbnQpLmNoaWxkcmVuKFwiLmJvZHlcIikuY2xvbmUoKVswXSk7XHJcblxyXG4gICAgICAgICAkKGdob3N0R3JvdXApLmFkZENsYXNzKFwicmV2ZXJzZWdob3N0XCIpO1xyXG4gICAgICAgICAkKGdob3N0R3JvdXApLmRhdGEoXCJzZWxlY3RzXCIsIGNvbXBvbmVudCk7XHJcblxyXG4gICAgICAgICBsZXQgcGFyZW50ID0gKGNvbXBvbmVudC5ncm91cC5lbGVtZW50LnBhcmVudEVsZW1lbnQpO1xyXG4gICAgICAgICBpZiAocGFyZW50KSBwYXJlbnQuYXBwZW5kQ2hpbGQoZ2hvc3RHcm91cCk7XHJcblxyXG4gICAgICAgICBsZXQgYWxsVmFsaWRDb25uZWN0b3JzID0gVXRpbGl0eS5mbGF0dGVuMmQobWFuaWZlc3QubGF5b3V0Lm1hcChlbCA9PlxyXG4gICAgICAgICAgICBVdGlsaXR5LmZsYXR0ZW4yZChlbC5jb25uZWN0b3JTZXRzLm1hcChjb25uZWN0b3JTZXQgPT5cclxuICAgICAgICAgICAgICAgY29ubmVjdG9yU2V0LmZpbHRlcihjb25uZWN0b3IgPT4gY29ubmVjdG9yLnR5cGUgPT09IFwicGluXCIpXHJcbiAgICAgICAgICAgICkpXHJcbiAgICAgICAgICkpO1xyXG5cclxuICAgICAgICAgLy8gLi4uXHJcbiAgICAgICAgIGNvbXBvbmVudC50cmFja3MuZm9yRWFjaCgodHJhY2ssIHRyYWNrSWR4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB0cmFja0dob3N0R3JvdXAgPSAkKHRyYWNrLmdyb3VwLmVsZW1lbnQpLmNsb25lKClbMF0gYXMgYW55IGFzIFNWR0dyYXBoaWNzRWxlbWVudDtcclxuICAgICAgICAgICAgZ2hvc3RHcm91cC5hcHBlbmRDaGlsZCh0cmFja0dob3N0R3JvdXApO1xyXG5cclxuICAgICAgICAgICAgLy8gQWRkIHRoZSBob2xlc1xyXG4gICAgICAgICAgICAvL2xldCBjdG0gPSAodHJhY2suZ3JvdXAuZWxlbWVudC5nZXRDVE0oKSB8fCBTdmcubWFrZU1hdHJpeCgpKS5pbnZlcnNlKClcclxuICAgICAgICAgICAgdHJhY2suY29ubmVjdG9yU2V0c1swXS5mb3JFYWNoKChob2xlLCBob2xlSWR4KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICBsZXQgcG9pbnQgPSBob2xlLnBvaW50Oy8vKGN0bSkgPyBob2xlLnBvaW50Lm1hdHJpeFRyYW5zZm9ybShjdG0pIDogaG9sZS5wb2ludDtcclxuXHJcbiAgICAgICAgICAgICAgIGxldCBicmVha2VyID0gU3ZnLkVsZW1lbnQuQ2lyY2xlLm1ha2UocG9pbnQsIDYsIFwiYnJlYWtlclwiKTtcclxuXHJcbiAgICAgICAgICAgICAgIGlmIChob2xlLnR5cGUgPT09IFwiYnJva2VuaG9sZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICQoYnJlYWtlci5lbGVtZW50KS5hZGRDbGFzcyhcImJyb2tlblwiKTtcclxuICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgIGlmIChnZXRQaW5zQXRIb2xlKGhvbGUsIGFsbFZhbGlkQ29ubmVjdG9ycykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICQoYnJlYWtlci5lbGVtZW50KS5hZGRDbGFzcyhcIndpdGhQaW5cIik7XHJcbiAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICB0cmFja0dob3N0R3JvdXAuYXBwZW5kQ2hpbGQoYnJlYWtlci5lbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgIGxldCBob2xlUG9zaXRpb24gPSB7IHRyYWNrOiB0cmFja0lkeCwgaG9sZTogaG9sZUlkeCB9O1xyXG5cclxuICAgICAgICAgICAgICAgJChicmVha2VyLmVsZW1lbnQpLmNsaWNrKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgaGlzdG9yeS5hZGRFdmVudChjb21wb25lbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgaWYgKGhvbGUudHlwZSA9PT0gXCJob2xlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgJChicmVha2VyLmVsZW1lbnQpLmFkZENsYXNzKFwiYnJva2VuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICBob2xlLnR5cGUgPSBcImJyb2tlbmhvbGVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50LnRyYWNrQnJlYWtzLnB1c2goaG9sZVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChob2xlLnR5cGUgPT09IFwiYnJva2VuaG9sZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICQoYnJlYWtlci5lbGVtZW50KS5yZW1vdmVDbGFzcyhcImJyb2tlblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgaG9sZS50eXBlID0gXCJob2xlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC50cmFja0JyZWFrcyA9IGNvbXBvbmVudC50cmFja0JyZWFrcy5maWx0ZXIodHJhY2tCcmVhayA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAodHJhY2tCcmVhay5ob2xlICE9PSBob2xlUG9zaXRpb24uaG9sZSB8fCB0cmFja0JyZWFrLnRyYWNrICE9PSBob2xlUG9zaXRpb24udHJhY2spXHJcbiAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgY2xlYXJHaG9zdCA9IChjb21wb25lbnQ6IHJldmVyc2libGVCb2FyZCkgPT4ge1xyXG5cclxuICAgICAgICAgbGV0IHBhcmVudCA9IChjb21wb25lbnQuZ3JvdXAuZWxlbWVudC5wYXJlbnRFbGVtZW50KTtcclxuICAgICAgICAgaWYgKHBhcmVudCkgJChwYXJlbnQpLmNoaWxkcmVuKFwiLnJldmVyc2VnaG9zdFwiKS5yZW1vdmUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gZ2V0UGluc0F0SG9sZShjb25uZWN0b3I6IENvbXBvbmVudC5UeXBlcy5ob2xlLCBhbGxDb25uZWN0b3JzOiBDb21wb25lbnQuVHlwZXMuY29ubmVjdG9yW10pIHtcclxuICAgICAgICAgbGV0IGFjY2VwdGVkVHlwZXMgPSBbXCJwaW5cIl07XHJcblxyXG4gICAgICAgICBsZXQgcG9pbnQgPSBjb25uZWN0b3IucG9pbnQ7XHJcbiAgICAgICAgIGxldCBhdHRhY2hlZENvbm5lY3RvcnM6IENvbXBvbmVudC5UeXBlcy5jb25uZWN0b3JbXSA9IGFsbENvbm5lY3RvcnMuZmlsdGVyKG90aGVyID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgYWNjZXB0ZWRUeXBlcy5pbmNsdWRlcyhvdGhlci50eXBlKVxyXG4gICAgICAgICAgICAgICAmJiB2ZWN0b3IocG9pbnQpLmlzQ2xvc2VUbyhvdGhlci5wb2ludClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgIHJldHVybiBhdHRhY2hlZENvbm5lY3RvcnM7XHJcbiAgICAgIH1cclxuICAgfVxyXG59XHJcbiJdfQ==