import { memo } from "react";
import { DotData, DotDatum, XScale, YScale } from "./types";
import { DOT_RADIUS } from "./salary-vis.constants";

type ChartDotsProps = {
  data: DotData;
  xScale: XScale;
  yScale: YScale;
};

type DotProps = {
  data: DotDatum;
  xScale: XScale;
  yScale: YScale;
};

const Dot = memo(({ data, xScale, yScale }: DotProps) => {
  return (
    <circle
      r={DOT_RADIUS}
      cx={xScale(data.x)}
      cy={yScale(data.y)}
      fill={data.color}
      opacity={data.opacity}
      className="stroke-background"
    ></circle>
  );
});
Dot.displayName = "Dot"

const ChartDots = memo(({ data, xScale, yScale }: ChartDotsProps) => {
  return (
    <g>
      {data.map((d) => (
        <Dot key={d.data.id} data={d} xScale={xScale} yScale={yScale} />
      ))}
    </g>
  );
});
ChartDots.displayName = "ChartDots";

export default ChartDots;
