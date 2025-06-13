import { memo } from "react";
import FilterControl from "./filter-control";
import { useFilters } from "./filters-context";
import { HIGHLIGHT_COLORS } from "./salary-vis.constants";

type FiltersControlProps = {
  states: string[];
  specialties: string[];
};

const FiltersControl = memo(({ states, specialties }: FiltersControlProps) => {
  const filters = useFilters();

  return (
    <div className="space-y-2">
      <div>
        Select up to {HIGHLIGHT_COLORS.length} pairs of state and specialty to
        compare
      </div>
      <div className="flex flex-wrap justify-between gap-x-8 gap-y-4 [--threshold:1264px]">
        {filters.map((filter) => (
          <div
            key={filter.id}
            className="grow basis-[calc((var(--threshold)_-_100%)_*_9999)]"
          >
            <FilterControl
              filter={filter}
              states={states}
              specialties={specialties}
            />
          </div>
        ))}
      </div>
    </div>
  );
});
FiltersControl.displayName = "FiltersControl";

export default FiltersControl;
