import makeSmall from "./-makeSmall"

export default function loadSmall(raw: any) {
   const name = (raw.name);
   const joints = (raw.joints);

   return makeSmall({ name, joints });
}