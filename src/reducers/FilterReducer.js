export const initialfilters = {
  selectedCategories: [],
  priceLessThan: 500,
  selectedRating: 0,
  selectedSort: "",
  search: "",
  includeOutOfStock: true,
};

export const filtersReducer = (state, action) => {
  switch (action.type) {
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
    case "SELECT_RATING":
      return { ...state, selectedRating: Number(action.payload) };
    case "SELECT_SORT":
      return { ...state, selectedSort: action.payload };
    case "SELECT_OUT_OF_STOCK":
      return { ...state, includeOutOfStock: !state.includeOutOfStock };
    case "SET_SEARCH_VALUE":
      return { ...state, search: action.payload };
    case "CLEAR_FILTERS":
      return {
        ...state,
        selectedCategories: [],
        priceLessThan: 500,
        selectedRating: 0,
        selectedSort: "",
        search: "",
        includeOutOfStock: true,
      };
    default:
      return { ...state };
  }
};
