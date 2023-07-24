import { NavLink } from "react-router-dom";
import { useProduct } from "../../contexts/ProductContext";
import { wishlistempty } from "../../assets/pictures";

import { ProductCard } from "../../components/ProductCard/ProductCard";

import "./Wishlist.css";

export const Wishlist = () => {
  const { wishlist } = useProduct();

  return (
    <div>
      {wishlist.length && (
        <div className="product-list">
          {wishlist.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
      {wishlist.length === 0 && (
        <NavLink to="/products" className="wishlist_empty">
          <img
            className="img_wishlist"
            src={wishlistempty}
            alt="Wishlist_Empty"
          />
          <p>Tap the heart icon on the product to save it here</p>
          <button>Start Wishlisting!</button>
        </NavLink>
      )}
    </div>
  );
};
