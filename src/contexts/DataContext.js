import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

import { initialDataState, dataReducer } from "../reducers/DataReducer";

export const Data = createContext();

export const DataProvider = ({ children }) => {
  const [dataState, dataDispatcher] = useReducer(dataReducer, initialDataState);

  const getData = async () => {
    try {
      getCategories();
      getProducts();
    } catch (e) {
      console.error(e);
    }
  };

  const getCategories = async () => {
    const response = await fetch("/api/categories");
    const { categories } = await response.json();
    console.log(categories, response);
    if (response.status === 200) {
      dataDispatcher({
        type: "SET_CATEGORIES",
        payload: categories,
      });
    }
  };

  const getProducts = async () => {
    const response = await fetch("/api/products");
    const { products } = await response.json();
    if (response.status === 200) {
      dataDispatcher({
        type: "SET_PRODUCTS",
        payload: products,
      });
    }
  };

  const setPriceRange = () => {
    const products = dataState.products;
    return products?.reduce(
      (prices, { sell_price }) => {
        const min = sell_price < prices.minPrice ? sell_price : prices.minPrice;
        const max = sell_price > prices.maxPrice ? sell_price : prices.maxPrice;
        return { minPrice: min, maxPrice: max };
      },
      { minPrice: products[0]?.sell_price, maxPrice: products[0]?.sell_price }
    );
  };

  useEffect(() => {
    getData();
  }, []);

  const value = {
    categories: dataState.categories,
    products: dataState.products,
    selectedCategories: dataState.selectedCategories,
    priceLessThan: dataState.priceLessThan,
    selectedRating: dataState.selectedRating,
    selectedSort: dataState.selectedSort,
    setPriceRange,
    dataDispatcher,
  };

  return <Data.Provider value={value}>{children}</Data.Provider>;
};

export const useData = () => useContext(Data);
