import makeSmall from "./-makeSmall"

export default function loadSmall(raw: any) {
   const joints = (raw.joints);

   return makeSmall({ joints });
}