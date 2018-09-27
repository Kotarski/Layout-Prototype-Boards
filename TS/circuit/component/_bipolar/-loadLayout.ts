namespace Circuit.Component._Bipolar {
   export const loadLayout: Component.Types.loadFunction = (raw: any): Instance => {
      const name = (raw.name);
      const currentGain = (raw.currentGain);
      const type = (raw.type);
      const joints = (raw.joints);

      return makeLayout({ name, currentGain, type, joints }, true);
   }
}