namespace Events {
   export const rotate: string = "rotate";
   export const drag: string = "drag";
   export const dragStart: string = "dragstart";
   export const dragStop: string = "dragstop";
   export const anyMove: string = [rotate, drag].join(" ");

   export const place: string = "place";

   export const select: string = "svgSelect";
   export const deselect: string = "svgDeselect";

   export const draw: string = "draw"
   export const anyDraw: string = [draw, place].join(" ");
}
export default Events;