import { memo, useLayoutEffect, useState } from "react";
import {
  COLOR_HIGH_LABEL,
  COLOR_INTERPOLATOR,
  COLOR_LOW_LABEL,
  COLOR_TITLE,
} from "./mekko-vis.constants";

const rampWidth = 200;
const rampHeight = 16;

function ramp(color: (t: number) => string, n = 256) {
  const canvas = document.createElement("canvas");
  canvas.width = n;
  canvas.height = 1;
  const context = canvas.getContext("2d")!;
  for (let i = 0; i < n; ++i) {
    context.fillStyle = color(i / (n - 1));
    context.fillRect(i, 0, 1, 1);
  }
  return canvas;
}

const ColorLegend = memo(() => {
  const [dataURL, setDataURL] = useState("");

  useLayoutEffect(() => {
    // Here we're on the client side, and document exists
    setDataURL(ramp(COLOR_INTERPOLATOR).toDataURL());
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm">
      <div className="font-semibold">{COLOR_TITLE}</div>
      <div className="flex items-center gap-2">
        <div className="text-muted-foreground">{COLOR_LOW_LABEL}</div>
        <div>
          <svg className="block" width={rampWidth} height={rampHeight}>
            <image
              width={rampWidth}
              height={rampHeight}
              preserveAspectRatio="none"
              xlinkHref={dataURL}
            ></image>
          </svg>
        </div>
        <div className="text-muted-foreground">{COLOR_HIGH_LABEL}</div>
      </div>
    </div>
  );
});
ColorLegend.displayName = "ColorLegend";

export default ColorLegend;
