namespace Events {
   export const rotate: string = "rotate";
   export const drag: string = "dragSVG";
   export const dragStart: string = "dragstart";
   export const dragStop: string = "dragstop";
   export const moved: string = [rotate, drag, dragStart, dragStop].join(" ");

   export const place: string = "place";

   export const select: string = "select";
   export const deselect: string = "deselect";
}