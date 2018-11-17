import makeSchematic from "./-makeSchematic";
import ValueCheck from "../~valueCheck";
import vector, { Vector } from "../../../-vector";

export default function loadSchematic(raw: any) {
   const name = (raw.name);
   const capacitance = (raw.capacitance || raw.value);
   //Polarisation Block
   const isPolarised = (raw.isPolarised || derivePolarisation(capacitance, raw.polarised));
   //Joints Block
   type orientation = "LR" | "RL" | "UD" | "DU";
   const orientations: orientation[] = ["LR", "RL", "UD", "DU"];
   const orientation = ValueCheck.validate<orientation>(orientations, "LR")(raw.orientation);
   const where = ValueCheck.where({ x: 0, y: 0 })(raw.where);
   const joints = (raw.joints || deriveJoints(orientation, where));

   return makeSchematic({ name, capacitance, isPolarised, joints });
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
