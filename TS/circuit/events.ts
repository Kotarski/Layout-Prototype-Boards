namespace Circuit.Events {
   export const rotate: string = "rotate";
   export const drag: string = "dragSVG";
   export const dragStart: string = "dragstart";
   export const dragStop: string = "dragstop";
   export const moved: string = [rotate, drag, dragStart, dragStop].join(" ");

   export const place: string = "place";

   export const select: string = "svgSelect";
   export const deselect: string = "svgDeselect";

   export const draw: string = "draw";
}