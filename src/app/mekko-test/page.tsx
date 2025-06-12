"use client";
import { useState } from "react";

interface Hospital {
  name: string;
  levels: {
    step: number;
    payRange: number[];
  }[];
}
const testData: Hospital[] = [
  {
    name: "kaiser",
    levels: [
      {
        step: 1,
        payRange: [10, 30],
      },
      {
        step: 2,
        payRange: [10, 30],
      },
      {
        step: 3,
        payRange: [10, 30],
      },
      {
        step: 4,
        payRange: [10, 30],
      },
    ],
  },
  {
    name: "ucla",
    levels: [
      {
        step: 1,
        payRange: [10, 30],
      },
      {
        step: 2,
        payRange: [10, 30],
      },
      {
        step: 3,
        payRange: [10, 30],
      },
      {
        step: 4,
        payRange: [10, 30],
      },
    ],
  },
  {
    name: "cedar sinai",
    levels: [
      {
        step: 1,
        payRange: [10, 30],
      },
      {
        step: 2,
        payRange: [10, 30],
      },
      {
        step: 3,
        payRange: [10, 30],
      },
      {
        step: 4,
        payRange: [10, 30],
      },
    ],
  },
];

const MekkoTest = () => {
  const [selectedHospital, setSelectedHospital] = useState<Hospital[]>([
    testData[0],
  ]);
  return (
    <div className="flex w-3/4 mx-auto flex-col gap-4">
      <h1>Mekko Chart</h1>
      <input className="border border-black" type="text"></input>
      <div className="flex gap-2 justify-between">
        {testData.map((hospital) => (
          <div key={hospital.name} className="w-full">
            <div>{hospital.name}</div>
            <div className="flex flex-col gap-2">
              {hospital.levels.map(({ step, payRange }) => (
                <div
                  key={step}
                  className="flex flex-col bg-green-700 items-center"
                >
                  <div>{`Step: ${step}`}</div>
                  <div>{`$${payRange[0]} - $${payRange[1]}`}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MekkoTest;
