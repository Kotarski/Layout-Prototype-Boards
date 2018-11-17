import makeLarge from "./-makeLarge"

export default function loadLarge(raw: any) {
   const name = (raw.name);
   const joints = (raw.joints);

   return makeLarge({ name, joints });
}
