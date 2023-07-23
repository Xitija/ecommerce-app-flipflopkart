import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "./ProductCard.css";

export const ProductCard = ({ product }) => {
  const { category, rating, in_stock, sell_price, title, image } = product;
  return (
    <div className="product-card">
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
      {/* </div> */}
      <AiOutlineHeart/>
      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
  );
};
