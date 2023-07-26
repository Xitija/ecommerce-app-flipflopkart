import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

import { useProduct } from "../../contexts/ProductContext";

import "./CartProductCard.css";

export const CartProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { wishlist, removeFromCart, addToWishlist, handleProductQuantity } =
    useProduct();
  const { qty, size, orig_price, sell_price, title, image, _id } = product;

  const wishlistedByUser = wishlist.some((product) => product._id === _id);

  const moveToWishlist = () => {
    addToWishlist(product);
    removeFromCart(_id);
  };

  const wishlistHandler = (e) => {
    e.preventDefault();
    wishlistedByUser ? navigate("/wishlist") : moveToWishlist();
  };

  const handleQuantity = (e, type) => {
    e.preventDefault();
    handleProductQuantity(_id, type);
  };

  const discount =
    ((Number(orig_price) - Number(sell_price)) / Number(orig_price)) * 100;

  return (
    <Link className="cart-product-card" to={`/product-details/${_id}`}>
      <img src={image} alt={title} className="product-image" />
      <div className="product-info-container">
        <p className="product-title">{title}</p>
        <p className="size-cont">
          <label>Size: </label>
          {size}
        </p>
        <div className="price-details">
          <p className="selling-cost">₹{sell_price}</p>
          <p className="orignal-cost">₹{orig_price}</p>
          <p className="discount-percent">{Math.floor(discount)}% off</p>
        </div>
        <div className="quantity">
          <AiOutlineMinusCircle
            className="icon-qty"
            onClick={(e) => handleQuantity(e, "DECREMENT")}
          />
          {qty}
          <AiOutlinePlusCircle
            onClick={(e) => handleQuantity(e, "INCREMENT")}
            style={{ paddingLeft: "0.5rem" }}
            className="icon-qty"
          />
        </div>
        <button className="wishlist-btn" onClick={(e) => wishlistHandler(e)}>
          {wishlistedByUser ? "GO TO WISHLIST" : "MOVE TO WISHLIST"}
        </button>
        <button
          className="remove-from-cart-btn"
          onClick={(e) => {
            e.preventDefault();
            removeFromCart(_id);
          }}
        >
          REMOVE FROM CART
        </button>
      </div>
    </Link>
  );
};
