namespace Circuit.Component._Wire {
   export const loadSchematic: Component.Types.loadFunction<Classes.Schematic> = (raw: any) => {
      const name = (raw.name);
      //Joints Block
      const joints = (raw.joints);

      return makeSchematic({ name, joints });
   }
}