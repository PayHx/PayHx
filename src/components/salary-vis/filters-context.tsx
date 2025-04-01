import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";
import { HIGHLIGHT_COLORS } from "./salary-vis.constants";
import { Filter, Filters } from "./types";

type FilterAction = {
  type: "changed";
  payload: {
    id: Filter["id"];
    key: keyof Filter["filter"];
    value: string;
  };
};

export const filterKeys = ["state", "specialty"] as const;

const initialFilters: Filters = HIGHLIGHT_COLORS.map((color, i) => ({
  id: `filter-${i + 1}`,
  color: color,
  active: false,
  filter: Object.fromEntries(
    filterKeys.map((key) => [key, ""])
  ) as Filter["filter"],
}));

const FiltersContext = createContext<Filters | null>(null);
const FiltersDispatchContext = createContext<Dispatch<FilterAction> | null>(
  null
);

export function FiltersProvider({ children }: PropsWithChildren) {
  const [filters, dispatch] = useReducer(filtersReducer, initialFilters);

  return (
    <FiltersContext.Provider value={filters}>
      <FiltersDispatchContext.Provider value={dispatch}>
        {children}
      </FiltersDispatchContext.Provider>
    </FiltersContext.Provider>
  );
}

export function useFilters() {
  const filtersContext = useContext(FiltersContext);
  if (!filtersContext) {
    throw new Error(
      "useFilters has to be used within <FiltersContext.Provider>"
    );
  }
  return filtersContext;
}

export function useFiltersDispatch() {
  const filtersDispatchContext = useContext(FiltersDispatchContext);
  if (!filtersDispatchContext) {
    throw new Error(
      "useFiltersDispatch has to be used within <FiltersDispatchContext.Provider>"
    );
  }
  return filtersDispatchContext;
}

function filtersReducer(state: Filters, action: FilterAction) {
  const {
    type,
    payload: { id, key, value },
  } = action;
  switch (type) {
    case "changed":
      return state.map((f) => {
        if (f.id === id) {
          const filter = {
            ...f.filter,
            [key]: value,
          };
          const active = Array.from(Object.values(filter)).every((v) => !!v);
          return {
            ...f,
            active,
            filter,
          };
        } else {
          return f;
        }
      });
    default:
      return state;
  }
}
