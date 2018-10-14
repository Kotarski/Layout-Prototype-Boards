namespace Circuit.Component._Power {
   export const loadLayout: Component.Types.loadFunction<Classes.Layout> = (raw: any) => {
      const name = (raw.name);
      const voltage = (raw.voltage);
      const joints = (raw.joints);

      return makeLayout({ name, voltage, joints });
   }
}