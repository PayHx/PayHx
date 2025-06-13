"use client";

import { useEffect, useState } from "react";
import type { MekkoData } from "@/components/mekko-vis";
import MekkoVis from "@/components/mekko-vis";

export default function MekkoVisContainer() {
  const [data, setData] = useState<MekkoData>([]);
  const [loading, setLoading] = useState(true);

  // Assume all data are retrieved at once
  useEffect(() => {
    const fetchData = async () => {
      try {
        const mekkoData = [
          {
            name: "UC Berkeley",
            data: [
              { year: 0, wage: 64.32 },
              { year: 6, wage: 65.59 },
              { year: 9, wage: 66.93 },
              { year: 12, wage: 68.24 },
              { year: 15, wage: 69.62 },
              { year: 18, wage: 70.99 },
              { year: 21, wage: 72.42 },
              { year: 24, wage: 73.89 },
              { year: 27, wage: 75.36 },
            ],
          },
          {
            name: "UC Davis",
            data: [
              { year: 0, wage: 70.21 },
              { year: 1, wage: 73.72 },
              { year: 2, wage: 75.17 },
              { year: 3, wage: 76.7 },
              { year: 4, wage: 78.23 },
              { year: 5, wage: 79.84 },
              { year: 6, wage: 81.41 },
              { year: 7, wage: 83.03 },
              { year: 9, wage: 84.69 },
              { year: 11, wage: 86.38 },
              { year: 13, wage: 88.08 },
              { year: 16, wage: 89.89 },
            ],
          },
          {
            name: "UC Irvine",
            data: [
              { year: 0, wage: 64.13 },
              { year: 1, wage: 65.41 },
              { year: 2, wage: 66.73 },
              { year: 3, wage: 68.04 },
              { year: 4, wage: 69.4 },
              { year: 5, wage: 70.79 },
              { year: 6, wage: 72.2 },
              { year: 7, wage: 73.64 },
              { year: 8, wage: 75.11 },
              { year: 9, wage: 76.67 },
              { year: 10, wage: 78.16 },
              { year: 11, wage: 79.13 },
              { year: 12, wage: 81.31 },
              { year: 13, wage: 82.96 },
              { year: 14, wage: 84.6 },
              { year: 20, wage: 86.3 },
            ],
          },
          {
            name: "UC Los Angeles",
            data: [
              { year: 0, wage: 58.45 },
              { year: 0.5, wage: 62.43 },
              { year: 1, wage: 63.86 },
              { year: 2, wage: 65.14 },
              { year: 3, wage: 66.43 },
              { year: 4, wage: 67.75 },
              { year: 5, wage: 69.1 },
              { year: 6, wage: 70.48 },
              { year: 7, wage: 71.88 },
              { year: 8, wage: 73.31 },
              { year: 9, wage: 74.82 },
              { year: 10, wage: 76.33 },
              { year: 11, wage: 77.81 },
              { year: 15, wage: 79.38 },
              { year: 20, wage: 81.0 },
              { year: 25, wage: 82.57 },
            ],
          },
          {
            name: "UC Merced",
            data: [
              { year: 0, wage: 64.11 },
              { year: 1, wage: 65.38 },
              { year: 2, wage: 66.69 },
              { year: 3, wage: 68.04 },
              { year: 4, wage: 69.39 },
              { year: 5, wage: 70.78 },
              { year: 6, wage: 72.19 },
              { year: 7, wage: 73.63 },
              { year: 8, wage: 75.09 },
              { year: 9, wage: 76.58 },
              { year: 10, wage: 78.14 },
              { year: 11, wage: 79.69 },
              { year: 12, wage: 81.28 },
              { year: 13, wage: 82.9 },
            ],
          },
          {
            name: "UC Los Riverside",
            data: [
              { year: 0, wage: 37.7 },
              { year: 0.5, wage: 46.1 },
              { year: 1.5, wage: 47.03 },
              { year: 2.5, wage: 47.95 },
              { year: 3.5, wage: 48.92 },
              { year: 4.5, wage: 49.92 },
              { year: 5.5, wage: 50.91 },
              { year: 6.5, wage: 51.92 },
              { year: 7.5, wage: 53.0 },
              { year: 8.5, wage: 54.02 },
              { year: 10.5, wage: 55.1 },
              { year: 12.5, wage: 56.23 },
              { year: 15.5, wage: 57.33 },
              { year: 18.5, wage: 58.5 },
              { year: 21.5, wage: 59.66 },
              { year: 25, wage: 60.86 },
              { year: 28, wage: 62.06 },
            ],
          },
          {
            name: "UC Santa Barbara",
            data: [
              { year: 0, wage: 43.8 },
              { year: 1, wage: 48.18 },
              { year: 2, wage: 49.21 },
              { year: 3, wage: 50.18 },
              { year: 4, wage: 51.21 },
              { year: 5, wage: 52.25 },
              { year: 6, wage: 53.31 },
              { year: 7, wage: 54.43 },
              { year: 8, wage: 55.5 },
              { year: 9, wage: 56.64 },
              { year: 10, wage: 57.81 },
              { year: 11, wage: 58.99 },
              { year: 12, wage: 60.17 },
              { year: 13, wage: 61.39 },
              { year: 14, wage: 62.65 },
              { year: 15, wage: 63.9 },
              { year: 16, wage: 65.18 },
              { year: 17, wage: 66.49 },
              { year: 18, wage: 67.81 },
              { year: 19, wage: 69.15 },
              { year: 20, wage: 70.55 },
              { year: 21, wage: 71.94 },
            ],
          },
          {
            name: "UC Santa Cruz",
            data: [
              { year: 0, wage: 46.84 },
              { year: 1, wage: 52.13 },
              { year: 2, wage: 53.19 },
              { year: 3, wage: 54.25 },
              { year: 4, wage: 55.33 },
              { year: 5, wage: 56.43 },
              { year: 6, wage: 57.57 },
              { year: 7, wage: 58.73 },
              { year: 8, wage: 59.92 },
              { year: 9, wage: 61.11 },
              { year: 10, wage: 62.33 },
              { year: 11, wage: 63.57 },
              { year: 15, wage: 64.83 },
              { year: 20, wage: 64.83 },
            ],
          },
          {
            name: "UC San Diego",
            data: [
              { year: 0, wage: 60.54 },
              { year: 0.5, wage: 62.9 },
              { year: 1, wage: 64.2 },
              { year: 2, wage: 65.47 },
              { year: 3, wage: 66.78 },
              { year: 4, wage: 68.15 },
              { year: 5, wage: 69.48 },
              { year: 6, wage: 70.86 },
              { year: 7, wage: 72.31 },
              { year: 8, wage: 73.78 },
              { year: 9, wage: 75.22 },
              { year: 10, wage: 76.71 },
              { year: 11, wage: 78.23 },
              { year: 12, wage: 79.85 },
              { year: 13, wage: 81.42 },
              { year: 14, wage: 83.06 },
            ],
          },
          {
            name: "UC San Francisco",
            data: [
              { year: 0, wage: 84.79 },
              { year: 0.5, wage: 89.02 },
              { year: 1.5, wage: 92.25 },
              { year: 2.5, wage: 95.55 },
              { year: 3.5, wage: 98.98 },
              { year: 4.5, wage: 102.55 },
              { year: 7.5, wage: 104.59 },
              { year: 10.5, wage: 106.68 },
              { year: 15, wage: 108.83 },
              { year: 20, wage: 110.97 },
              { year: 25, wage: 113.07 },
              { year: 30, wage: 115.34 },
            ],
          },
        ];
        setData(mekkoData);
      } catch (error) {
        console.error("Error fetching salaries:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return loading ? (
    <div className="text-center p-5">Loading visuals...</div>
  ) : (
    <MekkoVis data={data} />
  );
}
