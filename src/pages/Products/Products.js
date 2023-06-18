import { Filters } from "../../components/Filters/Filters";
import { ProductsList } from "../../components/ProductsList/ProductsList";

import "./Products.css";

export const Products = () => {
  document.body.scrollTop = document.documentElement.scrollTop = 0;

  return (
    <div className="products-listing-contatiner">
      <div className="filters-container">
        <Filters />
      </div>
      <div className="products-container">
        {/* <div className="products-content">
          <div className="box"> */}
        <div className="item">
          <ProductsList />
        </div>
      </div>
    </div>
    //   </div>
    // </div>
  );
};
