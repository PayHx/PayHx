import { MultiSelect } from "@/components/multi-select";
import { Filters } from "./types";
import { memo, useCallback, useMemo } from "react";
import { useFiltersDispatch } from "./filters-context";
import { MAX_COMPARISON_COUNT } from "./mekko-vis.constants";

type FiltersControlProps = {
  names: Filters;
};

const FiltersControl = memo(({ names }: FiltersControlProps) => {
  const dispatch = useFiltersDispatch();

  const options = useMemo(
    () =>
      names.map((name) => ({
        label: name,
        value: name,
      })),
    [names]
  );

  const handleValueChange = useCallback(
    (value: string[]) => {
      dispatch({
        type: "changed",
        payload: { value },
      });
    },
    [dispatch]
  );

  return (
    <div className="space-y-2">
      <div>Select up to {MAX_COMPARISON_COUNT} hospitals to compare</div>
      <MultiSelect
        options={options}
        onValueChange={handleValueChange}
        placeholder="Select hospitals to compare..."
        variant="default"
        maxCount={MAX_COMPARISON_COUNT}
      />
    </div>
  );
});
FiltersControl.displayName = "FiltersControl";

export default FiltersControl;
