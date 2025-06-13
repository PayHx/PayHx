import { memo, useCallback, useMemo, useTransition } from "react";
import { MekkoData, TooltipData } from "./types";
import { useFilters } from "./filters-context";
import {
  compareTooltipData,
  filterTransformData,
  findPointerData,
  getYMax,
  getZExtent,
} from "./mekko-vis.helpers";
import {
  COLOR_INTERPOLATOR,
  DATA_COLUMN_WIDTH,
  MARGIN_BOTTOM,
  MARGIN_TOP,
  Y_AXIS_COLUMN_WIDTH,
  YEAR_HEIGHT,
} from "./mekko-vis.constants";
import { pointer, scaleLinear, scaleSequential } from "d3";
import ChartYAxis from "./chart-y-axis";
import ChartColumns from "./chart-columns";
import { useTooltip } from "@visx/tooltip";
import ChartTooltip from "./chart-tooltip";

type ChartProps = {
  data: MekkoData;
};

const Chart = memo(({ data }: ChartProps) => {
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<TooltipData>();
  const [_, startTransition] = useTransition();

  const filters = useFilters();

  const transformedData = useMemo(
    () => filterTransformData(data, filters),
    [data, filters]
  );

  const maxYear = useMemo(() => getYMax(transformedData), [transformedData]);

  const height = MARGIN_TOP + maxYear * YEAR_HEIGHT + MARGIN_BOTTOM;
  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain([0, maxYear])
        .range([MARGIN_TOP, height - MARGIN_BOTTOM]),
    [height, maxYear]
  );

  const colorScale = useMemo(
    () =>
      scaleSequential()
        .domain(getZExtent(transformedData))
        .interpolator(COLOR_INTERPOLATOR),
    [transformedData]
  );

  const gridTemplateColumns = `${Y_AXIS_COLUMN_WIDTH}px repeat(${transformedData.length}, ${DATA_COLUMN_WIDTH}px)`;

  const width =
    Y_AXIS_COLUMN_WIDTH + DATA_COLUMN_WIDTH * transformedData.length;

  const handleLeave = useCallback(() => {
    hideTooltip();
  }, [hideTooltip]);

  const handleMove = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      const found = findPointerData(event, transformedData);
      if (!found) return hideTooltip();
      if (tooltipData && compareTooltipData(found, tooltipData)) return;
      const [mx, my] = pointer(event, event.currentTarget);
      startTransition(() => {
        showTooltip({
          tooltipLeft: mx,
          tooltipTop: my,
          tooltipData: found,
        });
      });
    },
    [hideTooltip, showTooltip, tooltipData, transformedData]
  );

  return (
    <div
      className="relative"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onTouchMove={handleMove}
      onTouchEnd={handleLeave}
    >
      <div className="overflow-x-auto">
        {transformedData.length > 0 && (
          <div
            className="grid grid-rows-[auto_auto] grid-flow-col mx-auto text-sm tabular-nums"
            style={{ gridTemplateColumns, width }}
          >
            <ChartYAxis yScale={yScale} height={height} />
            <ChartColumns
              data={transformedData}
              yScale={yScale}
              colorScale={colorScale}
              height={height}
              tooltipData={tooltipData}
            />
          </div>
        )}
      </div>
      {tooltipData && (
        <ChartTooltip data={tooltipData} left={tooltipLeft} top={tooltipTop} />
      )}
    </div>
  );
});

Chart.displayName = "Chart";

export default Chart;
