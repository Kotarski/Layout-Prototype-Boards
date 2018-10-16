import makeLayout from "./-makeLayout"

export default function loadLayout(raw: any) {
   const name = (raw.name);
   const currentGain = (raw.currentGain);
   const type = (raw.type);
   const joints = (raw.joints);

   return makeLayout({ name, currentGain, type, joints });
}
