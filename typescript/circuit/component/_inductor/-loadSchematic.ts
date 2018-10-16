import makeSchematic from "./-makeSchematic";
import ValueCheck from "../~valueCheck";
import vector, { Vector } from "../../../-vector"

export default function loadSchematic(raw: any) {
   const name = (raw.name);
   const inductance = (raw.inductance || raw.value);
   //Joints Block
   const orientations: ["LR", "RL", "UD", "DU"] = ["LR", "RL", "UD", "DU"];
   const orientation = ValueCheck.validate(orientations, "LR")(raw.orientation);
   const where = ValueCheck.where({ x: 0, y: 0 })(raw.where);
   const joints = (raw.joints || deriveJoints(orientation, where));

   return makeSchematic({ name, inductance, joints, });
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
