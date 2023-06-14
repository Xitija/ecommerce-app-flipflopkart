export const initialDataState = {
  categories: [],
  products: [],
  selectedCategories: [],
};

export const dataReducer = (state, action) => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "SELECT_CATEGORY":
      console.log(action.payload);
      const categoryFound = state.selectedCategories.find(
        (category) => action.payload
      );
      if (!categoryFound) {
        return {
          ...state,
          selectedCategories: [...state.selectedCategories, action.payload],
        };
      }
      break;
    default:
        return {...state}
  }
};
