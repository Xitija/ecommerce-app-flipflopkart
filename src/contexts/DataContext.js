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
    console.log(products, response);
    if (response.status === 200) {
      dataDispatcher({
        type: "SET_PRODUCTS",
        payload: products,
      });
    }
  };

  useEffect(() => {
    getData();
  },[]);

  const value = {
    dataState,
    dataDispatcher,
  };

  return <Data.Provider value={value}>{children}</Data.Provider>;
};

export const useData = () => useContext(Data);
