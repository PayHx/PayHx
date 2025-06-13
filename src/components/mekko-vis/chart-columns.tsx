import { memo } from "react";
import {
  BarDatum,
  ColorScale,
  TooltipData,
  TransformedData,
  TransformedDatum,
  YScale,
} from "./types";
import {
  BAR_WIDTH,
  DATA_COLUMN_WIDTH,
  MARGIN_LEFT,
  MARGIN_RIGHT,
} from "./mekko-vis.constants";
import { contrastingColor, zLabelFormat } from "./mekko-vis.helpers";
import ChartTooltipBar from "./chart-tooltip-bar";

type ChartColumnsProps = {
  data: TransformedData;
  yScale: YScale;
  colorScale: ColorScale;
  height: number;
  tooltipData: TooltipData | undefined;
};

type ColumnProps = {
  data: TransformedDatum;
  yScale: YScale;
  colorScale: ColorScale;
  height: number;
  tooltipBarIndex: number | undefined;
};

type BarProps = {
  index: number;
  data: BarDatum;
  yScale: YScale;
  colorScale: ColorScale;
};

const width = DATA_COLUMN_WIDTH;

const Bar = memo(({ index, data, yScale, colorScale }: BarProps) => {
  const y = yScale(data.ys[0]);
  const height = yScale(data.ys[1]) - yScale(data.ys[0]);
  const showLabel = height > 20;

  const rectColor = colorScale(data.z);
  const textColor = contrastingColor(rectColor);

  return (
    <g transform={`translate(0,${y})`} data-bar-index={index}>
      <rect
        x={MARGIN_LEFT}
        width={BAR_WIDTH}
        height={height}
        fill={rectColor}
      ></rect>
      {showLabel && (
        <text
          className="select-none"
          x={BAR_WIDTH - 8}
          y={height / 2}
          dy="0.32em"
          textAnchor="end"
          fill={textColor}
        >
          {zLabelFormat(data.z)}
        </text>
      )}
    </g>
  );
});
Bar.displayName = "Bar";

const Column = memo(
  ({ data, yScale, colorScale, height, tooltipBarIndex }: ColumnProps) => {
    return (
      <>
        <div
          className="text-center self-end"
          style={{ paddingLeft: MARGIN_LEFT, paddingRight: MARGIN_RIGHT }}
        >
          {data.name}
        </div>
        <div>
          <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            data-column-name={data.name}
          >
            {data.bars.map((d, i) => (
              <Bar
                key={d.ys.join("-")}
                index={i}
                data={d}
                yScale={yScale}
                colorScale={colorScale}
              />
            ))}
            {tooltipBarIndex !== undefined && (
              <ChartTooltipBar
                data={data.bars[tooltipBarIndex]}
                yScale={yScale}
              />
            )}
          </svg>
        </div>
      </>
    );
  }
);
Column.displayName = "Column";

const ChartColumns = memo(
  ({ data, yScale, colorScale, height, tooltipData }: ChartColumnsProps) => {
    return (
      <>
        {data.map((d) => {
          const tooltipBarIndex =
            tooltipData?.name === d.name ? tooltipData.barIndex : undefined;
          return (
            <Column
              key={d.name}
              data={d}
              yScale={yScale}
              colorScale={colorScale}
              height={height}
              tooltipBarIndex={tooltipBarIndex}
            />
          );
        })}
      </>
    );
  }
);
ChartColumns.displayName = "ChartColumns";

export default ChartColumns;
