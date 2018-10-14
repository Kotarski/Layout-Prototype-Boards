namespace Circuit.Component._OpAmp {
   export const loadLayout: Component.Types.loadFunction<Classes.Layout> = (raw: any) => {
      const name = (raw.name);
      const offsetVoltage = (raw.offsetVoltage);
      const isDual = (raw.isDual);
      const joints = (raw.joints);

      return makeLayout({ name, offsetVoltage, isDual, joints });
   }
}