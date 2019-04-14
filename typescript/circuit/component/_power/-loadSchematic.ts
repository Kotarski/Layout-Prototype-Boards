import makeSchematic from "./-makeSchematic";
import vector, { Vector } from "../../../-vector";
import ValueCheck from "../~valueCheck";

export default function loadSchematic(raw: any) {
   const voltage = (raw.voltage || raw.value);
   //Joints Block
   const where = ValueCheck.where({ x: 0, y: 0 })(raw.where);
   const joints = (raw.joints || deriveJoints(voltage, where));

   return makeSchematic({ voltage, joints, });
}

const deriveJoints = (voltage: number, where: Vector) => {
   const baseJoints = (voltage < 0)
      ? [{ x: 0, y: -10 }] // negative
      : (voltage > 0)
         ? [{ x: 0, y: 10 }] // positive
         : [{ x: 0, y: -10 }]; // zero (ground)
   return vector(baseJoints).sumWith(where).vectors;
}
