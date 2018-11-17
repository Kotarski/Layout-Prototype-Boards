import makeSchematic from "./-makeSchematic";
import vector, { Vector } from "../../../-vector";
import ValueCheck from "../~valueCheck"

export default function loadSchematic(raw: any) {
   const name = (raw.name);
   const currentGain = (raw.currentGain);
   const type = (raw.type);
   // Joints Block
   const orientation = ValueCheck.validate<"LR" | "RL">(["LR", "RL"], "LR")(raw.orientation);
   const where = ValueCheck.where({ x: 0, y: 0 })(raw.where);
   const joints = (raw.joints || deriveJoints(orientation, type, where));

   return makeSchematic({ name, currentGain, type, joints });
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
