import { NavLink } from "react-router-dom";
import { cartempty } from "../../assets/pictures";

import { useProduct } from "../../contexts/ProductContext";
import { CartProductCard } from "../../components/CartProductCard/CartProductCard";
import "./Cart.css";
import { PriceDetails } from "../../components/PriceDetails/PriceDetails";

export const Cart = () => {
  const { cart } = useProduct();

  return (
    <div>
      {cart.length > 0 && (
        <div className="cart">
          <div className="cart-product-list">
            {cart.map((product) => (
              <CartProductCard key={product._id} product={product} />
            ))}
          </div>
          <PriceDetails />
        </div>
      )}
      {cart.length === 0 && (
        <NavLink to="/products" className="cart_empty">
          <img className="img_cart" src={cartempty} alt="Cart_Empty" />
          <button>Shop Flipflops</button>
        </NavLink>
      )}
    </div>
  );
};
