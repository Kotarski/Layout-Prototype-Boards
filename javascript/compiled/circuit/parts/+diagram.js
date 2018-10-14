"use strict";
var Circuit;
(function (Circuit) {
    var Parts;
    (function (Parts) {
        class Diagram {
            constructor(node) {
                this.root = new Svg.Root();
                this.group = this.root.group;
                this.root.draw(node);
            }
        }
        Parts.Diagram = Diagram;
    })(Parts = Circuit.Parts || (Circuit.Parts = {}));
})(Circuit || (Circuit = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiK2RpYWdyYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90eXBlc2NyaXB0L2NpcmN1aXQvcGFydHMvK2RpYWdyYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLElBQVUsT0FBTyxDQVloQjtBQVpELFdBQVUsT0FBTztJQUFDLElBQUEsS0FBSyxDQVl0QjtJQVppQixXQUFBLEtBQUs7UUFDcEIsTUFBYSxPQUFPO1lBTWpCLFlBQVksSUFBb0I7Z0JBSmhDLFNBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsVUFBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUlyQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QixDQUFDO1NBRUg7UUFWWSxhQUFPLFVBVW5CLENBQUE7SUFDSixDQUFDLEVBWmlCLEtBQUssR0FBTCxhQUFLLEtBQUwsYUFBSyxRQVl0QjtBQUFELENBQUMsRUFaUyxPQUFPLEtBQVAsT0FBTyxRQVloQiIsInNvdXJjZXNDb250ZW50IjpbIi8vVE9ETyBGT0xERVIgU1RSVUNUVVJFXHJcblxyXG5uYW1lc3BhY2UgQ2lyY3VpdC5QYXJ0cyB7XHJcbiAgIGV4cG9ydCBjbGFzcyBEaWFncmFtIHtcclxuICAgICAgLy8gRm9yIFNlbGZcclxuICAgICAgcm9vdCA9IG5ldyBTdmcuUm9vdCgpO1xyXG4gICAgICBncm91cCA9IHRoaXMucm9vdC5ncm91cDtcclxuXHJcbiAgICAgIC8vIE1ha2UgYW5kIGRyYXcgdGhpc1xyXG4gICAgICBjb25zdHJ1Y3Rvcihub2RlOiBIVE1MRGl2RWxlbWVudCkge1xyXG4gICAgICAgICB0aGlzLnJvb3QuZHJhdyhub2RlKTtcclxuICAgICAgfVxyXG5cclxuICAgfVxyXG59Il19