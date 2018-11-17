import makeLayout from "./-makeLayout"

export default function loadLayout(raw: any) {
   const name = (raw.name);
   const voltage = (raw.voltage);
   const joints = (raw.joints);

   return makeLayout({ name, voltage, joints });
}
