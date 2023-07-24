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

  const handleCart = (product, inUserCart) => {
    console.log(inUserCart,"inuerc")
    if (!userAuth?.isLoggedIn) {
      toast.warning("Please Login to add Product to Cart");
      navigate("/login");
    } else {
      inUserCart ? navigate("/cart") : addToCart(product);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const removeWishlistResponse = await fetch(
        `/api/user/wishlist/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: currentUserToken,
          },
        }
      );
      if (removeWishlistResponse.status === 200) {
        const { wishlist } = await removeWishlistResponse.json();
        productDispatcher({
          type: "SET_WISHLIST",
          payload: wishlist,
        });
      } else {
        console.error(removeWishlistResponse);
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

  const getUserCart = async () => {
    try {
      const cartResponse = await fetch("/api/user/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: currentUserToken,
        },
      });

      if (cartResponse.status === 200) {
        const { cart } = await cartResponse.json();
        productDispatcher({
          type: "SET_CART",
          payload: cart,
        });
      } else {
        console.error(cartResponse);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const removeCartResponse = await fetch(`/api/user/cart/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: currentUserToken,
        },
      });
      if (removeCartResponse.status === 200) {
        const { cart } = await removeCartResponse.json();
        productDispatcher({
          type: "SET_CART",
          payload: cart,
        });
      } else {
        console.error(removeCartResponse);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const addToCart = async (product) => {
    console.log("adding,", product);
    const productToAdd = JSON.stringify({
      product: product,
    });
    try {
      const addCartResponse = await fetch("/api/user/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: currentUserToken,
        },
        body: productToAdd,
      });
      if (addCartResponse.status === 201) {
        const { cart } = await addCartResponse.json();
        productDispatcher({
          type: "SET_CART",
          payload: cart,
        });
      } else {
        console.error(addCartResponse);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const setCartAndWishlist = async () => {
    getUserWishlist();
    getUserCart();
  };

  const emptyCartAndWishlist = async () => {
    productDispatcher({
      type: "SET_WISHLIST",
      payload: [],
    });
    productDispatcher({
      type: "SET_CART",
      payload: [],
    });
  };

  const value = {
    wishlist: productState.wishlist,
    cart: productState.cart,
    handleWishlist,
    handleCart,
  };

  useEffect(() => {
    !userAuth?.isLoggedIn && emptyCartAndWishlist();
    userAuth?.isLoggedIn && setCartAndWishlist();
  }, [userAuth?.isLoggedIn]);

  return <Product.Provider value={value}>{children}</Product.Provider>;
};

export const useProduct = () => useContext(Product);
