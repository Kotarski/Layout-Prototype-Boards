import makeSchematic from "./-makeSchematic";
import ValueCheck from "../~valueCheck";
import vector, { Vector } from "../../../-vector";
import PowerMaps from "../_power/-maps"

export default function loadSchematic(raw: any) {
   const name = (raw.name);
   const offsetVoltage = (raw.offsetVoltage);

   //Joints Block
   const orientations: ["LR", "RL"] = ["LR", "RL"];
   const orientation = ValueCheck.validate(orientations, "LR")(raw.orientation);
   const inputsAtTop: ["inverting", "non-inverting"] = ["inverting", "non-inverting"]
   const inputAtTop = ValueCheck.validate(inputsAtTop, "non-inverting")(raw.whichInputAtTop);
   const where = ValueCheck.where({ x: 0, y: 0 })(raw.where);
   const joints = (raw.joints || deriveJoints(orientation, inputAtTop, where));

   const opAmp = makeSchematic({ name, offsetVoltage, joints });

   // Also make the power connections
   const isNumber = ValueCheck.test("number");
   const [minOutput, maxOutput] = [raw.minOutput, raw.maxOutput];
   if (isNumber(minOutput) && isNumber(maxOutput)) {

      const topPower = PowerMaps.schematic.make({
         voltage: maxOutput,
         joints: vector([{ x: 0, y: -20 }]).sumWith(where).vectors
      });

      const bottomPower = PowerMaps.schematic.make({
         voltage: minOutput,
         joints: vector([{ x: 0, y: 20 }]).sumWith(where).vectors
      });

      return [topPower, bottomPower, opAmp];
   } else {
      return opAmp;
   }
}

const deriveJoints = (orientation: "LR" | "RL", inputAtTop: "inverting" | "non-inverting", where: Vector) => {
   const [inHigh, inLow] = orientation === "LR"
      ? [{ x: -30, y: -10 }, { x: -30, y: +10 }]
      : [{ x: +30, y: -10 }, { x: +30, y: +10 }];

   const [inInverting, inNonInverting] = inputAtTop === "inverting"
      ? [inHigh, inLow] : [inLow, inHigh]

   const [out] = orientation === "LR"
      ? [{ x: +40, y: 0 }]
      : [{ x: -40, y: 0 }];

   const [powPositive, powNegative] = inputAtTop === "inverting"
      ? [{ x: 0, y: -20 }, { x: 0, y: +20 }]
      : [{ x: 0, y: +20 }, { x: 0, y: -20 }];

   return vector([inInverting, inNonInverting, out, powPositive, powNegative]).sumWith(where).vectors;
}
