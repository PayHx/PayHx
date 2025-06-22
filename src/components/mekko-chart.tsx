import {
  Hospital,
  useHospitalMultiselect,
} from "@/context/hospital-multiselect-context";
import { useMemo } from "react";

interface HospitalPay extends Hospital {
  levels: {
    step: number;
    experienceRange: number[];
    payRange: number[];
  }[];
}

const testData: HospitalPay[] = [
  {
    id: "kaiser",
    label: "Kaiser Permanente",
    levels: [
      {
        step: 1,
        experienceRange: [0, 1],
        payRange: [10, 30],
      },
      {
        step: 2,
        experienceRange: [2, 5],
        payRange: [10, 30],
      },
      {
        step: 3,
        experienceRange: [6, 10],
        payRange: [10, 30],
      },
      {
        step: 4,
        experienceRange: [11, 20],
        payRange: [10, 30],
      },
    ],
  },
  {
    id: "ucla",
    label: "UCLA",
    levels: [
      {
        step: 1,
        experienceRange: [0, 4],
        payRange: [10, 30],
      },
      {
        step: 2,
        experienceRange: [5, 6],
        payRange: [10, 30],
      },
      {
        step: 3,
        experienceRange: [6, 10],
        payRange: [10, 30],
      },
      {
        step: 4,
        experienceRange: [11, 20],
        payRange: [10, 30],
      },
    ],
  },
  {
    id: "uci",
    label: "UC Irvine",
    levels: [
      {
        step: 1,
        experienceRange: [0, 1],
        payRange: [10, 30],
      },
      {
        step: 2,
        experienceRange: [2, 5],
        payRange: [10, 30],
      },
      {
        step: 3,
        experienceRange: [6, 10],
        payRange: [10, 30],
      },
      {
        step: 4,
        experienceRange: [11, 20],
        payRange: [10, 30],
      },
    ],
  },
  {
    id: "ucsf",
    label: "UCSF",
    levels: [
      {
        step: 1,
        experienceRange: [0, 4],
        payRange: [10, 30],
      },
      {
        step: 2,
        experienceRange: [5, 6],
        payRange: [10, 30],
      },
      {
        step: 3,
        experienceRange: [6, 10],
        payRange: [10, 30],
      },
      {
        step: 4,
        experienceRange: [11, 20],
        payRange: [10, 30],
      },
    ],
  },
];

// light blue, light green, light yellow
// TODO: replace with better colros later (use theme colors from tailwind/shadcn)
const possibleColors = ["#ADD8E6", "#90EE90", "#FFFFE0"];

export const MekkoChart = () => {
  const { selectedHospitals } = useHospitalMultiselect();

  const selectedHospitalIds = selectedHospitals
    .map((h) => h?.id)
    .filter(Boolean);

  const selectedHospitalPay = useMemo(
    () => testData.filter((h) => selectedHospitalIds.includes(h.id)),
    [testData, selectedHospitalIds],
  );

  return (
    <div className="flex gap-2">
      {selectedHospitalPay.map((hospital, index) => {
        const totalExperience = hospital.levels.reduce(
          (sum, level) =>
            sum + level.experienceRange[1] - level.experienceRange[0] + 1,
          0,
        );
        return (
          <div key={hospital.id} className="w-full">
            <div className="truncate max-w-[120px]">{hospital.label}</div>
            <div className="flex flex-col gap-2 h-160">
              {hospital.levels.map(({ step, experienceRange, payRange }) => {
                const levelExperience =
                  experienceRange[1] - experienceRange[0] + 1;
                const heightPercent = Math.round(
                  (levelExperience / totalExperience) * 100,
                );
                return (
                  <div
                    key={step}
                    className="flex flex-col items-center rounded"
                    style={{
                      backgroundColor: possibleColors[index] || "gray-200",
                      height: `${heightPercent}%`,
                    }}
                  >
                    <div>{`Step: ${step}`}</div>
                    <div>{`$${payRange[0]} - $${payRange[1]}`}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
