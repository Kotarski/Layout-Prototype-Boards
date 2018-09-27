namespace Circuit.Component._Capacitor {
   export const loadLayout: Component.Types.loadFunction = (raw: any): Instance => {
      const name = (raw.name);
      const capacitance = (raw.capacitance);
      const isPolarised = (raw.isPolarised);
      const joints = (raw.joints);

      return makeLayout({ name, capacitance, isPolarised, joints }, true);
   }
}