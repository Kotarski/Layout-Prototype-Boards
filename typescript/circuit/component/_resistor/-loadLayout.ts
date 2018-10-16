import makeLayout from "./-makeLayout"

export default function loadLayout(raw: any) {
   const name = (raw.name);
   const resistance = (raw.resistance);
   const joints = (raw.joints);

   return makeLayout({ name, resistance, joints });
}
