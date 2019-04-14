import makeLayout from "./-makeLayout"

export default function loadLayout(raw: any) {
   const capacitance = (raw.capacitance);
   const isPolarised = (raw.isPolarised);
   const joints = (raw.joints);

   return makeLayout({ capacitance, isPolarised, joints });

}