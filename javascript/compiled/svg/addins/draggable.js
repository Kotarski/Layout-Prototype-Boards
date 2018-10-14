"use strict";
var Svg;
(function (Svg) {
    var Addins;
    (function (Addins) {
        var Draggable;
        (function (Draggable) {
            Draggable.init = (element, options = {}) => {
                let eventTarget = options.eventTarget !== undefined ? options.eventTarget : element;
                let grid = options.grid !== undefined ? options.grid : {
                    x: 10,
                    y: 10
                };
                let styleClass = options.styleClass !== undefined ? options.styleClass : "dragging";
                let lastPosition;
                if ($(eventTarget).draggable("instance") === undefined) {
                    $(eventTarget).draggable({
                        start: (event, ui) => {
                            $(element).addClass(styleClass);
                            if (grid !== "off") {
                                let gridSvg = svg(element).convertVector(grid, "SvgToDom", "absToDoc");
                                $(eventTarget).draggable("option", "grid", [gridSvg.x, gridSvg.y]);
                            }
                            lastPosition = {
                                x: ui.originalPosition.left,
                                y: ui.originalPosition.top
                            };
                        },
                        drag: (event, ui) => {
                            let dragChangeDom = {
                                x: ui.position.left - lastPosition.x,
                                y: ui.position.top - lastPosition.y
                            };
                            let dragChangeSvg = svg(element).convertVector(dragChangeDom, "DomToSvg", "absToDoc");
                            if (!vector(dragChangeSvg).isCloseTo({ x: 0, y: 0 })) {
                                $(eventTarget).trigger(Circuit.Events.drag, [ui, dragChangeSvg]);
                                lastPosition = {
                                    x: ui.position.left,
                                    y: ui.position.top
                                };
                            }
                        },
                        stop: (event, ui) => {
                            $(element).removeClass(styleClass);
                            element.transform.baseVal.consolidate();
                        }
                    });
                }
                if (options.onDrag !== undefined) {
                    $(eventTarget).on(Circuit.Events.drag, (e, ui, drag) => {
                        if ($(e.target).closest(".ui-draggable").is(eventTarget)) {
                            if (options.onDrag)
                                options.onDrag(drag, e);
                        }
                    });
                }
                ;
                if (options.disableMovement !== true) {
                    $(eventTarget).on(Circuit.Events.drag, (e, ui, drag) => {
                        if ($(e.target).closest(".ui-draggable").is(eventTarget)) {
                            svg(element).translate(drag, true);
                        }
                    });
                }
                if (options.constrainWith !== undefined) {
                    $(eventTarget).on("dragSVGConstraintCheck", (e, ui, dragSvg, dragDom) => {
                        if (options.constrainWith)
                            if (options.constrainWith(dragSvg)) {
                                dragSvg.x = 0;
                                dragSvg.y = 0;
                                ui.position.top = lastPosition.y;
                                ui.position.left = lastPosition.x;
                            }
                    });
                }
                if (options.onStart !== undefined) {
                    $(eventTarget).on(Circuit.Events.dragStart, (e, ui) => {
                        if (options.onStart)
                            options.onStart(e);
                    });
                }
                if (options.onStop !== undefined) {
                    $(eventTarget).on(Circuit.Events.dragStop, (e, ui) => {
                        if (options.onStop)
                            options.onStop(e);
                    });
                }
                if (options.useHelper === true) {
                    $(eventTarget).draggable("option", "helper", () => document.createElement("div"));
                }
            };
        })(Draggable = Addins.Draggable || (Addins.Draggable = {}));
    })(Addins = Svg.Addins || (Svg.Addins = {}));
})(Svg || (Svg = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2dhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdHlwZXNjcmlwdC9zdmcvYWRkaW5zL2RyYWdnYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxHQUFHLENBeUlaO0FBeklELFdBQVUsR0FBRztJQUFDLElBQUEsTUFBTSxDQXlJbkI7SUF6SWEsV0FBQSxNQUFNO1FBQUMsSUFBQSxTQUFTLENBeUk3QjtRQXpJb0IsV0FBQSxTQUFTO1lBQ2QsY0FBSSxHQUFHLENBQUMsT0FBMkIsRUFBRSxVQUE0QixFQUFFLEVBQVEsRUFBRTtnQkFHdkYsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFJcEYsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNwRCxDQUFDLEVBQUUsRUFBRTtvQkFDTCxDQUFDLEVBQUUsRUFBRTtpQkFDUCxDQUFDO2dCQU1GLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7Z0JBRXBGLElBQUksWUFBb0IsQ0FBQztnQkFHekIsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxLQUFLLFNBQVMsRUFBRTtvQkFDckQsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFNBQVMsQ0FBQzt3QkFFdEIsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFOzRCQUVsQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzRCQUdoQyxJ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QVEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRTt3QkFDbEQsSUFBSSxPQUFPLENBQUMsTUFBTTs0QkFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN6QyxDQUFDLENBQUMsQ0FBQztpQkFDTDtnQkFTRCxJQUFJLE9BQU8sQ0FBQyxTQUFTLEtBQUssSUFBSSxFQUFFO29CQUM3QixDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUNwRjtZQUNKLENBQUMsQ0FBQTtRQUNKLENBQUMsRUF6SW9CLFNBQVMsR0FBVCxnQkFBUyxLQUFULGdCQUFTLFFBeUk3QjtJQUFELENBQUMsRUF6SWEsTUFBTSxHQUFOLFVBQU0sS0FBTixVQUFNLFFBeUluQjtBQUFELENBQUMsRUF6SVMsR0FBRyxLQUFILEdBQUcsUUF5SVoiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgU3ZnLkFkZGlucy5EcmFnZ2FibGUge1xyXG4gICBleHBvcnQgY29uc3QgaW5pdCA9IChlbGVtZW50OiBTVkdHcmFwaGljc0VsZW1lbnQsIG9wdGlvbnM6IGRyYWdnYWJsZU9wdGlvbnMgPSB7fSk6IHZvaWQgPT4ge1xyXG4gICAgICAvLyBBbGxvdyBhbiBvYmplY3QgdG8gYmUgZHJhZ2dlZC5cclxuICAgICAgLy8gU2V0IHRoZSBkcmFnIGV2ZW50IHRvIG9jY3VyIG9uIGFub3RoZXIgdGFyZ2V0LCBidXQgYXBwbHkgdGhlIGRyYWcgdG8geW91cnNlbGZcclxuICAgICAgbGV0IGV2ZW50VGFyZ2V0ID0gb3B0aW9ucy5ldmVudFRhcmdldCAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5ldmVudFRhcmdldCA6IGVsZW1lbnQ7XHJcblxyXG4gICAgICAvLyBUaGUgZGVmYXVsdCBncmlkIHdpbGwgc25hcCB0byBib2FyZCBob2xlcywgdGhlIG9wdGlvbiBjYW4gcHJldmVudCB0aGlzIG9yIHJlZGVmaW5lIHRoZSBzaXplXHJcbiAgICAgIC8vIFRPRE8gVVNFIENPTlNUQU5UXHJcbiAgICAgIGxldCBncmlkID0gb3B0aW9ucy5ncmlkICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmdyaWQgOiB7XHJcbiAgICAgICAgIHg6IDEwLFxyXG4gICAgICAgICB5OiAxMFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gQ2hhbmdlcyB0aGUgZHJhZ2dhYmxlcyBwb3NpdGlvbiBpbiB0aGUgZG9jdW1lbnQgdHJlZSwgZGVmYXVsdCBpcyB0byBub3RcclxuICAgICAgLy8gbGV0IG1vdmVUb1RvcCA9IChvcHRpb25zLm1vdmVUb1RvcCAhPT0gdW5kZWZpbmVkKSA/IChvcHRpb25zLm1vdmVUb1RvcCkgOiBcIm5vXCI7XHJcblxyXG4gICAgICAvLyBTdHlsZXMgdGhlIGRyYWdnYWJsZVxyXG4gICAgICBsZXQgc3R5bGVDbGFzcyA9IG9wdGlvbnMuc3R5bGVDbGFzcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5zdHlsZUNsYXNzIDogXCJkcmFnZ2luZ1wiO1xyXG5cclxuICAgICAgbGV0IGxhc3RQb3NpdGlvbjogVmVjdG9yO1xyXG5cclxuICAgICAgLy8gU2V0IHRvIGRyYWdnYWJsZSAoSlF1ZXJ5IFVJKVxyXG4gICAgICBpZiAoJChldmVudFRhcmdldCkuZHJhZ2dhYmxlKFwiaW5zdGFuY2VcIikgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAkKGV2ZW50VGFyZ2V0KS5kcmFnZ2FibGUoe1xyXG4gICAgICAgICAgICAvL09uIGRyYWcgc3RhcnRcclxuICAgICAgICAgICAgc3RhcnQ6IChldmVudCwgdWkpID0+IHtcclxuICAgICAgICAgICAgICAgLy8gQWRkIGNsYXNzIGZvciB2aXN1YWwgZmVlZGJhY2sgKG9wYWNpdHkpXHJcbiAgICAgICAgICAgICAgICQoZWxlbWVudCkuYWRkQ2xhc3Moc3R5bGVDbGFzcyk7XHJcblxyXG4gICAgICAgICAgICAgICAvL0VuYWJsZSBncmlkIHNuYXBwaW5nLCB0aGUgZGVmYXVsdCBncmlkIHdpbGwgc25hcCB0byBib2FyZCBob2xlc1xyXG4gICAgICAgICAgICAgICBpZiAoZ3JpZCAhPT0gXCJvZmZcIikge1xyXG4gICAgICAgICAgICAgICAgICBsZXQgZ3JpZFN2ZyA9IHN2ZyhlbGVtZW50KS5jb252ZXJ0VmVjdG9yKGdyaWQsIFwiU3ZnVG9Eb21cIiwgXCJhYnNUb0RvY1wiKTtcclxuICAgICAgICAgICAgICAgICAgJChldmVudFRhcmdldCkuZHJhZ2dhYmxlKFwib3B0aW9uXCIsIFwiZ3JpZFwiLCBbZ3JpZFN2Zy54LCBncmlkU3ZnLnldKTtcclxuICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgbGFzdFBvc2l0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICB4OiB1aS5vcmlnaW5hbFBvc2l0aW9uLmxlZnQsXHJcbiAgICAgICAgICAgICAgICAgIHk6IHVpLm9yaWdpbmFsUG9zaXRpb24udG9wXHJcbiAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vT24gZWFjaCBkcmFnIHN0ZXBcclxuICAgICAgICAgICAgZHJhZzogKGV2ZW50LCB1aSkgPT4ge1xyXG4gICAgICAgICAgICAgICAvLyBBbW91bnQgZHJhZ2dlZCBvbiB0aGlzIHN0ZXAgKEluIERPTSBjb29yZGluYXRlIHN5c3RlbSlcclxuXHJcbiAgICAgICAgICAgICAgIGxldCBkcmFnQ2hhbmdlRG9tID0ge1xyXG4gICAgICAgICAgICAgICAgICB4OiB1aS5wb3NpdGlvbi5sZWZ0IC0gbGFzdFBvc2l0aW9uLngsXHJcbiAgICAgICAgICAgICAgICAgIHk6IHVpLnBvc2l0aW9uLnRvcCAtIGxhc3RQb3NpdGlvbi55XHJcbiAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAvLyBDb252ZXJ0IGFtb3VudCBkcmFnZ2VkIHRoaXMgc3RlcCB0byB0aGUgY29vcmRpbmF0ZSBzeXN0ZW0gb2YgdGhlIHN2ZyBlbGVtZW50XHJcbiAgICAgICAgICAgICAgIGxldCBkcmFnQ2hhbmdlU3ZnID0gc3ZnKGVsZW1lbnQpLmNvbnZlcnRWZWN0b3IoZHJhZ0NoYW5nZURvbSwgXCJEb21Ub1N2Z1wiLCBcImFic1RvRG9jXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgLy8gb25seSBkbyB0aGUgaW50ZXJlc3RpbmcgdGhpbmdzIHdoZW4gdGhlIGRyYWdnYWJsZSBhY3R1YWxseSBtb3Zlcy5cclxuICAgICAgICAgICAgICAgaWYgKCF2ZWN0b3IoZHJhZ0NoYW5nZVN2ZykuaXNDbG9zZVRvKHsgeDogMCwgeTogMCB9KSkge1xyXG4gICAgICAgICAgICAgICAgICAvL0NhbGwgb24gZHJhZyBmdW5jdGlvbnMgKHZpYSBhIGN1c3RvbSBldmVudCBsaXN0ZW5lclxyXG4gICAgICAgICAgICAgICAgICAvL3NvIHdlIGNhbiBrZWVwIHRoZSBzdmcgZHJhZyB2YWx1ZXNcclxuICAgICAgICAgICAgICAgICAgJChldmVudFRhcmdldCkudHJpZ2dlcihDaXJjdWl0LkV2ZW50cy5kcmFnLCBbdWksIGRyYWdDaGFuZ2VTdmddKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGxhc3RQb3NpdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgeDogdWkucG9zaXRpb24ubGVmdCxcclxuICAgICAgICAgICAgICAgICAgICAgeTogdWkucG9zaXRpb24udG9wXHJcbiAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgIC8vQ2FsbCBjb25zdHJhaW50IGZ1bmN0aW9ucyAodmlhIGEgY3VzdG9tIGV2ZW50IGxpc3RlbmVyXHJcbiAgICAgICAgICAgICAgIC8vICQoZXZlbnRUYXJnZXQpLnRyaWdnZXJIYW5kbGVyKFwiZHJhZ1NWR0NvbnN0cmFpbnRDaGVja1wiLCBbXHJcbiAgICAgICAgICAgICAgIC8vICAgIHVpLFxyXG4gICAgICAgICAgICAgICAvLyAgICBkcmFnQ2hhbmdlU3ZnLFxyXG4gICAgICAgICAgICAgICAvLyAgICBkcmFnQ2hhbmdlRG9tXHJcbiAgICAgICAgICAgICAgIC8vIF0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vT24gZHJhZyBzdG9wXHJcbiAgICAgICAgICAgIHN0b3A6IChldmVudCwgdWkpID0+IHtcclxuICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGNsYXNzIGZvciB2aXN1YWwgZmVlZGJhY2sgKG9wYWNpdHkpXHJcbiAgICAgICAgICAgICAgICQoZWxlbWVudCkucmVtb3ZlQ2xhc3Moc3R5bGVDbGFzcyk7XHJcbiAgICAgICAgICAgICAgIGVsZW1lbnQudHJhbnNmb3JtLmJhc2VWYWwuY29uc29saWRhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKG9wdGlvbnMub25EcmFnICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgJChldmVudFRhcmdldCkub24oQ2lyY3VpdC5FdmVudHMuZHJhZywgKGUsIHVpLCBkcmFnKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KFwiLnVpLWRyYWdnYWJsZVwiKS5pcyhldmVudFRhcmdldCkpIHtcclxuICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMub25EcmFnKSBvcHRpb25zLm9uRHJhZyhkcmFnLCBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9KTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIFRyYW5zbGF0ZSBieSBkcmFnZ2VkIGFtb3VudCBpZiBtb3ZlbWVudCBub3QgZGlzYWJsZWRcclxuICAgICAgaWYgKG9wdGlvbnMuZGlzYWJsZU1vdmVtZW50ICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICQoZXZlbnRUYXJnZXQpLm9uKENpcmN1aXQuRXZlbnRzLmRyYWcsIChlLCB1aSwgZHJhZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdChcIi51aS1kcmFnZ2FibGVcIikuaXMoZXZlbnRUYXJnZXQpKSB7XHJcbiAgICAgICAgICAgICAgIHN2ZyhlbGVtZW50KS50cmFuc2xhdGUoZHJhZywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChvcHRpb25zLmNvbnN0cmFpbldpdGggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAkKGV2ZW50VGFyZ2V0KS5vbihcclxuICAgICAgICAgICAgXCJkcmFnU1ZHQ29uc3RyYWludENoZWNrXCIsXHJcbiAgICAgICAgICAgIChlLCB1aSwgZHJhZ1N2ZzogVmVjdG9yLCBkcmFnRG9tOiBWZWN0b3IpID0+IHtcclxuICAgICAgICAgICAgICAgLy8gSWYgYm90aCBjb21wb25lbnRzIG9mIHRoZSBkcmFnIGFyZSB0b28gbXVjaC4uLlxyXG4gICAgICAgICAgICAgICBpZiAob3B0aW9ucy5jb25zdHJhaW5XaXRoKSBpZiAob3B0aW9ucy5jb25zdHJhaW5XaXRoKGRyYWdTdmcpKSB7XHJcbiAgICAgICAgICAgICAgICAgIC8vIERvbid0IGxldCBpdCBtb3ZlXHJcbiAgICAgICAgICAgICAgICAgIGRyYWdTdmcueCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgIGRyYWdTdmcueSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgIHVpLnBvc2l0aW9uLnRvcCA9IGxhc3RQb3NpdGlvbi55O1xyXG4gICAgICAgICAgICAgICAgICB1aS5wb3NpdGlvbi5sZWZ0ID0gbGFzdFBvc2l0aW9uLng7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChvcHRpb25zLm9uU3RhcnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAkKGV2ZW50VGFyZ2V0KS5vbihDaXJjdWl0LkV2ZW50cy5kcmFnU3RhcnQsIChlLCB1aSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5vblN0YXJ0KSBvcHRpb25zLm9uU3RhcnQoZSk7XHJcbiAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAob3B0aW9ucy5vblN0b3AgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAkKGV2ZW50VGFyZ2V0KS5vbihDaXJjdWl0LkV2ZW50cy5kcmFnU3RvcCwgKGUsIHVpKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLm9uU3RvcCkgb3B0aW9ucy5vblN0b3AoZSk7XHJcbiAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBXaGVuIGRyYWdnaW5nIGludGVybmFsIHN2ZyBlbGVtZW50cywgSlF1ZXJ5VUkgZG9lcyBub3Qga25vdyBob3cgdG8gbW92ZSB0aGVtLlxyXG4gICAgICAvLyBUaGlzIGlzIGRvbmUgbWFudWFsbHkgaW4gdGhlIG9uZHJhZyBoYW5kbGVyIF5cclxuICAgICAgLy8gRm9yIHRoZSB0b3AgbGV2ZWwgZ3JvdXAsIHRoZSBTVkcgZWxlbWVudCBpcyB1c2VkIGFzIHRoZSB0YXJnZXQgYXMgdGhlXHJcbiAgICAgIC8vIGdyb3VwIGRvZXMgbm90IGZpbGwgdGhlIHBhbmUuXHJcbiAgICAgIC8vIEpRdWVyeVVJIGtub3dzIGhvdyB0byBkcmFnIHRoZSBTVkcgZWxlbWVudCBhbmQgd2lsbCBkbyBzby4gVGhpcyBpc1xyXG4gICAgICAvLyB1bmRlc2lyYWJsZSBhcyBvbmx5IHRoZSB2aWV3IG5lZWRzIHRvIGNoYW5nZS5cclxuICAgICAgLy8gVXNpbmcgYSBoZWxwZXIgcHJldmVudHMgdGhlIFNWRyBiZWluZyBtb3ZlZCBvbiB0aGUgcGFnZS5cclxuICAgICAgaWYgKG9wdGlvbnMudXNlSGVscGVyID09PSB0cnVlKSB7XHJcbiAgICAgICAgICQoZXZlbnRUYXJnZXQpLmRyYWdnYWJsZShcIm9wdGlvblwiLCBcImhlbHBlclwiLCAoKSA9PiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcclxuICAgICAgfVxyXG4gICB9XHJcbn1cclxuXHJcbmludGVyZmFjZSBkcmFnZ2FibGVPcHRpb25zIHtcclxuICAgZGlzYWJsZU1vdmVtZW50PzogYm9vbGVhbjsgLy9BbGwgb3RoZXIgb3B0aW9ucyBpZ25vcmVkIGlmIHRoaXMgaXMgdHJ1ZVxyXG4gICBvbkRyYWc/OiAoZHJhZzogVmVjdG9yLCBlPzogSlF1ZXJ5RXZlbnRPYmplY3QpID0+IHZvaWQ7XHJcbiAgIG9uU3RvcD86IChlPzogSlF1ZXJ5RXZlbnRPYmplY3QpID0+IHZvaWQ7XHJcbiAgIG9uU3RhcnQ/OiAoZT86IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB2b2lkO1xyXG4gICBjb25zdHJhaW5XaXRoPzogKGRyYWc6IFZlY3RvciwgZT86IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiBib29sZWFuO1xyXG4gICB1c2VIZWxwZXI/OiBib29sZWFuO1xyXG4gICBldmVudFRhcmdldD86IFNWR0dyYXBoaWNzRWxlbWVudCB8IFNWR0dyYXBoaWNzRWxlbWVudFtdO1xyXG4gICBncmlkPzogVmVjdG9yIHwgXCJvZmZcIjtcclxuICAgc3R5bGVDbGFzcz86IHN0cmluZztcclxufVxyXG5cclxuIl19