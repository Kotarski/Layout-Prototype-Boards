import makeLayout from "./-makeLayout"

export default function loadLayout(raw: any) {
   const name = (raw.name);
   const capacitance = (raw.capacitance);
   const isPolarised = (raw.isPolarised);
   const joints = (raw.joints);

   return makeLayout({ name, capacitance, isPolarised, joints });

}