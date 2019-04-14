import makeLayout from "./-makeLayout"

export default function loadLayout(raw: any) {
   const resistance = (raw.resistance);
   const joints = (raw.joints);

   return makeLayout({ resistance, joints });
}
