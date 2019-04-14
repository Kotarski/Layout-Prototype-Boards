import makeLayout from "./-makeLayout";

export default function loadLayout(raw: any) {
   const rows = (raw.rows);
   const columns = (raw.columns);
   const trackBreaks = (raw.trackBreaks);
   const joints = (raw.joints);

   return makeLayout({ rows, columns, trackBreaks, joints });
}
