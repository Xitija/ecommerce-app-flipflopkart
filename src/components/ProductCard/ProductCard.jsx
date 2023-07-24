import { Link } from "react-router-dom";
import { useProduct } from "../../contexts/ProductContext";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "./ProductCard.css";

export const ProductCard = ({ product }) => {
  const { wishlist, handleWishlist } = useProduct();
  const { category, rating, in_stock, sell_price, title, image, _id } = product;

  const wishlistedByUser = wishlist.some((product) => product._id === _id);

  return (
    <Link className="product-card" to={`/product-details/${_id}`}>
      <div>
        <img src={image} alt={title} className="product-image" />
      </div>
      <div className="product-info">
        <p className="truncate">{title}</p>
      </div>
      <p>{category}</p>
      <p>{rating}</p>
      <p>{in_stock ? "in stock" : "outofstock"}</p>
      <p>{sell_price}</p>
      <span
        onClick={(e) => {
          e.preventDefault();
          handleWishlist(product, wishlistedByUser);
        }}
      >
        {wishlistedByUser ? <AiFillHeart /> : <AiOutlineHeart />}
      </span>
      <button className="add-to-cart-btn">Add to Cart</button>
    </Link>
  );
};
