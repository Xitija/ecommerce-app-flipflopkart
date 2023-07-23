import { NavLink } from "react-router-dom";
import { wishlistempty } from "../../assets/pictures";

import "./Wishlist.css";
export const Wishlist = () => {
  return (
    <div>
      <NavLink to="/products" className="wishlist_empty">
        <img
          className="img_wishlist"
          src={wishlistempty}
          alt="Wishlist_Empty"
        />
        <p>Tap the heart icon on the product to save it here</p>
        <button>Start Wishlisting!</button>
      </NavLink>
    </div>
  );
};
