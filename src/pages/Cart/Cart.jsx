import { NavLink } from "react-router-dom";
import { cartempty } from "../../assets/pictures";

import "./Cart.css";
export const Cart = () => {
  return (
      <NavLink to="/products" className="cart_empty">
        <img className="img_cart" src={cartempty} alt="Cart_Empty" />
        <button>Shop Flipflops</button>
      </NavLink>
  );
};
