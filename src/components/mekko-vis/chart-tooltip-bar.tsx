import { memo } from "react";
import { BarDatum, YScale } from "./types";
import { BAR_WIDTH, MARGIN_LEFT } from "./mekko-vis.constants";

type ChartTooltipBarProps = {
  data: BarDatum;
  yScale: YScale;
};

const ChartTooltipBar = memo(({ data, yScale }: ChartTooltipBarProps) => {
  const y = yScale(data.ys[0]);
  const height = yScale(data.ys[1]) - yScale(data.ys[0]);
  return (
    <rect
      x={MARGIN_LEFT}
      y={y}
      width={BAR_WIDTH}
      height={height}
      fill="none"
      className="stroke-current"
    ></rect>
  );
});
ChartTooltipBar.displayName = "ChartTooltipBar";

export default ChartTooltipBar;
