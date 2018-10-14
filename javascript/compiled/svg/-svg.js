"use strict";
function svg(element) {
    let extension = {
        element: element
    };
    let elementExtension = (element instanceof SVGGraphicsElement) ? {
        rotate: Svg.Element.Functions.rotate(element),
        translate: Svg.Element.Functions.translate(element),
        scale: Svg.Element.Functions.scale(element),
        getTransforms: Svg.Element.Functions.getTransforms(element),
        setTransforms: Svg.Element.Functions.setTransforms(element),
        convertVector: Svg.Element.Functions.convertVector(element),
    } : null;
    let groupExtension = (element instanceof SVGGElement || element instanceof SVGSVGElement) ? {
        append: Svg.Element.Group.Functions.append(element),
        prepend: Svg.Element.Group.Functions.prepend(element),
        clearChildren: Svg.Element.Group.Functions.clearChildren(element)
    } : null;
    let textExtension = (element instanceof SVGTextElement) ? {
        followPath: Svg.Element.Text.Functions.followPath(element),
        rotatePosition: Svg.Element.Text.Functions.rotatePosition(element),
    } : null;
    return Object.assign({}, extension, elementExtension, groupExtension, textExtension);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLXN2Zy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3R5cGVzY3JpcHQvc3ZnLy1zdmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFNBQVMsR0FBRyxDQUF1QixPQUFVO0lBRTFDLElBQUksU0FBUyxHQUFHO1FBQ2IsT0FBTyxFQUFFLE9BQU87S0FDbEIsQ0FBQTtJQUVELElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxPQUFPLFlBQVksa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUQsTUFBTSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDN0MsU0FBUyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7UUFDbkQsS0FBSyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDM0MsYUFBYSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7UUFDM0QsYUFBYSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7UUFDM0QsYUFBYSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7S0FDN0QsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBRVQsSUFBSSxjQUFjLEdBQUcsQ0FBQyxPQUFPLFlBQVksV0FBVyxJQUFJLE9BQU8sWUFBWSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekYsTUFBTSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ25ELE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUNyRCxhQUFhLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7S0FDbkUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBRVQsSUFBSSxhQUFhLEdBQUcsQ0FBQyxPQUFPLFlBQVksY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELFVBQVUsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztRQUMxRCxjQUFjLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7S0FDcEUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBRVQsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLGFBQWEsQ0FLbEYsQ0FBQTtBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBzdmc8VCBleHRlbmRzIFNWR0VsZW1lbnQ+KGVsZW1lbnQ6IFQpIHtcclxuXHJcbiAgIGxldCBleHRlbnNpb24gPSB7XHJcbiAgICAgIGVsZW1lbnQ6IGVsZW1lbnRcclxuICAgfVxyXG5cclxuICAgbGV0IGVsZW1lbnRFeHRlbnNpb24gPSAoZWxlbWVudCBpbnN0YW5jZW9mIFNWR0dyYXBoaWNzRWxlbWVudCkgPyB7XHJcbiAgICAgIHJvdGF0ZTogU3ZnLkVsZW1lbnQuRnVuY3Rpb25zLnJvdGF0ZShlbGVtZW50KSxcclxuICAgICAgdHJhbnNsYXRlOiBTdmcuRWxlbWVudC5GdW5jdGlvbnMudHJhbnNsYXRlKGVsZW1lbnQpLFxyXG4gICAgICBzY2FsZTogU3ZnLkVsZW1lbnQuRnVuY3Rpb25zLnNjYWxlKGVsZW1lbnQpLFxyXG4gICAgICBnZXRUcmFuc2Zvcm1zOiBTdmcuRWxlbWVudC5GdW5jdGlvbnMuZ2V0VHJhbnNmb3JtcyhlbGVtZW50KSxcclxuICAgICAgc2V0VHJhbnNmb3JtczogU3ZnLkVsZW1lbnQuRnVuY3Rpb25zLnNldFRyYW5zZm9ybXMoZWxlbWVudCksXHJcbiAgICAgIGNvbnZlcnRWZWN0b3I6IFN2Zy5FbGVtZW50LkZ1bmN0aW9ucy5jb252ZXJ0VmVjdG9yKGVsZW1lbnQpLFxyXG4gICB9IDogbnVsbDtcclxuXHJcbiAgIGxldCBncm91cEV4dGVuc2lvbiA9IChlbGVtZW50IGluc3RhbmNlb2YgU1ZHR0VsZW1lbnQgfHwgZWxlbWVudCBpbnN0YW5jZW9mIFNWR1NWR0VsZW1lbnQpID8ge1xyXG4gICAgICBhcHBlbmQ6IFN2Zy5FbGVtZW50Lkdyb3VwLkZ1bmN0aW9ucy5hcHBlbmQoZWxlbWVudCksXHJcbiAgICAgIHByZXBlbmQ6IFN2Zy5FbGVtZW50Lkdyb3VwLkZ1bmN0aW9ucy5wcmVwZW5kKGVsZW1lbnQpLFxyXG4gICAgICBjbGVhckNoaWxkcmVuOiBTdmcuRWxlbWVudC5Hcm91cC5GdW5jdGlvbnMuY2xlYXJDaGlsZHJlbihlbGVtZW50KVxyXG4gICB9IDogbnVsbDtcclxuXHJcbiAgIGxldCB0ZXh0RXh0ZW5zaW9uID0gKGVsZW1lbnQgaW5zdGFuY2VvZiBTVkdUZXh0RWxlbWVudCkgPyB7XHJcbiAgICAgIGZvbGxvd1BhdGg6IFN2Zy5FbGVtZW50LlRleHQuRnVuY3Rpb25zLmZvbGxvd1BhdGgoZWxlbWVudCksXHJcbiAgICAgIHJvdGF0ZVBvc2l0aW9uOiBTdmcuRWxlbWVudC5UZXh0LkZ1bmN0aW9ucy5yb3RhdGVQb3NpdGlvbihlbGVtZW50KSxcclxuICAgfSA6IG51bGw7XHJcblxyXG4gICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgZXh0ZW5zaW9uLCBlbGVtZW50RXh0ZW5zaW9uLCBncm91cEV4dGVuc2lvbiwgdGV4dEV4dGVuc2lvbikgYXMgKFxyXG4gICAgICAodHlwZW9mIGV4dGVuc2lvbikgJlxyXG4gICAgICAoVCBleHRlbmRzIFNWR0dyYXBoaWNzRWxlbWVudCA/IE5vbk51bGxhYmxlPHR5cGVvZiBlbGVtZW50RXh0ZW5zaW9uPiA6IHt9KSAmXHJcbiAgICAgIChUIGV4dGVuZHMgU1ZHR0VsZW1lbnQgfCBTVkdTVkdFbGVtZW50ID8gTm9uTnVsbGFibGU8dHlwZW9mIGdyb3VwRXh0ZW5zaW9uPiA6IHt9KSAmXHJcbiAgICAgIChUIGV4dGVuZHMgU1ZHVGV4dEVsZW1lbnQgPyBOb25OdWxsYWJsZTx0eXBlb2YgdGV4dEV4dGVuc2lvbj4gOiB7fSlcclxuICAgKVxyXG59XHJcblxyXG5cclxuIl19