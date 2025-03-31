import { memo } from "react";
import { YScale } from "./types";
import { MARGIN_LEFT, MARGIN_RIGHT, Y_TITLE } from "./salary-vis.constants";
import { yTickFormat } from "./salary-vis.helpers";

type ChartYAxisProps = {
  yScale: YScale;
  width: number;
};

const ChartYAxis = memo(({ yScale, width }: ChartYAxisProps) => {
  const yRange = yScale.range();
  const ticks = yScale.ticks((yRange[0] - yRange[1]) / 50);

  return (
    <g>
      <text y="14" className="fill-current">
        {Y_TITLE}
      </text>
      <g transform={`translate(${MARGIN_LEFT},0)`}>
        {ticks.map((t) => (
          <g key={t} transform={`translate(0,${yScale(t)})`}>
            <line
              className="stroke-border"
              x2={width - MARGIN_LEFT - MARGIN_RIGHT}
              strokeDasharray="4 4"
            ></line>
            <text
              textAnchor="end"
              dy="0.32em"
              x={-8}
              className="fill-muted-foreground"
            >
              {yTickFormat(t)}
            </text>
          </g>
        ))}
      </g>
    </g>
  );
});

export default ChartYAxis;
