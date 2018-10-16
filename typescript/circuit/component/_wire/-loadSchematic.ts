import makeSchematic from "./-makeSchematic";

export default function loadSchematic(raw: any) {
   const name = (raw.name);
   //Joints Block
   const joints = (raw.joints);

   return makeSchematic({ name, joints });
}
