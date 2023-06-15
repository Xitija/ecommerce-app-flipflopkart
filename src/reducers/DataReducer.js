export const initialDataState = {
  categories: [],
  products: [],
  selectedCategories: [],
  priceLessThan: 500,
  selectedRating: 0,
  selectedSort: "",
  search: "",
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
    case "SET_PRICE_LESS_THAN":
      return {
        ...state,
        priceLessThan: action.payload,
      };
    case "SELECT_CATEGORY":
      const categoryFound = state.selectedCategories.find(
        (category) => action.payload === category
      );
      if (!categoryFound) {
        return {
          ...state,
          selectedCategories: [...state.selectedCategories, action.payload],
        };
      } else {
        return {
          ...state,
          selectedCategories: state.selectedCategories.filter(
            (category) => category !== action.payload
          ),
        };
      }
      break;
    case "SELECT_RATING":
      return { ...state, selectedRating: Number(action.payload) };
    case "SELECT_SORT":
      console.log(action.payload,"apl")
      return { ...state, selectedSort: action.payload };
    case "CLEAR_FILTERS":
      return {
        ...state,
        selectedCategories: [],
        priceLessThan: 500,
        selectedRating: 0,
        selectedSort: "",
        search: "",
      };
    default:
      return { ...state };
  }
};
