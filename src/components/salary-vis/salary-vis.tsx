"use client";

import { useMemo } from "react";
import { FiltersProvider } from "./filters-context";
import FiltersControl from "./filters-control";
import { generateFilterOptions } from "./salary-vis.helpers";
import { SalaryData } from "./types";
import Chart from "./chart";

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
        <FiltersControl states={states} specialties={specialties} />
        <Chart data={data} />
      </div>
    </FiltersProvider>
  );
};

export default SalaryVis;
