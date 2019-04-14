import makeLayout from "./-makeLayout"

export default function loadLayout(raw: any) {
   const inductance = (raw.inductance);
   const joints = (raw.joints);

   return makeLayout({ inductance, joints });
}
