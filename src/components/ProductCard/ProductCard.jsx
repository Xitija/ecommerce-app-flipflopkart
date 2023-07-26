import { Link } from "react-router-dom";
import { useProduct } from "../../contexts/ProductContext";

import { AiFillHeart, AiOutlineHeart, AiFillStar } from "react-icons/ai";
import "./ProductCard.css";

export const ProductCard = ({ product }) => {
  const { wishlist, cart, handleWishlist, handleCart } = useProduct();
  const { category, rating, in_stock, sell_price, title, image, _id } = product;

  const wishlistedByUser = wishlist.some((product) => product._id === _id);

  const inUserCart = cart.some(({ _id }) => _id === product._id);

  return (
    <Link className="product-card" to={`/product-details/${_id}`}>
      <div>
        <img src={image} alt={title} className="product-image" />
      </div>
      <div className="product-info">
        <p className="truncate">{title}</p>

        <p>{category}</p>
        <p>
          {rating} <AiFillStar />
        </p>
        <p>
          {"₹ "}
          {sell_price}
        </p>
      </div>
      {in_stock && (
        <button
          className="add-to-cart-btn"
          onClick={(e) => {
            e.preventDefault();
            handleCart(product, inUserCart);
          }}
        >
          {inUserCart ? "GO TO CART" : "ADD TO CART"}
        </button>
      )}
      {!in_stock && (
        <button className="add-to-cart-btn out-of-stock">OUT OF STOCK</button>
      )}
       <div
        className="wishlist-icon-product"
          onClick={(e) => {
            e.preventDefault();
            handleWishlist(product, wishlistedByUser);
          }}
        >
          {wishlistedByUser ? <AiFillHeart /> : <AiOutlineHeart />}
        </div>
    </Link>
  );
};
