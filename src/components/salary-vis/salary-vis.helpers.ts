import { Delaunay, extent, format, randomLcg, randomUniform } from "d3";
import {
  DotData,
  Filter,
  Filters,
  JitteredData,
  JitteredDatum,
  SalaryData,
  SalaryDatum,
  XScale,
  YScale,
} from "./types";
import { filterKeys } from "./filters-context";
import {
  DEFAULT_COLOR,
  DEFAULT_OPACITY,
  HIGHLIGHT_OPACITY,
  MUTE_OPACITY,
} from "./salary-vis.constants";

export const xAccessor = (d: SalaryDatum) => d.experience;
export const yAccessor = (d: SalaryDatum) => d.pay;

export const xTickFormat = format(",.2~r");
export const xValueFormat = format(",.3~f");
export const yTickFormat = format(",.3~r");
export const yValueFormat = format("$,.4~r");

export function generateFilterOptions(
  data: SalaryData,
  key: keyof Filter["filter"]
) {
  return Array.from(new Set(data.map((d) => d[key]))).sort((a, b) =>
    a.localeCompare(b)
  );
}

export function jitterData(data: SalaryData): JitteredData {
  const seed = 0.123;
  const random = randomUniform.source(randomLcg(seed))(-0.5, 0.5);

  const xBandwidth = 0.5; // years of experience adds +/- xBandwidth/2 jittered value
  const yBandWidth = 0.1; // salary adds +/- yBandWidth/2 jittered value
  const xSet = new Set();
  const ySet = new Set();

  return data.map((d) => {
    let x = xAccessor(d);
    if (xSet.has(x)) {
      x += random() * xBandwidth;
    }
    xSet.add(x);

    let y = yAccessor(d);
    if (ySet.has(y)) {
      y += random() * yBandWidth;
    }
    ySet.add(y);

    return {
      x,
      y,
      data: d,
    };
  });
}

export function getDomain(
  data: SalaryData,
  accessor: (d: SalaryDatum) => number
) {
  let [vMin, vMax] = extent(data, accessor);
  vMin = Math.floor(vMin ?? 0) - 0.5;
  vMax = Math.ceil(vMax ?? 1) + 0.5;
  return [vMin, vMax];
}

export function getConcatenatedFilterValues(
  d: Filter["filter"] | JitteredDatum["data"]
) {
  return filterKeys.map((key) => d[key]).join("|");
}

export function sortTransformData(data: JitteredData, filters: Filters) {
  const activeFilters = filters.filter((f) => f.active);
  const defaultOpacity =
    activeFilters.length > 0 ? MUTE_OPACITY : DEFAULT_OPACITY;
  const highlightColorMap = new Map(
    activeFilters.map((f) => [getConcatenatedFilterValues(f.filter), f.color])
  );

  const dotMap = new Map<string, DotData>();
  dotMap.set("default", []);
  activeFilters
    .map((f) => getConcatenatedFilterValues(f.filter))
    .forEach((d) => {
      dotMap.set(d, []);
    });
  data.forEach((d) => {
    const testConcatenatedFilterValues = getConcatenatedFilterValues(d.data);
    if (dotMap.has(testConcatenatedFilterValues)) {
      dotMap.get(testConcatenatedFilterValues)?.push({
        ...d,
        color: highlightColorMap.get(testConcatenatedFilterValues)!,
        opacity: HIGHLIGHT_OPACITY,
        highlight: true,
      });
    } else {
      dotMap.get("default")?.push({
        ...d,
        color: DEFAULT_COLOR,
        opacity: defaultOpacity,
        highlight: false,
      });
    }
  });

  const dotData = Array.from(dotMap.values()).flatMap((d) => d);
  return dotData;
}

export function getDotDelaunay(data: DotData, xScale: XScale, yScale: YScale) {
  const highlightStartIndex = data.findIndex((d) => d.highlight);
  const points =
    highlightStartIndex === -1 ? data : data.slice(highlightStartIndex); // Only hover highlight points when highlight filter is active
  const delaunay = Delaunay.from(
    points,
    (d) => xScale(d.x),
    (d) => yScale(d.y)
  );
  return { delaunay, delaunayPoints: points };
}
