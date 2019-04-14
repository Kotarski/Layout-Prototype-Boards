import { Layout } from "./~classes";
import vector, { Vector } from "../../../-vector";
import { INDEXSTART, INDEXSTEP } from "./constants";
import cumulativeSum from "../../../utility/-cumulativeSum";

import { makeCircle as makeCircle } from "../../../svg/element/+circle";
import { makeRect as makeRect } from "../../../svg/element/+rect";

import { gridSpacing } from "../../../~constants";

const drawStripboardHole = (position: Vector) => makeCircle(position, 4, "hole");
const drawBreadboardHole = (position: Vector) => makeRect(position, { width: 8, height: 8 }, vector(0.5), "hole");

export default function drawLayout(instance: Layout) {
   const holeFunc = (instance.properties.style === "breadboard") ? drawBreadboardHole : drawStripboardHole;

   const start = instance.states.joints[INDEXSTART];
   const step = instance.states.joints[INDEXSTEP];

   // Create the holes
   const holePositions = vector(step).scaleMap(cumulativeSum(...instance.properties.holeSpacings)).sumWith(start).vectors;

   const holes = holePositions.map(hp => holeFunc(hp))

   const track = drawTrack(holePositions);

   return [track, ...holes]
}

const drawTrack = (holePositions: Vector[]) => {
   let start = holePositions[0];
   let end = holePositions[holePositions.length - 1];
   //: Vector, step: Vector, stepCount: number
   // Create the track
   let relativeEnd = vector(end, vector(start).scaleWith(-1)).sum();

   let { radius, angle } = relativeEnd.asPolar();

   let centre = vector(start, start, relativeEnd).sum().scaleWith(0.5).vector;

   let size = {
      width: radius + gridSpacing * 0.8,
      height: gridSpacing * 14 / 16
   }

   return makeRect(centre, size, vector(0), 'body').rotate(angle, centre);
}

