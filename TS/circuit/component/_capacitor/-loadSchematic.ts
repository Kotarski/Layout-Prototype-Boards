namespace Circuit.Component._Capacitor {
   export const loadSchematic: Component.Types.loadFunction = (raw: any): Instance => {
      const name = (raw.name);
      const capacitance = (raw.capacitance || raw.value);
      //Polarisation Block
      const isPolarised = (raw.isPolarised || derivePolarisation(capacitance, raw.polarised));
      //Joints Block
      const orientations: ["LR", "RL", "UD", "DU"] = ["LR", "RL", "UD", "DU"];
      const orientation = ValueCheck.validate(orientations, "LR")(raw.orientation, false);
      const where = ValueCheck.where({ x: 0, y: 0 })(raw.where, false);
      const joints = (raw.joints || deriveJoints(orientation, where));

      return makeSchematic({ name, capacitance, isPolarised, joints }, true);
   }

   const derivePolarisation = (capacitance: number, polarisation?: "polar" | "non-polar") => {
      const isPolarValid = ValueCheck.test<"polar" | "non-polar">(["polar", "non-polar"]);
      return isPolarValid(polarisation) ? polarisation === "polar" : (capacitance > 1e-6);
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