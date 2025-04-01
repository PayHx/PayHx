import { memo } from "react";
import { DotDatum } from "./types";
import { TooltipWithBounds } from "@visx/tooltip";
import { xValueFormat, yValueFormat } from "./salary-vis.helpers";

type ChartTooltipProps = {
  data: DotDatum;
  left: number;
  top: number;
};

const ChartTooltip = memo(({ data, left, top }: ChartTooltipProps) => {
  const { hospital, city, state, specialty, experience, pay } = data.data;
  const rows = [
    { title: "Hospital", value: hospital },
    { title: "Location", value: [city, state].join(", ") },
    { title: "Specialty", value: specialty },
    { title: "Years of Experience", value: xValueFormat(experience) },
    { title: "Salary", value: yValueFormat(pay) },
  ].filter(({ value }) => !!value);
  return (
    <TooltipWithBounds
      left={left}
      top={top}
      unstyled
      className="absolute p-2 rounded bg-background text-sm tabular-nums border border-border shadow-md"
    >
      {rows.map(({ title, value }) => (
        <div key={title}>
          <span className="text-muted-foreground">{title}: </span>
          <span className="text-foreground">{value}</span>
        </div>
      ))}
    </TooltipWithBounds>
  );
});
ChartTooltip.displayName = "ChartTooltip";

export default ChartTooltip;
