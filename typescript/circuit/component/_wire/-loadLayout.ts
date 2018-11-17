import makeLayout from "./-makeLayout"

export default function loadLayout(raw: any) {
   const name = (raw.name);
   const color = (raw.color || raw.colour);
   //Joints Block
   const joints = (raw.joints);

   return makeLayout({ name, color, joints });
}
