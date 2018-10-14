export default function getAngleTo(inVector) {
    return (compareVector) => {
        return Math.atan2(compareVector.y - inVector.y, compareVector.x - inVector.x) * 180 / Math.PI;
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLWdldEFuZ2xlVG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90eXBlc2NyaXB0L192ZWN0b3IvLWdldEFuZ2xlVG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsTUFBTSxDQUFDLE9BQU8sVUFBVSxVQUFVLENBQW1CLFFBQVc7SUFDN0QsT0FBTyxDQUFDLGFBQXFCLEVBQUUsRUFBRTtRQUM5QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ2pHLENBQUMsQ0FBQTtBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vLXZlY3RvclwiO1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRBbmdsZVRvPFQgZXh0ZW5kcyBWZWN0b3I+KGluVmVjdG9yOiBUKSB7XHJcbiAgIHJldHVybiAoY29tcGFyZVZlY3RvcjogVmVjdG9yKSA9PiB7XHJcbiAgICAgIHJldHVybiBNYXRoLmF0YW4yKGNvbXBhcmVWZWN0b3IueSAtIGluVmVjdG9yLnksIGNvbXBhcmVWZWN0b3IueCAtIGluVmVjdG9yLngpICogMTgwIC8gTWF0aC5QSTtcclxuICAgfVxyXG59XHJcblxyXG4iXX0=