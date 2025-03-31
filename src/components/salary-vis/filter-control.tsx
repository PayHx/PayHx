import { memo, useCallback } from "react";
import FilterSelect from "./filter-select";
import { useFiltersDispatch } from "./filters-context";
import { Filter } from "./types";

type FilterControlProps = {
  filter: Filter;
  states: string[];
  specialties: string[];
};

const FilterControl = memo(
  ({ filter, states, specialties }: FilterControlProps) => {
    const dispatch = useFiltersDispatch();

    const onStateChange = useCallback(
      (value: string) =>
        dispatch({
          type: "changed",
          payload: { id: filter.id, key: "state", value },
        }),
      [dispatch, filter.id]
    );

    const onSpecialtyChange = useCallback(
      (value: string) =>
        dispatch({
          type: "changed",
          payload: { id: filter.id, key: "specialty", value },
        }),
      [dispatch, filter.id]
    );

    const swatchColor = filter.active ? filter.color : "transparent";
    const borderColor = filter.active ? filter.color : "hsl(var(--input))";

    return (
      <div className="flex flex-wrap gap-2 items-center">
        <div
          className="rounded-full w-6 h-6 shrink-0 border border-solid"
          style={{ backgroundColor: swatchColor, borderColor }}
        ></div>
        <FilterSelect
          value={filter.filter.state}
          values={states}
          name="State"
          width={160}
          onValueChange={onStateChange}
        />
        <FilterSelect
          value={filter.filter.specialty}
          values={specialties}
          name="Specialty"
          width={200}
          onValueChange={onSpecialtyChange}
        />
      </div>
    );
  }
);

export default FilterControl;
