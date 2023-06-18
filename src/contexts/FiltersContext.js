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

  const getFilteredProducts = () => {
    return products.filter(
      (item) =>
        item.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        (filters.selectedCategories.includes(item.category) ||
          filters.selectedCategories.length === 0) &&
        item.sell_price <= filters.priceLessThan &&
        (item.rating >= filters.selectedRating ||
          filters.selectedRating === 0) &&
        (filters.includeOutOfStock === true ||
          item.in_stock !== filters.includeOutOfStock)
    );
  };

  const getSortedProducts = (products) => {
    if (filters.selectedSort === "LOW_TO_HIGH") {
      return products.sort((a, b) => a.sell_price - b.sell_price);
    } else if (filters.selectedSort === "HIGH_TO_LOW") {
      return products.sort((a, b) => b.sell_price - a.sell_price);
    } else {
      return products;
    }
  };

  const getProductList = () => {
    return getSortedProducts(getFilteredProducts());
  };

  const value = {
    selectedCategories: filters.selectedCategories,
    priceLessThan: filters.priceLessThan,
    selectedRating: filters.selectedRating,
    selectedSort: filters.selectedSort,
    search: filters.search,
    includeOutOfStock: filters.includeOutOfStock,
    getProductList,
    filtersDispatcher,
  };

  return <Filters.Provider value={value}>{children}</Filters.Provider>;
};

export const useFilters = () => useContext(Filters);
