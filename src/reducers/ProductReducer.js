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
  }
};
