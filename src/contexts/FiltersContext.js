import { createContext, useContext, useReducer } from "react";

import { initialfilters, filtersReducer } from "../reducers/FilterReducer";
import { useData } from "./DataContext";

export const Filters = createContext();

export const FiltersProvider = ({ children }) => {
  const [filters, filtersDispatcher] = useReducer(
    filtersReducer,
    initialfilters
  );

  const { products } = useData();

  const getProducts = () => {
    return products;
  };

  const value = {
    selectedCategories: filters.selectedCategories,
    priceLessThan: filters.priceLessThan,
    selectedRating: filters.selectedRating,
    selectedSort: filters.selectedSort,
    search: filters.search,
    includeOutOfStock: filters.includeOutOfStock,
    getProducts,
    filtersDispatcher,
  };

  return <Filters.Provider value={value}>{children}</Filters.Provider>;
};

export const useFilters = () => useContext(Filters);
