import { useNavigate } from "react-router-dom";
import { useData } from "../../contexts/DataContext";
import "./Categories.css";

export const Categories = () => {
  const { dataState, dataDispatcher } = useData();

  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate("/products");
    dataDispatcher({
      type: "SELECT_CATEGORY",
      payload: categoryName,
    });
  };

  return (
    <div className="categories-background">
      <h1 className="category-heading">Shop For</h1>
      <div className="categories-section">
        {dataState?.categories?.map(({ _id, categoryName, image }) => (
          <div
            className="category-card"
            key={_id}
            onClick={() => handleCategoryClick(categoryName)}
          >
            <img className="category-image" src={image} alt={categoryName} />
            <label className="category-label">
              {categoryName[0].toUpperCase() + categoryName.slice(1)}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
