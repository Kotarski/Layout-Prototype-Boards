import makeLarge from "./-makeLarge"

export default function loadLarge(raw: any) {
   const joints = (raw.joints);

   return makeLarge({ joints });
}
