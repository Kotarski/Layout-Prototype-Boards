import makeLayout from "./-makeLayout"

export default function loadLayout(raw: any) {
   const currentGain = (raw.currentGain);
   const type = (raw.type);
   const joints = (raw.joints);

   return makeLayout({ currentGain, type, joints });
}
