export const initialProductState = {
  cart: [],
  wishlist: [],
  address: [],
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_WISHLIST":
      return {
        ...state,
        wishlist: action.payload,
      };
    case "SET_CART":
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return { ...state };
  }
};
