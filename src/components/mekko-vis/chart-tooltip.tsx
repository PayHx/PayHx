import { TooltipWithBounds } from "@visx/tooltip";
import { zValueFormat } from "./mekko-vis.helpers";
import { TooltipData } from "./types";

type ChartTooltipProps = {
  data: TooltipData;
  left: number;
  top: number;
};

const ChartTooltip = ({ data, left, top }: ChartTooltipProps) => {
  const { name, label, z } = data;
  const rows = [
    { title: "Hospital", value: name },
    { title: "Years of Experience", value: label },
    { title: "Hourly Salary", value: zValueFormat(z) },
  ];
  return (
    <TooltipWithBounds
      key={Math.random()}
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
};

export default ChartTooltip;
