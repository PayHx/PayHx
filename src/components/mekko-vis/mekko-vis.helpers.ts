import { format, max, min } from "d3";
import {
  BarData,
  Filters,
  MekkoData,
  TooltipData,
  TransformedData,
} from "./types";

export const zLabelFormat = format("$,.0f");
export const zValueFormat = format("$,.2f");

export function generateFilterOptions(data: MekkoData) {
  return data.map((d) => d.name);
}

export function formatReadableYear(year: number) {
  if (year < 1) {
    const month = Math.round(year * 12);
    return month === 1 ? "1 month" : `${month} months`;
  } else {
    return year === 1 ? "1 year" : `${year} years`;
  }
}

export function filterTransformData(
  data: MekkoData,
  filters: Filters
): TransformedData {
  const dataByName = new Map(data.map((d) => [d.name, d]));
  const filtered: MekkoData = [];
  filters.forEach((name) => {
    const d = dataByName.get(name);
    if (d) {
      filtered.push(d);
    }
  });
  const transformed = filtered.map((d) => {
    const bars: BarData = [];
    for (let i = 1; i < d.data.length; i++) {
      const start = d.data[i - 1];
      const end = d.data[i];
      const ys: [number, number] = [start.year, end.year];
      const z = start.wage;
      const label =
        i === 1
          ? `Up to ${formatReadableYear(end.year)}`
          : `${start.year}–${formatReadableYear(end.year)}`;
      bars.push({
        ys,
        z,
        label,
      });
    }
    const l = d.data[d.data.length - 1];
    bars.push({
      ys: [l.year, l.year + 1],
      z: l.wage,
      label: `Above ${formatReadableYear(l.year)}`,
    });
    return {
      ...d,
      bars,
    };
  });
  return transformed;
}

export function getYMax(transformedData: TransformedData) {
  return max(transformedData, (d) => d.bars[d.bars.length - 1].ys[1]) || 1;
}

export function getZExtent(transformedData: TransformedData): [number, number] {
  const zs = transformedData.flatMap((d) => d.data.map((d) => d.wage));
  return [min(zs) || 0, max(zs) || 1];
}

export function findPointerData(
  event: React.MouseEvent | React.TouchEvent,
  transformedData: TransformedData
): TooltipData | undefined {
  if (!(event.target instanceof SVGElement)) return undefined;
  const bar = event.target.closest("[data-bar-index]");
  if (!(bar instanceof SVGElement)) return undefined;
  const barIndex = Number(bar.dataset.barIndex);
  const column = bar.closest("[data-column-name]");
  if (!(column instanceof SVGElement)) return undefined;
  const columnName = column.dataset.columnName;
  const columnData = transformedData.find((d) => d.name === columnName);
  if (!columnData) return undefined;
  return {
    name: columnData.name,
    barIndex,
    ...columnData.bars[barIndex],
  };
}

export function compareTooltipData(
  found: TooltipData,
  tooltipData: TooltipData
) {
  if (found.name !== tooltipData.name) return false;
  if (found.barIndex !== tooltipData.barIndex) return false;
  return true;
}

// https://gist.github.com/dcondrey/183971f17808e9277572?permalink_comment_id=4613640#gistcomment-4613640
export function contrastingColor(hex = "#fff", factorAlpha = false) {
  let [r, g, b, a] = hex
    .replace(
      /^#?(?:(?:(..)(..)(..)(..)?)|(?:(.)(.)(.)(.)?))$/,
      "$1$5$5$2$6$6$3$7$7$4$8$8"
    )
    .match(/(..)/g)!
    .map((rgb) => parseInt("0x" + rgb));
  return (~~(r * 299) + ~~(g * 587) + ~~(b * 114)) / 1000 >= 128 ||
    (!!(~(128 / a) + 1) && factorAlpha)
    ? "#000"
    : "#fff";
}
