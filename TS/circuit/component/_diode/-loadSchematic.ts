namespace Circuit.Component._Diode {
   export const loadSchematic: Component.Types.loadFunction<Classes.Schematic> = (raw: any) => {
      const name = (raw.name);
      const breakdownVoltage = (raw.breakdownVoltage);
      const saturationCurrent = (raw.saturationCurrent);
      const color = (raw.color || raw.colour);
      //Joints Block
      const orientations: ["LR", "RL", "UD", "DU"] = ["LR", "RL", "UD", "DU"];
      const orientation = ValueCheck.validate(orientations, "LR")(raw.orientation);
      const where = ValueCheck.where({ x: 0, y: 0 })(raw.where);
      const joints = (raw.joints || deriveJoints(orientation, where));

      return makeSchematic({ name, breakdownVoltage, saturationCurrent, color, joints });
   }

   const deriveJoints = (orientation: "LR" | "RL" | "UD" | "DU", where: Vector) => {
      const baseJoints = ({
         LR: [{ x: -20, y: 0 }, { x: 20, y: 0 }],
         UD: [{ x: 0, y: -20 }, { x: 0, y: 20 }],
         RL: [{ x: 20, y: 0 }, { x: -20, y: 0 }],
         DU: [{ x: 0, y: 20 }, { x: 0, y: -20 }]
      })[orientation] as [Vector, Vector];
      return vector(baseJoints).sumWith(where).vectors;
   }
}