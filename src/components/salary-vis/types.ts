import { ScaleLinear } from "d3";

export type SalaryData = SalaryDatum[];
export type SalaryDatum = {
  id: string;
  experience: number;
  pay: number;
  hospital: string;
  city: string;
  state: string;
  specialty: string;
};

export type JitteredData = JitteredDatum[];
export type JitteredDatum = {
  x: number;
  y: number;
  data: SalaryDatum;
};

export type DotData = DotDatum[];
export type DotDatum = JitteredDatum & {
  color: string;
  opacity: number;
  highlight: boolean;
};

export type Filters = Filter[];
export type Filter = {
  id: string;
  color: string;
  active: boolean;
  filter: {
    state: string;
    specialty: string;
  };
};

export type XScale = ScaleLinear<number, number, never>;
export type YScale = ScaleLinear<number, number, never>;
