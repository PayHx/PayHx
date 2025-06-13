import { memo, useMemo } from "react";
import { YScale } from "./types";
import { Y_AXIS_COLUMN_WIDTH, Y_TITLE } from "./mekko-vis.constants";
import { range } from "d3";

type ChartYAxisProps = {
  yScale: YScale;
  height: number;
};

const width = Y_AXIS_COLUMN_WIDTH;
const tickSize = 6;
const tickPadding = 8;

const ChartYAxis = memo(({ yScale, height }: ChartYAxisProps) => {
  const ticks = useMemo(() => range(1, yScale.domain()[1]), [yScale]);

  return (
    <>
      <div
        className="text-right self-end sticky left-0 bg-background font-semibold"
        style={{ paddingRight: tickSize + tickPadding }}
      >
        {Y_TITLE}
      </div>
      <div className="sticky left-0 bg-background">
        <svg
          width={width}
          height={height}
          viewBox={`${-width} 0 ${width} ${height}`}
        >
          <g>
            {ticks.map((t) => (
              <g key={t} transform={`translate(0,${yScale(t)})`}>
                <line className="stroke-border" x2={-tickSize}></line>
                <text
                  textAnchor="end"
                  dy="0.32em"
                  x={-tickSize - tickPadding}
                  className="fill-muted-foreground"
                >
                  {t}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>
    </>
  );
});
ChartYAxis.displayName = "ChartYAxis";

export default ChartYAxis;
