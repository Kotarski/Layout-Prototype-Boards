import makeLayout from "./-makeLayout";

export default function loadLayout(raw: any) {
   const name = (raw.name);
   const rows = (raw.rows);
   const columns = (raw.columns);
   const trackBreaks = (raw.trackBreaks);
   const joints = (raw.joints);

   return makeLayout({ name, rows, columns, trackBreaks, joints });
}
