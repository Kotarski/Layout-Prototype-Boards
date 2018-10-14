"use strict";
var Svg;
(function (Svg) {
    var Addins;
    (function (Addins) {
        var Scaleable;
        (function (Scaleable) {
            Scaleable.init = (element, options = {}) => {
                let eventTarget = options.eventTarget !== undefined ? options.eventTarget : element;
                let mouseWheelHandler = (e) => {
                    if (e.buttons === 1 || e.buttons === 3) {
                        return;
                    }
                    let scaleChange = Math.sign(e.wheelDelta) * 0.05;
                    let clientBounds = element.getBoundingClientRect();
                    let owner = element.ownerSVGElement;
                    let rootClientBounds = (owner) ? owner.getBoundingClientRect() : {
                        left: 0,
                        top: 0
                    };
                    let clientStart = {
                        x: clientBounds.left - rootClientBounds.left,
                        y: clientBounds.top - rootClientBounds.top
                    };
                    let svgStart = svg(element).convertVector(clientStart, "DomToSvg", "absToDoc");
                    let svgSize = svg(element).convertVector({
                        x: clientBounds.width,
                        y: clientBounds.height
                    }, "DomToSvg", "absToDoc");
                    let mousePosDomFromCentre = {
                        x: e.clientX - (clientBounds.left + clientBounds.width / 2),
                        y: e.clientY - (clientBounds.top + clientBounds.height / 2)
                    };
                    let mousePosSvgFromCentre = svg(element).convertVector(mousePosDomFromCentre, "DomToSvg", "absToDoc");
                    let scale = {
                        x: 1 + scaleChange,
                        y: 1 + scaleChange
                    };
                    svg(element).scale(scale, true);
                    let scaleTranslationAdjust = {
                        x: (svgStart.x + svgSize.x / 2 + mousePosSvgFromCentre.x) * -scaleChange,
                        y: (svgStart.y + svgSize.y / 2 + mousePosSvgFromCentre.y) * -scaleChange
                    };
                    svg(element).translate(scaleTranslationAdjust, true);
                    if (options.onScale !== undefined) {
                        options.onScale(scale, scaleTranslationAdjust);
                    }
                };
                eventTarget.addEventListener("DOMMouseScroll", (e) => mouseWheelHandler(e), {
                    passive: true
                });
                eventTarget.addEventListener("mousewheel", (e) => mouseWheelHandler(e), {
                    passive: true
                });
            };
        })(Scaleable = Addins.Scaleable || (Addins.Scaleable = {}));
    })(Addins = Svg.Addins || (Svg.Addins = {}));
})(Svg || (Svg = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NhbGVhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdHlwZXNjcmlwdC9zdmcvYWRkaW5zL3NjYWxlYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxHQUFHLENBa0ZaO0FBbEZELFdBQVUsR0FBRztJQUFDLElBQUEsTUFBTSxDQWtGbkI7SUFsRmEsV0FBQSxNQUFNO1FBQUMsSUFBQSxTQUFTLENBa0Y3QjtRQWxGb0IsV0FBQSxTQUFTO1lBQ2QsY0FBSSxHQUFHLENBQUMsT0FBMkIsRUFBRSxVQUEyQixFQUFFLEVBQVEsRUFBRTtnQkFFdEYsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFHcEYsSUFBSSxpQkFBaUIsR0FBRyxDQUFDLENBQWEsRUFBRSxFQUFFO29CQUd2QyxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxFQUFFO3dCQUNyQyxPQUFPO3FCQUNUO29CQUdELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQztvQkFHakQsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixFQUFFLENBQUM7b0JBR25ELElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUM7b0JBQ3BDLElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUM5RCxJQUFJLEVBQUUsQ0FBQzt3QkFDUCxHQUFHLEVBQUUsQ0FBQztxQkFDUixDQUFDO29CQUNGLElBQUksV0FBVyxHQUFHO3dCQUNmLENBQUMsRUFBRSxZQUFZLENBQUMsSUFBSSxHQUFHLGdCQUFnQixDQUFDLElBQUk7d0JBQzVDLENBQUMsRUFBRSxZQUFZLENBQUMsR0FBRyxHQUFHLGdCQUFnQixDQUFDLEdBQUc7cUJBQzVDLENBQUM7b0JBR0YsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO29CQUMvRSxJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsYUFBYSxDQUFDO3dCQUN0QyxDQUFDLEVBQUUsWUFBWSxDQUFDLEtBQUs7d0JBQ3JCLENBQUMsRUFBRSxZQUFZLENBQUMsTUFBTTtxQkFDeEIsRUFDRSxVQUFVLEVBQ1YsVUFBVSxDQUNaLENBQUM7b0JBR0YsSUFBSSxxQkFBcUIsR0FBVzt3QkFDakMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO3dCQUMzRCxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7cUJBQzdELENBQUM7b0JBR0YsSUFBSSxxQkFBcUIsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsYUFBYSxDQUNuRCxxQkFBcUIsRUFDckIsVUFBVSxFQUNWLFVBQVUsQ0FDWixDQUFDO29CQUdGLElBQUksS0FBSyxHQUFHO3dCQUNULENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVzt3QkFDbEIsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXO3FCQUNwQixDQUFDO29CQUNGLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUdoQyxJQUFJLHNCQUFzQixHQUFHO3dCQUMxQixDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVzt3QkFDeEUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVc7cUJBQzFFLENBQUM7b0JBRUYsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFFckQsSUFBSSxPQUFPLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRTt3QkFDaEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztxQkFDakQ7Z0JBQ0osQ0FBQyxDQUFDO2dCQUlGLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsaUJBQWlCLENBQUMsQ0FBZSxDQUFDLEVBQUU7b0JBQ3ZGLE9BQU8sRUFBRSxJQUFJO2lCQUNmLENBQUMsQ0FBQztnQkFDSCxXQUFXLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFlLENBQUMsRUFBRTtvQkFDbkYsT0FBTyxFQUFFLElBQUk7aUJBQ2YsQ0FBQyxDQUFDO1lBQ04sQ0FBQyxDQUFBO1FBQ0osQ0FBQyxFQWxGb0IsU0FBUyxHQUFULGdCQUFTLEtBQVQsZ0JBQVMsUUFrRjdCO0lBQUQsQ0FBQyxFQWxGYSxNQUFNLEdBQU4sVUFBTSxLQUFOLFVBQU0sUUFrRm5CO0FBQUQsQ0FBQyxFQWxGUyxHQUFHLEtBQUgsR0FBRyxRQWtGWiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBTdmcuQWRkaW5zLlNjYWxlYWJsZSB7XHJcbiAgIGV4cG9ydCBjb25zdCBpbml0ID0gKGVsZW1lbnQ6IFNWR0dyYXBoaWNzRWxlbWVudCwgb3B0aW9uczogc2NhbGFibGVPcHRpb25zID0ge30pOiB2b2lkID0+IHtcclxuICAgICAgLy8gU2V0IHRoZSBldmVudCB0byBvY2N1ciBvbiBhbm90aGVyIHRhcmdldCwgYnV0IGFwcGx5IHRvIHlvdXJzZWxmXHJcbiAgICAgIGxldCBldmVudFRhcmdldCA9IG9wdGlvbnMuZXZlbnRUYXJnZXQgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuZXZlbnRUYXJnZXQgOiBlbGVtZW50O1xyXG5cclxuICAgICAgLy8gU2NhbGUgb2NjdXJzIG9uIG1vdXNld2hlZWxcclxuICAgICAgbGV0IG1vdXNlV2hlZWxIYW5kbGVyID0gKGU6IFdoZWVsRXZlbnQpID0+IHtcclxuICAgICAgICAgLy8gUHJldmVudCBzY2FsaW5nIGlmIGEgZHJhZyBpcyBpbiBwcm9ncmVzc1xyXG4gICAgICAgICAvLyBHcmlkIHNpemUgaXMgY2FsY3VsYXRlZCBvbiBkcmFnc3RhcnQgYW5kIHdpbGwgZ2V0IG1lc3NlZCB1cFxyXG4gICAgICAgICBpZiAoZS5idXR0b25zID09PSAxIHx8IGUuYnV0dG9ucyA9PT0gMykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIC8vIENoYW5nZSBzY2FsZSBieSArLy0wLjA1IG9uIGVhY2ggc3RlcCBkZXBlbmRpbmcgb24gd2hlZWwgZGlyZWN0aW9uXHJcbiAgICAgICAgIGxldCBzY2FsZUNoYW5nZSA9IE1hdGguc2lnbihlLndoZWVsRGVsdGEpICogMC4wNTtcclxuXHJcbiAgICAgICAgIC8vIEZpbmQgdGhlIHBvc3Rpb24gYW5kIHNpemUgb2YgdGhlIGVsZW1lbnQgb24gc2NyZWVuXHJcbiAgICAgICAgIGxldCBjbGllbnRCb3VuZHMgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgICAgICAgLy8gRmluZCB0aGUgcG9zaXRpb24gcmVsYXRpdmUgdG8gdGhlIFNWRyBwb3NpdGlvblxyXG4gICAgICAgICBsZXQgb3duZXIgPSBlbGVtZW50Lm93bmVyU1ZHRWxlbWVudDtcclxuICAgICAgICAgbGV0IHJvb3RDbGllbnRCb3VuZHMgPSAob3duZXIpID8gb3duZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkgOiB7XHJcbiAgICAgICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgICAgIHRvcDogMFxyXG4gICAgICAgICB9O1xyXG4gICAgICAgICBsZXQgY2xpZW50U3RhcnQgPSB7XHJcbiAgICAgICAgICAgIHg6IGNsaWVudEJvdW5kcy5sZWZ0IC0gcm9vdENsaWVudEJvdW5kcy5sZWZ0LFxyXG4gICAgICAgICAgICB5OiBjbGllbnRCb3VuZHMudG9wIC0gcm9vdENsaWVudEJvdW5kcy50b3BcclxuICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgIC8vIEZpbmQgdGhlIGVsZW1lbnRzIHJlbGF0aXZlIHBvc2l0aW9uIGluIGl0cyBvd24gY29vcmRpbmF0ZSBzeXN0ZW1cclxuICAgICAgICAgbGV0IHN2Z1N0YXJ0ID0gc3ZnKGVsZW1lbnQpLmNvbnZlcnRWZWN0b3IoY2xpZW50U3RhcnQsIFwiRG9tVG9TdmdcIiwgXCJhYnNUb0RvY1wiKTtcclxuICAgICAgICAgbGV0IHN2Z1NpemUgPSBzdmcoZWxlbWVudCkuY29udmVydFZlY3Rvcih7XHJcbiAgICAgICAgICAgIHg6IGNsaWVudEJvdW5kcy53aWR0aCxcclxuICAgICAgICAgICAgeTogY2xpZW50Qm91bmRzLmhlaWdodFxyXG4gICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIkRvbVRvU3ZnXCIsXHJcbiAgICAgICAgICAgIFwiYWJzVG9Eb2NcIlxyXG4gICAgICAgICApO1xyXG5cclxuICAgICAgICAgLy8gRmluZCB0aGUgcG9zaXRpb24gb2YgdGhlIG1vdXNlIHJlbGF0aXZlIHRvIHRoZSBjZW50cmUgb2YgdGhlIGVsZW1lbnQgb24gc2NyZWVuXHJcbiAgICAgICAgIGxldCBtb3VzZVBvc0RvbUZyb21DZW50cmU6IFZlY3RvciA9IHtcclxuICAgICAgICAgICAgeDogZS5jbGllbnRYIC0gKGNsaWVudEJvdW5kcy5sZWZ0ICsgY2xpZW50Qm91bmRzLndpZHRoIC8gMiksXHJcbiAgICAgICAgICAgIHk6IGUuY2xpZW50WSAtIChjbGllbnRCb3VuZHMudG9wICsgY2xpZW50Qm91bmRzLmhlaWdodCAvIDIpXHJcbiAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAvLyBGaW5kIHRoZSBwb3NpdGlvbiBvZiB0aGUgbW91c2UgcmVsYXRpdmUgdG8gdGhlIGNlbnRyZSBvZiB0aGUgZWxlbWVudCBpbiBpdHMgb3duIGNvb3JkaW5hdGUgc3lzdGVtXHJcbiAgICAgICAgIGxldCBtb3VzZVBvc1N2Z0Zyb21DZW50cmUgPSBzdmcoZWxlbWVudCkuY29udmVydFZlY3RvcihcclxuICAgICAgICAgICAgbW91c2VQb3NEb21Gcm9tQ2VudHJlLFxyXG4gICAgICAgICAgICBcIkRvbVRvU3ZnXCIsXHJcbiAgICAgICAgICAgIFwiYWJzVG9Eb2NcIlxyXG4gICAgICAgICApO1xyXG5cclxuICAgICAgICAgLy8gUGVyZm9ybSB0aGUgc2NhbGVcclxuICAgICAgICAgbGV0IHNjYWxlID0ge1xyXG4gICAgICAgICAgICB4OiAxICsgc2NhbGVDaGFuZ2UsXHJcbiAgICAgICAgICAgIHk6IDEgKyBzY2FsZUNoYW5nZVxyXG4gICAgICAgICB9O1xyXG4gICAgICAgICBzdmcoZWxlbWVudCkuc2NhbGUoc2NhbGUsIHRydWUpO1xyXG5cclxuICAgICAgICAgLy8gV29yayBvdXQgdGhlIHRyYW5zbGF0aW9uIHJlcXVpcmVkIHRvIGtlZXAgdGhlIGVsZW1lbnQgdW5kZXIgdGhlIG1vdXNlXHJcbiAgICAgICAgIGxldCBzY2FsZVRyYW5zbGF0aW9uQWRqdXN0ID0ge1xyXG4gICAgICAgICAgICB4OiAoc3ZnU3RhcnQueCArIHN2Z1NpemUueCAvIDIgKyBtb3VzZVBvc1N2Z0Zyb21DZW50cmUueCkgKiAtc2NhbGVDaGFuZ2UsXHJcbiAgICAgICAgICAgIHk6IChzdmdTdGFydC55ICsgc3ZnU2l6ZS55IC8gMiArIG1vdXNlUG9zU3ZnRnJvbUNlbnRyZS55KSAqIC1zY2FsZUNoYW5nZVxyXG4gICAgICAgICB9O1xyXG4gICAgICAgICAvLyBUcmFuc2xhdGVcclxuICAgICAgICAgc3ZnKGVsZW1lbnQpLnRyYW5zbGF0ZShzY2FsZVRyYW5zbGF0aW9uQWRqdXN0LCB0cnVlKTtcclxuXHJcbiAgICAgICAgIGlmIChvcHRpb25zLm9uU2NhbGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBvcHRpb25zLm9uU2NhbGUoc2NhbGUsIHNjYWxlVHJhbnNsYXRpb25BZGp1c3QpO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXJzIGZvciBtb3VzZXdoZWVsXHJcbiAgICAgIC8vIFR5cGVzY3JpcHQgZGVmaW5pdGlvbnMgZm9yIGFkZEV2ZW50TGlzdGVuZXIgYXJlIGluY29ycmVjdCAoYXMgYW55IHN1cnByZXNzZXMgd2FybmluZylcclxuICAgICAgZXZlbnRUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTU1vdXNlU2Nyb2xsXCIsIChlKSA9PiBtb3VzZVdoZWVsSGFuZGxlcihlIGFzIFdoZWVsRXZlbnQpLCB7XHJcbiAgICAgICAgIHBhc3NpdmU6IHRydWVcclxuICAgICAgfSk7IC8vIEZvciBGaXJlZm94XHJcbiAgICAgIGV2ZW50VGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXdoZWVsXCIsIChlKSA9PiBtb3VzZVdoZWVsSGFuZGxlcihlIGFzIFdoZWVsRXZlbnQpLCB7XHJcbiAgICAgICAgIHBhc3NpdmU6IHRydWVcclxuICAgICAgfSk7IC8vIEZvciBldmVyeW9uZSBlbHNlXHJcbiAgIH1cclxufVxyXG5cclxuaW50ZXJmYWNlIHNjYWxhYmxlT3B0aW9ucyB7XHJcbiAgIGV2ZW50VGFyZ2V0PzogU1ZHR0VsZW1lbnQ7XHJcbiAgIG9uU2NhbGU/OiAoc2NhbGU6IFZlY3RvciwgdHJhbnNsYXRpb246IFZlY3RvcikgPT4gdm9pZDtcclxufVxyXG5cclxuIl19