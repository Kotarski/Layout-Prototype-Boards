namespace Circuit.Component._Wire {
   export const loadLayout: Component.Types.loadFunction<Classes.Layout> = (raw: any) => {
      const name = (raw.name);
      const color = (raw.color || raw.colour);
      //Joints Block
      const joints = (raw.joints);

      return makeLayout({ name, color, joints }, true);
   }
}