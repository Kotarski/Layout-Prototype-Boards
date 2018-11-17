import makeLayout from "./-makeLayout"

export default function loadLayout(raw: any) {
   const name = (raw.name);
   const offsetVoltage = (raw.offsetVoltage);
   const isDual = (raw.isDual);
   const joints = (raw.joints);

   return makeLayout({ name, offsetVoltage, isDual, joints });
}
