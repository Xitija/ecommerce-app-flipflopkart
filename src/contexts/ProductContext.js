import { createContext, useContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import {
  initialProductState,
  productReducer,
} from "../reducers/ProductReducer";

const Product = createContext();

export const ProductProvider = ({ children }) => {
  const currentUserToken = localStorage.getItem("token");
  const { userAuth } = useAuth();
  const navigate = useNavigate();

  const [productState, productDispatcher] = useReducer(
    productReducer,
    initialProductState
  );

  const getProduct = async (productId) => {
    try {
      const response = await fetch(`/api/products/${productId}`);

      const data = await response.json();

      if (response.status === 200) {
        return data.product;
      } else {
        console.error(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getUserWishlist = async () => {
    try {
      const wishlistResponse = await fetch("/api/user/wishlist", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: currentUserToken,
        },
      });

      if (wishlistResponse.status === 200) {
        const { wishlist } = await wishlistResponse.json();
        productDispatcher({
          type: "SET_WISHLIST",
          payload: wishlist,
        });
      } else {
        console.error(wishlistResponse);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleWishlist = (product, wishlistedByUser) => {
    if (!userAuth?.isLoggedIn) {
      toast.warning("Please Login to Wishlist a Product");
      navigate("/login");
    } else {
      wishlistedByUser
        ? removeFromWishlist(product._id)
        : addToWishlist(product);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const addWishlistResponse = await fetch(
        `/api/user/wishlist/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: currentUserToken,
          },
        }
      );
      if (addWishlistResponse.status === 200) {
        const { wishlist } = await addWishlistResponse.json();
        productDispatcher({
          type: "SET_WISHLIST",
          payload: wishlist,
        });
      } else {
        console.error(addWishlistResponse);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const addToWishlist = async (product) => {
    console.log("adding,", product);
    const productToAdd = JSON.stringify({
      product: product,
    });
    try {
      const addWishlistResponse = await fetch("/api/user/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: currentUserToken,
        },
        body: productToAdd,
      });
      if (addWishlistResponse.status === 201) {
        const { wishlist } = await addWishlistResponse.json();
        productDispatcher({
          type: "SET_WISHLIST",
          payload: wishlist,
        });
      } else {
        console.error(addWishlistResponse);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const setCartAndWishlist = async () => {
    getUserWishlist();
  };

  const emptyCartAndWishlist = async () => {
    productDispatcher({
      type: "SET_WISHLIST",
      payload: [],
    });
  };

  const value = {
    getProduct,
    getUserWishlist,
    wishlist: productState.wishlist,
    cart: productState.cart,
    removeFromWishlist,
    addToWishlist,
    handleWishlist,
  };

  useEffect(() => {
    !userAuth?.isLoggedIn && emptyCartAndWishlist();
    userAuth?.isLoggedIn && setCartAndWishlist();
  }, [userAuth?.isLoggedIn]);

  return <Product.Provider value={value}>{children}</Product.Provider>;
};

export const useProduct = () => useContext(Product);
