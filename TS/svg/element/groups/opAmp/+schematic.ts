namespace Svg.Element.Group.OpAmp.Schematic {
   export type type = ReturnType<typeof make>;
   export function make(
      inPEnd: Vector,
      inNEnd: Vector,
      outEnd: Vector,
      powPEnd: Vector,
      powNEnd: Vector,
      classes: string = ""
   ) {
      const bodyGroup = Group.make(classes);

      // Same as vector([{ x: 7, y: 6 }, { x: 7, y: -6 }, { x: -7, y: 0 }, { x: 7, y: 6 }])
      //    .rotate(149 | -31).sumWith({ x: 18, y: -9.2 } | { x: 6, y: -16.4 })
      // let arrowJoints = (type === "PNP")
      //    ? [{ x: 15, y: -18 }, { x: 9, y: -7.5 }, { x: 24, y: -5.5 }, { x: 15, y: -18 }]
      //    : [{ x: 9, y: -7.5 }, { x: 15, y: -18 }, { x: 0, y: -20 }, { x: 9, y: -7.5 }];

      let bodyJoints = [{ x: -25, y: -25 }, { x: 25, y: 0 }, { x: -25, y: 25 }, { x: -25, y: -25 }];

      // The drawings orientation (before transforms) is: 
      //   emitter at the top
      //   collector at the bottom
      //   base to the right
      bodyGroup.append(

         //Highlight
         Svg.Element.Path.make(bodyJoints, "highlight highlightwithfill extrathick"),
         //Main body triangle
         Svg.Element.Path.make(bodyJoints, "body white"),

         //Plus
         Svg.Element.Line.make({ x: -22, y: -10 }, { x: -14, y: -10 }, "line thin"),
         Svg.Element.Line.make({ x: -18, y: -6 }, { x: -18, y: -14 }, "line thin"),

         //Minus
         Svg.Element.Line.make({ x: -22, y: +10 }, { x: -14, y: +10 }, "line thin"),
      );


      // Image centre does not take base into account
      // Is always directly between the emitter and collector
      let centre = vector(powPEnd, powNEnd).centre().vector;

      // all angles are relative to the x-axis, hence in default orientation:
      //   when no rotation is required, angleEmitterCentre = 90, 
      let angleCentreBase = vector(centre).getAngleTo(outEnd);
      let angleInPInN = vector(powPEnd).getAngleTo(powNEnd);

      let rotation = angleInPInN - 90;

      // Don't ask.
      let scale = (((angleInPInN - angleCentreBase + 360) % 360) > 180)
         ? { x: -1 }
         : { x: 1 };

      // Only the start of the connections should be transformed, 
      // the ends should be absolute.
      // (Hence using vector transforms, not svg transforms)
      let [inPStart, inNStart, outStart, powPStart, powNStart]: Vector[] = vector(
         { x: -25, y: -10 }, { x: -25, y: 10 }, { x: 25, y: 0 }, { x: 0, y: -13 }, { x: 0, y: 13 }
      ).scaleWith(scale).rotate(-rotation).sumWith(centre).vectors;


      let joints = [
         [inPStart, inPEnd],
         [inNStart, inNEnd],
         [outStart, outEnd],
         [powPStart, powPEnd],
         [powNStart, powNEnd],
      ]

      return [
         bodyGroup.translate(centre).rotate(rotation).scale(scale, false),
         Svg.Element.Path.make(joints, "line thin"),
      ];
   }
}

// let inversionScale: Vector = {
//    x: (this.orientation === "LR") ? 1 : -1,
//    y: (this.whichInputAtTop === "non-inverting") ? 1 : -1
// };





