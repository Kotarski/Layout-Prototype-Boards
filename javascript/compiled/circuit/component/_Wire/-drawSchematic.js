"use strict";
var Circuit;
(function (Circuit) {
    var Component;
    (function (Component) {
        var _Wire;
        (function (_Wire) {
            function drawSchematic(instance) {
                return [
                    Svg.Element.Path.make(instance.joints, "line thin")
                ];
            }
            _Wire.drawSchematic = drawSchematic;
        })(_Wire = Component._Wire || (Component._Wire = {}));
    })(Component = Circuit.Component || (Circuit.Component = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLWRyYXdTY2hlbWF0aWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvY29tcG9uZW50L193aXJlLy1kcmF3U2NoZW1hdGljLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE9BQU8sQ0FNaEI7QUFORCxXQUFVLE9BQU87SUFBQyxJQUFBLFNBQVMsQ0FNMUI7SUFOaUIsV0FBQSxTQUFTO1FBQUMsSUFBQSxLQUFLLENBTWhDO1FBTjJCLFdBQUEsS0FBSztZQUM5QixTQUFnQixhQUFhLENBQUMsUUFBMkI7Z0JBQ3RELE9BQU87b0JBQ0osR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDO2lCQUNyRCxDQUFDO1lBQ0wsQ0FBQztZQUplLG1CQUFhLGdCQUk1QixDQUFBO1FBQ0osQ0FBQyxFQU4yQixLQUFLLEdBQUwsZUFBSyxLQUFMLGVBQUssUUFNaEM7SUFBRCxDQUFDLEVBTmlCLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBTTFCO0FBQUQsQ0FBQyxFQU5TLE9BQU8sS0FBUCxPQUFPLFFBTWhCIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIENpcmN1aXQuQ29tcG9uZW50Ll9XaXJlIHtcclxuICAgZXhwb3J0IGZ1bmN0aW9uIGRyYXdTY2hlbWF0aWMoaW5zdGFuY2U6IENsYXNzZXMuU2NoZW1hdGljKSB7XHJcbiAgICAgIHJldHVybiBbXHJcbiAgICAgICAgIFN2Zy5FbGVtZW50LlBhdGgubWFrZShpbnN0YW5jZS5qb2ludHMsIFwibGluZSB0aGluXCIpXHJcbiAgICAgIF07XHJcbiAgIH1cclxufVxyXG4iXX0=