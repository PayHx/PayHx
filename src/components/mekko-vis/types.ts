import { ScaleLinear, ScaleSequential } from "d3";

export type MekkoData = MekkoDatum[];
export type MekkoDatum = {
  name: string;
  data: WageData;
};

export type WageData = WageDatum[];
export type WageDatum = {
  year: number;
  wage: number;
};

export type Filters = Filter[];
export type Filter = string; // hospital name

export type TransformedData = TransformedDatum[];
export type TransformedDatum = MekkoDatum & { bars: BarData };
export type BarData = BarDatum[];
export type BarDatum = {
  ys: [number, number];
  z: number;
  label: string;
};

export type TooltipData = {
  name: MekkoDatum["name"];
  barIndex: number;
} & BarDatum;

export type YScale = ScaleLinear<number, number, never>;
export type ColorScale = ScaleSequential<string, never>;
