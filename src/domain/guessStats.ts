import { DateTime, Interval } from "luxon";
import { computeProximityPercent } from "./geography";
import { Guess } from "./guess";

const START_DATE = DateTime.fromISO("2022-07-26");

export function dayCount(dayString: string) {
  return Math.floor(
    Interval.fromDateTimes(START_DATE, DateTime.fromISO(dayString)).length(
      "day"
    )
  );
}

export function bestGuessPercent(guesses: Guess[]) {
  const bestDistance = Math.min(...guesses.map(({ distance }) => distance));

  return computeProximityPercent(bestDistance);
}
