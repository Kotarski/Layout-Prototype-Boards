namespace Svg.Element.Group.Wire.Layout {
   export type type = ReturnType<typeof make>;
   export function make(joints: Vector[], color: string, classes: string = "") {
      const bodyGroup = Group.make(classes);

      let coverPath, leadPath: string = "";

      //The proportion of half the end joints that is cover not lead
      let coverRatio = 0.6; //BETWEEN 0 and 1

      //Start at the beginning
      coverPath = leadPath = "M " + joints[0].x + " " + joints[0].y;

      // Draw cover towards the midpoint of first two joints (starting from coverRatio)
      coverPath += getSegmentTowardsJointMid(joints[0], joints[1], -coverRatio);
      // Draw lead path from start to midpoint of the first two joints
      leadPath += getSegmentTowardsJointMid(joints[0], joints[1], 1);

      // Draw curve between all mid joints
      let pathMid = getBezierBetweenJoints(joints);
      coverPath += pathMid;
      leadPath += pathMid;

      // Draw cover away from the midpoint of the last two joints (starting from 1-coverRatio)
      coverPath += getSegmentTowardsJointMid(joints[joints.length - 2], joints[joints.length - 1], coverRatio)
      // Draw lead path to end
      leadPath += getSegmentTowardsJointMid(joints[joints.length - 2], joints[joints.length - 1], 1)

      let cover = Svg.Element.Path.make(coverPath, "cover");

      $(cover.element).css("stroke", color);
      //Style and add lead, cover
      //(Prepend so handles appear on top)

      bodyGroup.append(
         Svg.Element.Path.make(leadPath, "lead"),
         Svg.Element.Path.make(coverPath, "leadhighlight highlight"),
         cover,
      );

      return bodyGroup;
   }

   function getBezierBetweenJoints(joints: Vector[]): string {
      //Assume we are starting at the midpoint between first two joints
      let path: string = "";

      for (let j = 1; j < joints.length - 1; j++) {

         // End each curve at the mid point between the last two joints
         let p3 = {
            x: (joints[j + 1].x + joints[j].x) / 2,
            y: (joints[j + 1].y + joints[j].y) / 2
         }

         path += "Q " + joints[j].x + " " + joints[j].y +
            " " + p3.x + " " + p3.y;
      }

      return path;
   }

   // Starting or ending at a midpoint
   function getSegmentTowardsJointMid(j0: Vector, j1: Vector, ratio: number): string {
      let changeMid = {
         x: (j1.x - j0.x) / 2,
         y: (j1.y - j0.y) / 2
      }

      if (Math.sign(ratio) >= 0) {
         return 'l' + (changeMid.x * ratio) + " " + (changeMid.y * ratio) +
            'm' + (changeMid.x * (1 - ratio)) + " " + (changeMid.y * (1 - ratio));
      } else {
         ratio = Math.abs(ratio);
         return 'm' + (changeMid.x * (1 - ratio)) + " " + (changeMid.y * (1 - ratio)) +
            'l' + (changeMid.x * ratio) + " " + (changeMid.y * ratio);
      }
   }

}