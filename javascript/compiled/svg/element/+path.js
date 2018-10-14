"use strict";
var Svg;
(function (Svg) {
    var Element;
    (function (Element) {
        var Path;
        (function (Path) {
            function make(path, classes = "") {
                const element = Element.make("path", classes);
                let pathString = (path instanceof Array) ? getLinePath(path) : path;
                element.setAttribute('d', pathString);
                return svg(element);
            }
            Path.make = make;
            function getLinePath(jointSet) {
                if (jointSet.length > 0 && jointSet[0] instanceof Array) {
                    let jointArrays = jointSet;
                    return jointArrays.map(getSingleLinePath).join();
                }
                else {
                    let joints = jointSet;
                    return getSingleLinePath(joints);
                }
            }
            function getSingleLinePath(joints) {
                if (joints.length < 1) {
                    return "";
                }
                else {
                    return "M" + joints[0].x + " " + joints[0].y
                        + joints.map(joint => "L" + joint.x + " " + joint.y).join();
                }
            }
        })(Path = Element.Path || (Element.Path = {}));
    })(Element = Svg.Element || (Svg.Element = {}));
})(Svg || (Svg = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiK3BhdGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90eXBlc2NyaXB0L3N2Zy9lbGVtZW50LytwYXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLEdBQUcsQ0EyQlo7QUEzQkQsV0FBVSxHQUFHO0lBQUMsSUFBQSxPQUFPLENBMkJwQjtJQTNCYSxXQUFBLE9BQU87UUFBQyxJQUFBLElBQUksQ0EyQnpCO1FBM0JxQixXQUFBLElBQUk7WUFFdkIsU0FBZ0IsSUFBSSxDQUFDLElBQXdDLEVBQUUsVUFBa0IsRUFBRTtnQkFDaEYsTUFBTSxPQUFPLEdBQW1CLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUM5RCxJQUFJLFVBQVUsR0FBRyxDQUFDLElBQUksWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3BFLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUN0QyxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2QixDQUFDO1lBTGUsU0FBSSxPQUtuQixDQUFBO1lBRUQsU0FBUyxXQUFXLENBQUMsUUFBbUM7Z0JBQ3JELElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxZQUFZLEtBQUssRUFBRTtvQkFDdEQsSUFBSSxXQUFXLEdBQUcsUUFBc0IsQ0FBQztvQkFDekMsT0FBTyxXQUFXLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUE7aUJBQ2xEO3FCQUFNO29CQUNKLElBQUksTUFBTSxHQUFHLFFBQW9CLENBQUM7b0JBQ2xDLE9BQU8saUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ25DO1lBQ0osQ0FBQztZQUVELFNBQVMsaUJBQWlCLENBQUMsTUFBZ0I7Z0JBQ3hDLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3BCLE9BQU8sRUFBRSxDQUFDO2lCQUNaO3FCQUFNO29CQUNKLE9BQU8sR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzBCQUN2QyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDakU7WUFDSixDQUFDO1FBQ0osQ0FBQyxFQTNCcUIsSUFBSSxHQUFKLFlBQUksS0FBSixZQUFJLFFBMkJ6QjtJQUFELENBQUMsRUEzQmEsT0FBTyxHQUFQLFdBQU8sS0FBUCxXQUFPLFFBMkJwQjtBQUFELENBQUMsRUEzQlMsR0FBRyxLQUFILEdBQUcsUUEyQloiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgU3ZnLkVsZW1lbnQuUGF0aCB7XHJcbiAgIGV4cG9ydCB0eXBlIHR5cGUgPSBSZXR1cm5UeXBlPHR5cGVvZiBtYWtlPjtcclxuICAgZXhwb3J0IGZ1bmN0aW9uIG1ha2UocGF0aDogc3RyaW5nIHwgKFZlY3RvcltdIHwgKFZlY3RvcltdKVtdKSwgY2xhc3Nlczogc3RyaW5nID0gXCJcIikge1xyXG4gICAgICBjb25zdCBlbGVtZW50OiBTVkdQYXRoRWxlbWVudCA9IEVsZW1lbnQubWFrZShcInBhdGhcIiwgY2xhc3Nlcyk7XHJcbiAgICAgIGxldCBwYXRoU3RyaW5nID0gKHBhdGggaW5zdGFuY2VvZiBBcnJheSkgPyBnZXRMaW5lUGF0aChwYXRoKSA6IHBhdGg7XHJcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdkJywgcGF0aFN0cmluZyk7XHJcbiAgICAgIHJldHVybiBzdmcoZWxlbWVudCk7XHJcbiAgIH1cclxuXHJcbiAgIGZ1bmN0aW9uIGdldExpbmVQYXRoKGpvaW50U2V0OiAoVmVjdG9yW10gfCAoVmVjdG9yW10pW10pKSB7XHJcbiAgICAgIGlmIChqb2ludFNldC5sZW5ndGggPiAwICYmIGpvaW50U2V0WzBdIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgbGV0IGpvaW50QXJyYXlzID0gam9pbnRTZXQgYXMgVmVjdG9yW11bXTtcclxuICAgICAgICAgcmV0dXJuIGpvaW50QXJyYXlzLm1hcChnZXRTaW5nbGVMaW5lUGF0aCkuam9pbigpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgIGxldCBqb2ludHMgPSBqb2ludFNldCBhcyBWZWN0b3JbXTtcclxuICAgICAgICAgcmV0dXJuIGdldFNpbmdsZUxpbmVQYXRoKGpvaW50cyk7XHJcbiAgICAgIH1cclxuICAgfVxyXG5cclxuICAgZnVuY3Rpb24gZ2V0U2luZ2xlTGluZVBhdGgoam9pbnRzOiBWZWN0b3JbXSkge1xyXG4gICAgICBpZiAoam9pbnRzLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgIHJldHVybiBcIk1cIiArIGpvaW50c1swXS54ICsgXCIgXCIgKyBqb2ludHNbMF0ueVxyXG4gICAgICAgICAgICArIGpvaW50cy5tYXAoam9pbnQgPT4gXCJMXCIgKyBqb2ludC54ICsgXCIgXCIgKyBqb2ludC55KS5qb2luKCk7XHJcbiAgICAgIH1cclxuICAgfVxyXG59Il19