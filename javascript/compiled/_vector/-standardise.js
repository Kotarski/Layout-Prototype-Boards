import { isLVector, isUVector, isVectorArray } from "./-isVector";
export default function standardise(inVectors, ...moreVectors) {
    if (typeof inVectors === "number") {
        return { x: inVectors, y: inVectors };
    }
    const vectorsAsArray = ((isVectorArray(inVectors)) ? inVectors : [inVectors]);
    const moreVectorsAsArray = ((moreVectors !== undefined) ? moreVectors : []);
    const standardised = (vectorsAsArray.concat(moreVectorsAsArray)).map(inVector => {
        if (isLVector(inVector)) {
            return { x: inVector.x, y: inVector.y };
        }
        else if (isUVector(inVector)) {
            return { x: inVector.X, y: inVector.Y };
        }
        else if (inVector instanceof Array && (typeof inVector[0] === "number") && (typeof inVector[1] === "number")) {
            return { x: inVector[0], y: inVector[1] };
        }
        else {
            console.error("IS NOT A VECTOR");
            return { x: NaN, y: NaN };
        }
    });
    if (standardised.length > 1 || isVectorArray(inVectors)) {
        return standardised;
    }
    else {
        return standardised[0];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLXN0YW5kYXJkaXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdHlwZXNjcmlwdC9fdmVjdG9yLy1zdGFuZGFyZGlzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUE7QUFPakUsTUFBTSxDQUFDLE9BQU8sVUFBVSxXQUFXLENBQUMsU0FBMkMsRUFBRSxHQUFHLFdBQXdCO0lBRXpHLElBQUksT0FBTyxTQUFTLEtBQUssUUFBUSxFQUFFO1FBQ2hDLE9BQU8sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQztLQUN4QztJQUVELE1BQU0sY0FBYyxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFxQixDQUFDO0lBQ2xHLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLFdBQVcsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQXFCLENBQUM7SUFFaEcsTUFBTSxZQUFZLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDN0UsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDdEIsT0FBTyxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDMUM7YUFBTSxJQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM3QixPQUFPLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUMxQzthQUFNLElBQUksUUFBUSxZQUFZLEtBQUssSUFBSSxDQUFDLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDLEVBQUU7WUFDN0csT0FBTyxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1NBQzVDO2FBQU07WUFFVyxPQUFPLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUE7WUFDL0MsT0FBTyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1NBQzVCO0lBQ0osQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUN0RCxPQUFPLFlBQVksQ0FBQztLQUN0QjtTQUFNO1FBQ0osT0FBTyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDeEI7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmVjdG9yLCBBbnlWZWN0b3IgfSBmcm9tIFwiLi4vLXZlY3RvclwiO1xyXG5pbXBvcnQgeyBpc0xWZWN0b3IsIGlzVVZlY3RvciwgaXNWZWN0b3JBcnJheSB9IGZyb20gXCIuLy1pc1ZlY3RvclwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdGFuZGFyZGlzZShpblZlY3RvcjogQW55VmVjdG9yKTogVmVjdG9yO1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdGFuZGFyZGlzZShpblZlY3RvcjogbnVtYmVyKTogVmVjdG9yO1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdGFuZGFyZGlzZShpblZlY3RvcnM6IEFueVZlY3RvcltdKTogVmVjdG9yW107XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0YW5kYXJkaXNlKGluVmVjdG9yOiBBbnlWZWN0b3IsIC4uLm1vcmVWZWN0b3JzOiBBbnlWZWN0b3JbXSk6IFZlY3RvcltdO1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdGFuZGFyZGlzZShpblZlY3RvcnM6IEFueVZlY3RvciB8IEFueVZlY3RvcltdIHwgbnVtYmVyLCAuLi5tb3JlVmVjdG9yczogQW55VmVjdG9yW10pOiBWZWN0b3IgfCBWZWN0b3JbXTtcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RhbmRhcmRpc2UoaW5WZWN0b3JzOiBBbnlWZWN0b3IgfCBBbnlWZWN0b3JbXSB8IG51bWJlciwgLi4ubW9yZVZlY3RvcnM6IEFueVZlY3RvcltdKTogVmVjdG9yIHwgVmVjdG9yW10ge1xyXG5cclxuICAgaWYgKHR5cGVvZiBpblZlY3RvcnMgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgcmV0dXJuIHsgeDogaW5WZWN0b3JzLCB5OiBpblZlY3RvcnMgfTtcclxuICAgfVxyXG5cclxuICAgY29uc3QgdmVjdG9yc0FzQXJyYXkgPSAoKGlzVmVjdG9yQXJyYXkoaW5WZWN0b3JzKSkgPyBpblZlY3RvcnMgOiBbaW5WZWN0b3JzXSkgYXMgQXJyYXk8QW55VmVjdG9yPjtcclxuICAgY29uc3QgbW9yZVZlY3RvcnNBc0FycmF5ID0gKChtb3JlVmVjdG9ycyAhPT0gdW5kZWZpbmVkKSA/IG1vcmVWZWN0b3JzIDogW10pIGFzIEFycmF5PEFueVZlY3Rvcj47XHJcblxyXG4gICBjb25zdCBzdGFuZGFyZGlzZWQgPSAodmVjdG9yc0FzQXJyYXkuY29uY2F0KG1vcmVWZWN0b3JzQXNBcnJheSkpLm1hcChpblZlY3RvciA9PiB7XHJcbiAgICAgIGlmIChpc0xWZWN0b3IoaW5WZWN0b3IpKSB7XHJcbiAgICAgICAgIHJldHVybiB7IHg6IGluVmVjdG9yLngsIHk6IGluVmVjdG9yLnkgfTtcclxuICAgICAgfSBlbHNlIGlmIChpc1VWZWN0b3IoaW5WZWN0b3IpKSB7XHJcbiAgICAgICAgIHJldHVybiB7IHg6IGluVmVjdG9yLlgsIHk6IGluVmVjdG9yLlkgfTtcclxuICAgICAgfSBlbHNlIGlmIChpblZlY3RvciBpbnN0YW5jZW9mIEFycmF5ICYmICh0eXBlb2YgaW5WZWN0b3JbMF0gPT09IFwibnVtYmVyXCIpICYmICh0eXBlb2YgaW5WZWN0b3JbMV0gPT09IFwibnVtYmVyXCIpKSB7XHJcbiAgICAgICAgIHJldHVybiB7IHg6IGluVmVjdG9yWzBdLCB5OiBpblZlY3RvclsxXSB9O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL1RPRE8gXHJcbiAgICAgICAgICAgIC8qTE9HU1RBUlQqL2NvbnNvbGUuZXJyb3IoXCJJUyBOT1QgQSBWRUNUT1JcIikvKkxPR0VORCovXHJcbiAgICAgICAgIHJldHVybiB7IHg6IE5hTiwgeTogTmFOIH07XHJcbiAgICAgIH1cclxuICAgfSk7XHJcblxyXG4gICBpZiAoc3RhbmRhcmRpc2VkLmxlbmd0aCA+IDEgfHwgaXNWZWN0b3JBcnJheShpblZlY3RvcnMpKSB7XHJcbiAgICAgIHJldHVybiBzdGFuZGFyZGlzZWQ7XHJcbiAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBzdGFuZGFyZGlzZWRbMF1cclxuICAgfVxyXG59XHJcblxyXG4iXX0=