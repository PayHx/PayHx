import { interpolatePlasma } from "d3";

export const COLOR_INTERPOLATOR = (t: number) => interpolatePlasma(1 - t);

export const MAX_COMPARISON_COUNT = 6;

export const Y_AXIS_COLUMN_WIDTH = 96; // Adjust according to y title

export const DATA_COLUMN_WIDTH = 180;

export const YEAR_HEIGHT = 24;

export const MARGIN_TOP = 8;

export const MARGIN_RIGHT = 4;

export const MARGIN_BOTTOM = 1;

export const MARGIN_LEFT = 4;

export const BAR_WIDTH = DATA_COLUMN_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;

export const Y_TITLE = "Years of Experience";

export const COLOR_TITLE = "Hourly Salary";

export const COLOR_LOW_LABEL = "Low";

export const COLOR_HIGH_LABEL = "High";
