import { memo } from "react";
import { DotDatum, XScale, YScale } from "./types";
import { DOT_RADIUS } from "./salary-vis.constants";

type ChartTooltipDotProps = {
  data: DotDatum;
  xScale: XScale;
  yScale: YScale;
};

const ChartTooltipDot = memo(
  ({ data, xScale, yScale }: ChartTooltipDotProps) => {
    return (
      <circle
        cx={xScale(data.x)}
        cy={yScale(data.y)}
        r={DOT_RADIUS}
        fill={data.color}
        className="stroke-current"
      ></circle>
    );
  }
);

export default ChartTooltipDot;
