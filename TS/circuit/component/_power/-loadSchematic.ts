namespace Circuit.Component._Power {
   export const loadSchematic: Component.Types.loadFunction<Classes.Schematic> = (raw: any) => {
      const name = (raw.name);
      const voltage = (raw.voltage || raw.value);
      //Joints Block
      const where = ValueCheck.where({ x: 0, y: 0 })(raw.where, false);
      const joints = (raw.joints || deriveJoints(voltage, where));

      return makeSchematic({ name, voltage, joints, }, true);
   }

   const deriveJoints = (voltage: number, where: Vector) => {
      const baseJoints = (voltage < 0)
         ? [{ x: 0, y: -10 }] // negative
         : (voltage > 0)
            ? [{ x: 0, y: 10 }] // positive
            : [{ x: 0, y: -10 }]; // zero (ground)
      return vector(baseJoints).sumWith(where).vectors;
   }
}