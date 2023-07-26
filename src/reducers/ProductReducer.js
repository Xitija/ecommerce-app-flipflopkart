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
    case "ADD_ADDRESS":
      return {
        ...state,
        address: [...state.address, action.payload],
      };
    case "EDIT_ADDRESS":
      const newAddresses = state.address.map((currAddress) =>
        currAddress.id === action.payload.id
          ? { ...action.payload }
          : currAddress
      );
      return {
        ...state,
        address: newAddresses,
      };
    case "DELETE_ADDRESS":
      const remainingAddresses = state.address.filter(
        (currAddress) => currAddress.id !== action.payload.id
      );
      return {
        ...state,
        address: remainingAddresses,
      };
    default:
      return { ...state };
  }
};
