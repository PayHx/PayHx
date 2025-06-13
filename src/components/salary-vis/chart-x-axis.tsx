import { memo } from "react";
import { XScale } from "./types";
import { MARGIN_BOTTOM, MARGIN_TOP, X_TITLE } from "./salary-vis.constants";
import { xTickFormat } from "./salary-vis.helpers";

type ChartXAxisProps = {
  xScale: XScale;
  height: number;
};

const ChartXAxis = memo(({ xScale, height }: ChartXAxisProps) => {
  const xRange = xScale.range();
  const ticks = xScale.ticks((xRange[1] - xRange[0]) / 80);

  return (
    <g>
      <text
        x={xRange[1]}
        y={height - 4}
        textAnchor="end"
        className="fill-current font-semibold"
      >
        {X_TITLE}
      </text>
      <g transform={`translate(0,${height - MARGIN_BOTTOM})`}>
        {ticks.map((t) => (
          <g key={t} transform={`translate(${xScale(t)},0)`}>
            <line
              className="stroke-border"
              y2={-height + MARGIN_TOP + MARGIN_BOTTOM}
              strokeDasharray="4 4"
            ></line>
            <text
              textAnchor="middle"
              dy="0.71em"
              y={8}
              className="fill-muted-foreground"
            >
              {xTickFormat(t)}
            </text>
          </g>
        ))}
      </g>
    </g>
  );
});
ChartXAxis.displayName = "ChartXAxis";

export default ChartXAxis;
