namespace Circuit.Component._Breadboard {
   export const loadSmall: Component.Types.loadFunction<Classes.Small> = (raw: any) => {
      const name = (raw.name);
      const joints = (raw.joints);

      return makeSmall({ name, joints }, true);
   }
}