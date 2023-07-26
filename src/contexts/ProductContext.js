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
        toast.info("Product removed from Wishlist");
      } else {
        console.error(removeWishlistResponse);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const addToWishlist = async (product) => {
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
        toast.info("Product added to Wishlist");
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
        const updatedCart = cart.filter(({ qty }) => qty > 0);
        productDispatcher({
          type: "SET_CART",
          payload: updatedCart,
        });
        toast.info("Product removed from Cart");
      } else {
        console.error(removeCartResponse);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const addToCart = async (product) => {
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
        const updatedCart = cart.filter(({ qty }) => qty > 0);
        productDispatcher({
          type: "SET_CART",
          payload: updatedCart,
        });
        toast.info("Product added to Cart");
      } else {
        console.error(addCartResponse);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleProductQuantity = async (productId, type) => {
    const productQuantity = JSON.stringify({
      action: {
        type: type,
      },
    });
    try {
      const updateCartResponse = await fetch(`/api/user/cart/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: currentUserToken,
        },
        body: productQuantity,
      });
      if (updateCartResponse.status === 200) {
        const { cart } = await updateCartResponse.json();
        const updatedCart = cart.filter(({ qty }) => qty > 0);
        productDispatcher({
          type: "SET_CART",
          payload: updatedCart,
        });
      } else {
        console.error(updateCartResponse);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const addNewAddress = (currentAddress) => {
    productDispatcher({
      type: "ADD_ADDRESS",
      payload: currentAddress,
    });
  };

  const editAddress = (editedAddress) => {
    productDispatcher({
      type: "EDIT_ADDRESS",
      payload: editedAddress,
    });
  };

  const deleteAddress = (deleteAddress) => {
    productDispatcher({
      type: "DELETE_ADDRESS",
      payload: deleteAddress,
    });
  };

  const handleCheckout = () => {
    productDispatcher({
      type: "SET_CART",
      payload: [],
    });
    navigate("/products");
    toast.success("Order Placed Successfully!!");
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
    address: productState.address,
    removeFromCart,
    handleWishlist,
    handleCart,
    addToWishlist,
    addNewAddress,
    handleProductQuantity,
    handleCheckout,
    editAddress,
    deleteAddress,
  };

  useEffect(() => {
    !userAuth?.isLoggedIn && emptyCartAndWishlist();
    userAuth?.isLoggedIn && setCartAndWishlist();
  }, [userAuth?.isLoggedIn]);

  return <Product.Provider value={value}>{children}</Product.Provider>;
};

export const useProduct = () => useContext(Product);
