import { useData } from "../../contexts/DataContext";

import "./Filters.css";
import { star } from "../../assets/pictures";

export const Filters = () => {
  const {
    categories,
    priceLessThan,
    selectedRating,
    selectedSort,
    selectedCategories,
    setPriceRange,
    dataDispatcher,
  } = useData();

  const ratings = [4, 3, 2, 1];

  const { minPrice, maxPrice } = setPriceRange();

  const sortHandler = (event) => {
    console.log(event.target.value,"atvS")
    dataDispatcher({
      type: "SELECT_SORT",
      payload: event.target.value,
    });
  };

  return (
    <div className="filters-content">
      <div className="filters-header">
        <label>Filters</label>
        <button
          className="filters-clear-btn"
          onClick={() =>
            dataDispatcher({
              type: "CLEAR_FILTERS",
            })
          }
        >
          Clear
        </button>
      </div>
      <div className="filters-price">
        <p>Price</p>
        <div className="filters-price-range">
          <p>100</p>
          <p>2000</p>
        </div>
        <input
          className="range-slider"
          type="range"
          min={minPrice}
          max={maxPrice}
          value={priceLessThan}
          onChange={(event) =>
            dataDispatcher({
              type: "SET_PRICE_LESS_THAN",
              payload: event.target.value,
            })
          }
        />
      </div>
      <div className="filters-category">
        <p>Categories</p>
        {categories.map(({ _id, categoryName }) => (
          <div key={_id}>
            <input
              className="category-checkbox"
              type="checkbox"
              id={categoryName}
              name={categoryName}
              value={categoryName}
              checked={selectedCategories.includes(categoryName)}
              onChange={(event) =>
                dataDispatcher({
                  type: "SELECT_CATEGORY",
                  payload: event.target.value,
                })
              }
            />
            <label className="accessiblity" htmlFor={categoryName}>
              {categoryName}
            </label>
          </div>
        ))}
      </div>
      <div className="filters-rating">
        <p>Customer Ratings</p>
        {ratings.map((rating) => (
          <div key={rating}>
            <input
              className="rating-radio"
              type="radio"
              id={rating}
              name="rating"
              value={rating}
              checked={rating === selectedRating}
              onChange={(event) =>
                dataDispatcher({
                  type: "SELECT_RATING",
                  payload: event.target.value,
                })
              }
            />
            <label className="accessiblity" htmlFor={rating}>
              {rating}
              <img
                style={{ width: "0.75rem", padding: "0 0.2rem" }}
                src={star}
                alt="star"
              />
              & above
            </label>
          </div>
        ))}
      </div>
      <div className="filters-category">
        <p>Sort by - Price</p>
        <div>
          <input
            className="category-checkbox"
            type="radio"
            name="sort"
            value="LOW_TO_HIGH"
            id="LOW_TO_HIGH"
            checked={selectedSort == "LOW_TO_HIGH"}
            onChange={(e) => sortHandler(e)}
          />
          <label className="accessiblity" htmlFor="LOW_TO_HIGH">
            Low to High
          </label>
        </div>
        <div>
          <input
            className="category-checkbox"
            type="radio"
            name="sort"
            value="HIGH_TO_LOW"
            id="HIGH_TO_LOW"
            checked={selectedSort == "HIGH_TO_LOW"}
            onChange={(e) => sortHandler(e)}
          />
          <label className="accessiblity" htmlFor="HIGH_TO_LOW">
            High to Low
          </label>
        </div>
      </div>
      <div className="filters-category"></div>
    </div>
  );
};
