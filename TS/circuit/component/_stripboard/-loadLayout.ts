namespace Circuit.Component._Stripboard {
   export const loadLayout: Component.Types.loadFunction<Classes.Layout> = (raw: any) => {
      const name = (raw.name);
      const rows = (raw.rows);
      const columns = (raw.columns);
      const trackBreaks = (raw.trackBreaks);
      const joints = (raw.joints);

      return makeLayout({ name, rows, columns, trackBreaks, joints }, true);
   }
}