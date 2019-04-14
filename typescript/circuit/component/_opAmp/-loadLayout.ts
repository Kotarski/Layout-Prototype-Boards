import makeLayout from "./-makeLayout"

export default function loadLayout(raw: any) {
   const offsetVoltage = (raw.offsetVoltage);
   const isDual = (raw.isDual);
   const joints = (raw.joints);

   return makeLayout({ offsetVoltage, isDual, joints });
}
