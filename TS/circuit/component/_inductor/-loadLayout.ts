namespace Circuit.Component._Inductor {
   export const loadLayout: Component.Types.loadFunction<Classes.Layout> = (raw: any) => {
      const name = (raw.name);
      const inductance = (raw.inductance);
      const joints = (raw.joints);

      return makeLayout({ name, inductance, joints }, true);
   }
}