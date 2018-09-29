namespace Circuit.Component._Resistor {
   export const loadLayout: Component.Types.loadFunction<Classes.Layout> = (raw: any) => {
      const name = (raw.name);
      const resistance = (raw.resistance);
      const joints = (raw.joints);

      return makeLayout({ name, resistance, joints }, true);
   }
}