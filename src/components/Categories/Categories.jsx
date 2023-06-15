import { useNavigate } from "react-router-dom";
import { useData } from "../../contexts/DataContext";
import "./Categories.css";

export const Categories = () => {
  const { categories, dataDispatcher } = useData();

  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    // document.body.scrollTop = document.documentElement.scrollTop = 0;
    // window.scroll({
    //   top: 0, 
    //   left: 0, 
    //   behavior: 'smooth' 
    //  });
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
        {categories?.map(({ _id, categoryName, image }) => (
          <div
            className="category-card"
            key={_id}
            onClick={() => handleCategoryClick(categoryName)}
          >
            <img className="category-image" src={image} alt={categoryName} />
            <label className="category-label">
              {categoryName}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
