namespace Circuit.Component._Bipolar {
   export const loadSchematic: Component.Types.loadFunction = (raw: any): Instance => {
      const name = (raw.name);
      const currentGain = (raw.currentGain);
      const type = (raw.type);
      // Joints Block
      const orientation = ValueCheck.validate<"LR" | "RL">(["LR", "RL"], "LR")(raw.orientation, false);
      const where = ValueCheck.where({ x: 0, y: 0 })(raw.where, false);
      const joints = (raw.joints || deriveJoints(orientation, type, where));

      return makeSchematic({ name, currentGain, type, joints }, true);
   }

   const deriveJoints = (orientation: "LR" | "RL", type: "NPN" | "PNP", where: Vector) => {
      const [emitter, collector] = type === "PNP"
         ? [{ x: 0, y: -50 }, { x: 0, y: +50 }]
         : [{ x: 0, y: +50 }, { x: 0, y: -50 }];

      const [base, offset] = orientation === "LR"
         ? [{ x: -60, y: 0 }, { x: +10 }]
         : [{ x: +60, y: 0 }, { x: -10 }];

      return vector([emitter, collector, base]).sumWith(where, offset).vectors;
   }
}