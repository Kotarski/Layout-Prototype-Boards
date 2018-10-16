import { Types } from "../+component"

export default function makeMap<T extends Types.map, CT extends Types.map>
   (map: T, correspondsTo?: CT): T & { correspondsTo?: CT, isUnique?: boolean, isBoard?: boolean } {
   return Object.assign(map, { correspondsTo });
}