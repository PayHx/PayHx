"use client";

import { useMemo } from "react";
import { FiltersProvider } from "./filters-context";
import { generateFilterOptions } from "./mekko-vis.helpers";
import { MekkoData } from "./types";
import FiltersControl from "./filters-control";
import Chart from "./chart";
import ColorLegend from "./color-legend";

type MekkoVisProps = {
  data: MekkoData;
};

const MekkoVis = ({ data }: MekkoVisProps) => {
  const names = useMemo(() => generateFilterOptions(data), [data]);

  return (
    <FiltersProvider>
      <div className="space-y-4">
        <FiltersControl names={names} />
        <ColorLegend />
        <Chart data={data} />
      </div>
    </FiltersProvider>
  );
};

export default MekkoVis;
