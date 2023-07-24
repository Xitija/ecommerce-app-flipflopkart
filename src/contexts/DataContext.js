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
  const [loader, setLoader] = useState(false);
  const [dataState, dataDispatcher] = useReducer(dataReducer, initialDataState);

  const setData = async () => {
    try {
      setCategories();
      setProducts();
    } catch (e) {
      console.error(e);
    }
  };

  const setCategories = async () => {
    const response = await fetch("/api/categories");
    const { categories } = await response.json();
    if (response.status === 200) {
      dataDispatcher({
        type: "SET_CATEGORIES",
        payload: categories,
      });
    }
  };

  const setProducts = async () => {
    const response = await fetch("/api/products");
    const { products } = await response.json();
    if (response.status === 200) {
      dataDispatcher({
        type: "SET_PRODUCTS",
        payload: products,
      });
    }
  };

  const getProduct = async (productId) => {
    try {
      setLoader(true);
      const response = await fetch(`/api/products/${productId}`);

      const data = await response.json();

      if (response.status === 200) {
        setLoader(false);
        return data.product;
      } else {
        setLoader(false);
        console.error(data);
      }
    } catch (e) {
      setLoader(false);
      console.error(e);
    }
  };

  // TODO: setting only once how to avoid recalculation
  const setPriceRange = () => {
    const { products } = dataState;
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
    setLoader(true);
    setData();
    const id = setTimeout(() => {
      setLoader(false);
    }, 500);
  }, []);

  const value = {
    categories: dataState.categories,
    products: dataState.products,
    loader,
    getProduct,
    setLoader,
    setPriceRange,
    dataDispatcher,
  };

  return <Data.Provider value={value}>{children}</Data.Provider>;
};

export const useData = () => useContext(Data);
