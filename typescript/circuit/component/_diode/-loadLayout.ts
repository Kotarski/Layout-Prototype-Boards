import makeLayout from "./-makeLayout"

export default function loadLayout(raw: any) {
   const name = (raw.name);
   const breakdownVoltage = (raw.breakdownVoltage);
   const saturationCurrent = (raw.saturationCurrent);
   const color = (raw.color);
   const joints = (raw.joints);

   return makeLayout({ name, breakdownVoltage, saturationCurrent, color, joints });
}
