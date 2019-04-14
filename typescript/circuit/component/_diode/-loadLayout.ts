import makeLayout from "./-makeLayout"

export default function loadLayout(raw: any) {
   const breakdownVoltage = (raw.breakdownVoltage);
   const saturationCurrent = (raw.saturationCurrent);
   const color = (raw.color);
   const joints = (raw.joints);

   return makeLayout({ breakdownVoltage, saturationCurrent, color, joints });
}
