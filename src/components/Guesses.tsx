import { Guess } from "../domain/guess";
import { GuessRow } from "./GuessRow";
import React from "react";
import { SettingsData } from "../hooks/useSettings";
import { Suburb } from "../domain/suburbs";

interface GuessesProps {
  targetSuburb?: Suburb;
  rowCount: number;
  guesses: Guess[];
  settingsData: SettingsData;
  suburbInputRef?: React.RefObject<HTMLInputElement>;
}

export function Guesses({
  targetSuburb,
  rowCount,
  guesses,
  settingsData,
  suburbInputRef,
}: GuessesProps) {
  return (
    <div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {Array.from(Array(rowCount).keys()).map((index) => (
          <GuessRow
            targetSuburb={targetSuburb}
            key={index}
            guess={guesses[index]}
            settingsData={settingsData}
            suburbInputRef={suburbInputRef}
          />
        ))}
      </div>
    </div>
  );
}
