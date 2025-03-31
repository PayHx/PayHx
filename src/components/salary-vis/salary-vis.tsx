"use client";

import { useMemo } from "react";
import { FiltersProvider } from "./filters-context";
import FiltersControl from "./filters-control";
import { generateFilterOptions } from "./salary-vis.helpers";
import { SalaryData } from "./types";
import Chart from "./chart";
import { CHART_TITLE } from "./salary-vis.constants";

type SalaryVisProps = {
  data: SalaryData;
};

const SalaryVis = ({ data }: SalaryVisProps) => {
  const states = useMemo(() => generateFilterOptions(data, "state"), [data]);
  const specialties = useMemo(
    () => generateFilterOptions(data, "specialty"),
    [data]
  );

  return (
    <FiltersProvider>
      <div className="space-y-4">
        <h2 className="text-xl text-center">{CHART_TITLE}</h2>
        <FiltersControl states={states} specialties={specialties} />
        <Chart data={data} />
      </div>
    </FiltersProvider>
  );
};

export default SalaryVis;
