import makeLayout from "./-makeLayout"

export default function loadLayout(raw: any) {
   const voltage = (raw.voltage);
   const joints = (raw.joints);

   return makeLayout({ voltage, joints });
}
