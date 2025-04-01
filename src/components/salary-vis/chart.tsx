import { memo, useCallback, useMemo } from "react";
import { SalaryData } from "./types";
import { useParentSize } from "@visx/responsive";
import { useTooltip } from "@visx/tooltip";
import { pointer, scaleLinear } from "d3";
import {
  getDomain,
  getDotDelaunay,
  jitterData,
  sortTransformData,
  xAccessor,
  yAccessor,
} from "./salary-vis.helpers";
import {
  CHART_HEIGHT,
  CHART_MAX_WIDTH,
  DOT_RADIUS,
  MARGIN_BOTTOM,
  MARGIN_LEFT,
  MARGIN_RIGHT,
  MARGIN_TOP,
} from "./salary-vis.constants";
import ChartYAxis from "./chart-y-axis";
import ChartXAxis from "./chart-x-axis";
import ChartDots from "./chart-dots";
import { useFilters } from "./filters-context";
import ChartTooltipDot from "./chart-tooltip-dot";
import ChartTooltip from "./chart-tooltip";

type ChartProps = {
  data: SalaryData;
};

const Chart = memo(({ data }: ChartProps) => {
  const { parentRef, width } = useParentSize();
  const {
    showTooltip,
    hideTooltip,
    tooltipData: delaunayIndex,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<number>();

  const filters = useFilters();
  const jittered = useMemo(() => jitterData(data), [data]);
  const dotData = useMemo(
    () => sortTransformData(jittered, filters),
    [filters, jittered]
  );

  const xDomain = useMemo(() => getDomain(data, xAccessor), [data]);
  const yDomain = useMemo(() => getDomain(data, yAccessor), [data]);

  const xScale = useMemo(
    () =>
      scaleLinear()
        .domain(xDomain)
        .range([MARGIN_LEFT, width - MARGIN_RIGHT]),
    [width, xDomain]
  );

  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain(yDomain)
        .range([CHART_HEIGHT - MARGIN_BOTTOM, MARGIN_TOP]),
    [yDomain]
  );

  const { delaunay, delaunayPoints } = useMemo(
    () => getDotDelaunay(dotData, xScale, yScale),
    [dotData, xScale, yScale]
  );

  const handleLeave = useCallback(() => {
    hideTooltip();
  }, [hideTooltip]);

  const handleMove = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if (!parentRef.current) return;
      const [mx, my] = pointer(event, parentRef.current);
      const i = delaunay.find(mx, my, delaunayIndex ?? 0);
      const d = delaunayPoints[i];
      const searchRadius = DOT_RADIUS;
      const distance = Math.hypot(mx - xScale(d.x), my - yScale(d.y));
      if (distance > searchRadius) {
        if (delaunayIndex !== undefined) hideTooltip();
      } else if (i !== delaunayIndex) {
        showTooltip({
          tooltipLeft: xScale(d.x),
          tooltipTop: yScale(d.y),
          tooltipData: i,
        });
      }
    },
    [
      delaunay,
      delaunayIndex,
      delaunayPoints,
      hideTooltip,
      showTooltip,
      xScale,
      yScale,
    ]
  );

  const tooltipData = useMemo(
    () =>
      delaunayIndex === undefined ? undefined : delaunayPoints[delaunayIndex],
    [delaunayIndex, delaunayPoints]
  );

  return (
    <div
      ref={parentRef}
      style={{
        width: `min(100%, ${CHART_MAX_WIDTH}px)`,
        height: CHART_HEIGHT,
      }}
      className="mx-auto relative"
    >
      <svg
        width={width}
        height={CHART_HEIGHT}
        className="max-w-full text-sm tabular-nums"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onTouchMove={handleMove}
        onTouchEnd={handleLeave}
      >
        <ChartYAxis yScale={yScale} width={width} />
        <ChartXAxis xScale={xScale} height={CHART_HEIGHT} />
        <ChartDots data={dotData} xScale={xScale} yScale={yScale} />
        {tooltipData && (
          <ChartTooltipDot data={tooltipData} xScale={xScale} yScale={yScale} />
        )}
      </svg>
      {tooltipData && (
        <ChartTooltip data={tooltipData} left={tooltipLeft} top={tooltipTop} />
      )}
    </div>
  );
});
Chart.displayName = "Chart";

export default Chart;
