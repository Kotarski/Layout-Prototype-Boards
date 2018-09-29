namespace Circuit.Component._Breadboard {
   export const loadLarge: Component.Types.loadFunction<Classes.Large> = (raw: any) => {
      const name = (raw.name);
      const joints = (raw.joints);

      return makeLarge({ name, joints }, true);
   }
}