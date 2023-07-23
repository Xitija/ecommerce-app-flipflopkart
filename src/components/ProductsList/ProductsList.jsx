import { useFilters } from "../../contexts/FiltersContext";
import { ProductCard } from "../ProductCard/ProductCard";
import "./ProductsList.css";

export const ProductsList = () => {
  const { getProductList } = useFilters();

  const productList = getProductList();
  return (
    <div>
      <div className="product-list-header">
        <label>Showing Total {productList.length} FlipFlops</label>
      </div>
      <div className="product-list">
      {productList.map(
        (product) => (
          <ProductCard
          key={product._id} product={product}/>
        )
      )}
      </div>
    </div>
  );
};
