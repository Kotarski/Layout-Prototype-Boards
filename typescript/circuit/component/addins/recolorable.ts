import Component from "../../+component";;
import Events from "../../events";
import toVector from "../../../utility/polar/-toVector"
import vector, { Vector } from "../../../-vector";
import { makeCircle as makeCircle } from "../../../svg/element/+circle";
import { makeRect as makeRect } from "../../../svg/element/+rect";
import { makeGroup as makeGroup } from "../../../svg/element/+group";
//import * as $ from 'jquery';

type colorPalette = string[];
type recolorableComponent = Component & { color: string, joints: Vector[] };

const Recolorable = (() => {
   const init = (
      component: recolorableComponent, options: {
         colorPalette?: colorPalette
      } = {}) => {
      let {
         colorPalette = defaultColorPalette,
      } = { ...options }


      const element = component.group.element;

      $(element).on(Events.select, () => {
         createRecolorHandle(component, colorPalette);
      });
      $(element).on(Events.draw, () => {
         clearRecolorHandle(component);
         createRecolorHandle(component, colorPalette);
      });
      $(element).on(Events.deselect, () => {
         clearRecolorHandle(component);
      });
   }

   const createRecolorHandle = (component: recolorableComponent, colorPalette: colorPalette) => {

      const position = getRecolorPosition(component);

      const recolorSegmentGroup = makeGroup("recolorSegmentGroup");
      const recolorHandle = makeCircle(position, 7, "handle recolorHandle");

      //Segments
      const segment1 = makeRect(
         position, { width: 10, height: 20 }, undefined, "recolorHandleSegment"
      ).rotate(45, position).translate({ x: -4, y: -4 });
      const segment2 = makeRect(
         position, { width: 10, height: 20 }, undefined, "recolorHandleSegment"
      ).rotate(45, position).translate({ x: 4, y: 4 });

      $(segment1.element).css("fill", "#4fd56b");
      $(segment2.element).css("fill", "#d54f6b");

      recolorSegmentGroup.append(segment1, segment2)
      component.group.append(recolorHandle, recolorSegmentGroup);

      $(recolorHandle.element).on("click", () => {
         let colorIndex = colorPalette.indexOf(component.color);
         let color: string;
         if (colorIndex >= 0) {
            color = colorPalette[(colorIndex + 1) % colorPalette.length];
         } else {
            color = colorPalette[0];
         };
         component.color = color;
         $(component.group.element).trigger(Events.draw);
      })
   }

   const clearRecolorHandle = (component: recolorableComponent) => {
      $(component.group.element).find(".recolorHandle").remove();
      $(component.group.element).find(".recolorSegmentGroup").remove();
   }

   const getRecolorPosition = (component: recolorableComponent): Vector => {
      const angle = vector(component.joints[0]).getAngleTo(component.joints[1]);
      const offset = toVector(12, angle + 45);
      return vector(component.joints[0]).sumWith(offset).vector;
   }

   const defaultColorPalette: colorPalette = [
      "#545454", //"Black"
      "red",
      "#7575FF", // Blue
      "#946857", // Brown
      "#55DD55", // Green
      "#FFEF00", // Yellow
      "pink"
   ]

   return { init }
})()
export default Recolorable;