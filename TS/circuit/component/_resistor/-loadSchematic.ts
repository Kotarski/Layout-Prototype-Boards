namespace Circuit.Component._Resistor {
   export const loadSchematic: Component.Types.loadFunction<Classes.Schematic> = (raw: any) => {
      const name = (raw.name);
      const resistance = (raw.resistance || raw.value);
      //Joints Block
      const orientations: ["LR", "RL", "UD", "DU"] = ["LR", "RL", "UD", "DU"];
      const orientation = ValueCheck.validate(orientations, "LR")(raw.orientation, false);
      const where = ValueCheck.where({ x: 0, y: 0 })(raw.where, false);
      const joints = (raw.joints || deriveJoints(orientation, where));

      return makeSchematic({ name, resistance, joints, }, true);
   }

   const deriveJoints = (orientation: "LR" | "RL" | "UD" | "DU", where: Vector) => {
      const baseJoints = ({
         LR: [{ x: -30, y: 0 }, { x: 30, y: 0 }],
         UD: [{ x: 0, y: -30 }, { x: 0, y: 30 }],
         RL: [{ x: 30, y: 0 }, { x: -30, y: 0 }],
         DU: [{ x: 0, y: 30 }, { x: 0, y: -30 }]
      })[orientation] as [Vector, Vector];
      return vector(baseJoints).sumWith(where).vectors;
   }
}