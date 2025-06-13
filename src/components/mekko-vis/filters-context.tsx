import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";
import { Filters } from "./types";

type FilterAction = {
  type: "changed";
  payload: {
    value: Filters;
  };
};

const initialFilters: Filters = [];

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
    payload: { value },
  } = action;
  switch (type) {
    case "changed":
      return value;
    default:
      return state;
  }
}
