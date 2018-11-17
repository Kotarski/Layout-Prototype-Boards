import makeLayout from "./-makeLayout"

export default function loadLayout(raw: any) {
   const name = (raw.name);
   const inductance = (raw.inductance);
   const joints = (raw.joints);

   return makeLayout({ name, inductance, joints });
}
