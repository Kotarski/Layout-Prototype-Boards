import makeSchematic from "./-makeSchematic";

export default function loadSchematic(raw: any) {
   //Joints Block
   const joints = (raw.joints);

   return makeSchematic({ joints });
}
