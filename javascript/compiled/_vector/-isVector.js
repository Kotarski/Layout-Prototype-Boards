export function isVector(inVector) {
    return inVector && (isLVector(inVector) || isUVector(inVector));
}
export function isVectorArray(inVectors) {
    return (inVectors instanceof Array &&
        inVectors.every(isVector));
}
export function isLVector(inVector) {
    return ((typeof inVector.x === 'number') &&
        (typeof inVector.y === 'number'));
}
export function isUVector(inVector) {
    return ((typeof inVector.X === 'number') &&
        (typeof inVector.Y === 'number'));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLWlzVmVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdHlwZXNjcmlwdC9fdmVjdG9yLy1pc1ZlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLFVBQVUsUUFBUSxDQUFDLFFBQWE7SUFDbkMsT0FBTyxRQUFRLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDbkUsQ0FBQztBQUVELE1BQU0sVUFBVSxhQUFhLENBQUMsU0FBYztJQUN6QyxPQUFPLENBQ0osU0FBUyxZQUFZLEtBQUs7UUFDMUIsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FDM0IsQ0FBQztBQUNMLENBQUM7QUFFRCxNQUFNLFVBQVUsU0FBUyxDQUFDLFFBQWE7SUFDcEMsT0FBTyxDQUNKLENBQUMsT0FBTyxRQUFRLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FBQztRQUNoQyxDQUFDLE9BQU8sUUFBUSxDQUFDLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FDbEMsQ0FBQztBQUNMLENBQUM7QUFFRCxNQUFNLFVBQVUsU0FBUyxDQUFDLFFBQWE7SUFDcEMsT0FBTyxDQUNKLENBQUMsT0FBTyxRQUFRLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FBQztRQUNoQyxDQUFDLE9BQU8sUUFBUSxDQUFDLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FDbEMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWZWN0b3IsIEFueVZlY3RvciwgVVZlY3RvciB9IGZyb20gXCIuLi8tdmVjdG9yXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNWZWN0b3IoaW5WZWN0b3I6IGFueSk6IGluVmVjdG9yIGlzIEFueVZlY3RvciB7XHJcbiAgIHJldHVybiBpblZlY3RvciAmJiAoaXNMVmVjdG9yKGluVmVjdG9yKSB8fCBpc1VWZWN0b3IoaW5WZWN0b3IpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVmVjdG9yQXJyYXkoaW5WZWN0b3JzOiBhbnkpOiBpblZlY3RvcnMgaXMgQW55VmVjdG9yW10ge1xyXG4gICByZXR1cm4gKFxyXG4gICAgICBpblZlY3RvcnMgaW5zdGFuY2VvZiBBcnJheSAmJlxyXG4gICAgICBpblZlY3RvcnMuZXZlcnkoaXNWZWN0b3IpXHJcbiAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0xWZWN0b3IoaW5WZWN0b3I6IGFueSk6IGluVmVjdG9yIGlzIFZlY3RvciB7XHJcbiAgIHJldHVybiAoXHJcbiAgICAgICh0eXBlb2YgaW5WZWN0b3IueCA9PT0gJ251bWJlcicpICYmXHJcbiAgICAgICh0eXBlb2YgaW5WZWN0b3IueSA9PT0gJ251bWJlcicpXHJcbiAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1VWZWN0b3IoaW5WZWN0b3I6IGFueSk6IGluVmVjdG9yIGlzIFVWZWN0b3Ige1xyXG4gICByZXR1cm4gKFxyXG4gICAgICAodHlwZW9mIGluVmVjdG9yLlggPT09ICdudW1iZXInKSAmJlxyXG4gICAgICAodHlwZW9mIGluVmVjdG9yLlkgPT09ICdudW1iZXInKVxyXG4gICApO1xyXG59XHJcbiJdfQ==