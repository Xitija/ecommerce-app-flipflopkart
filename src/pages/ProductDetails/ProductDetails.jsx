import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  BsFillStarFill,
  BsTagFill,
  BsHeartFill,
  BsHeart,
} from "react-icons/bs";

import { useProduct } from "../../contexts/ProductContext";
import { useData } from "../../contexts/DataContext";

import "./ProductDetails.css";

export const ProductDetails = () => {
  const [singleProduct, setSingleProduct] = useState({});
  const { productId } = useParams();
  const { wishlist, cart, handleWishlist, handleCart } = useProduct();
  const { getProduct } = useData();

  const wishlistedByUser = wishlist.some(
    (product) => product._id === singleProduct._id
  );

  const inUserCart = cart.some((product) => product._id === singleProduct._id);

  const getSingleProduct = async () => {
    try {
      const product = await getProduct(productId);
      setSingleProduct(product);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  const discount =
    ((Number(singleProduct?.orig_price) - Number(singleProduct?.sell_price)) /
      Number(singleProduct?.orig_price)) *
    100;

  return (
    <div className="product-details">
      <div className="product-image-container">
        <div>
          <img className="product-image" src={singleProduct?.image} />
        </div>
        <div>
          {singleProduct?.trending && (
            <span className="trending">Trending</span>
          )}
        </div>
      </div>

      <div className="detail-container">
        <h2>{singleProduct?.title}</h2>
        <p>{singleProduct?.description}</p>
        <span className="rating">
          {singleProduct?.rating} <BsFillStarFill size={12} />
        </span>
        <div className="price-details">
          <p className="selling-price">₹{singleProduct?.sell_price}</p>
          <p className="cost-price">₹{singleProduct?.orig_price}</p>
          <p className="discount">{Math.floor(discount)}% off</p>
        </div>
        <div className="size-container">
          <label>Size- UK/India</label>
          <span className="size">{singleProduct?.size}</span>
        </div>
        <hr />
        <div>
          {singleProduct?.in_stock ? (
            <div>
              <div className="in-stock-details">
                <BsTagFill className="tags" />
                Fastest Delivery in {singleProduct?.delivery_days} days
              </div>
              <div className="in-stock-details">
                <BsTagFill className="tags" />
                Inclusive Of All Taxes
              </div>
              <div className="in-stock-details">
                <BsTagFill className="tags" />
                Cash On Delivery
              </div>
            </div>
          ) : (
            <div>
              <h3>Sold Out</h3>
              <p>This item is currently out of stock</p>
            </div>
          )}
          <button
            disabled={!singleProduct?.in_stock}
            className="add-to-cart-btn"
            onClick={() => handleCart(singleProduct, inUserCart)}
          >
            {inUserCart ? "GO TO CART" : "ADD TO CART"}
          </button>
          <div>
            <span
              className="wishlist"
              onClick={() => handleWishlist(singleProduct, wishlistedByUser)}
            >
              {wishlistedByUser ? (
                <BsHeartFill size={20} />
              ) : (
                <BsHeart size={20} />
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
