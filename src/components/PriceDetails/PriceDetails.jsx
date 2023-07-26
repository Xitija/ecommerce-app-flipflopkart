import { useNavigate } from "react-router-dom";
import { useProduct } from "../../contexts/ProductContext";

import "./PriceDetails.css";

export const PriceDetails = () => {
  const navigate = useNavigate();
  const { cart } = useProduct();

  const orignalPrice = cart.reduce(
    (acc, curr) => acc + Number(curr.orig_price) * Number(curr.qty),
    0
  );

  const sellPrice = cart.reduce(
    (acc, curr) => acc + Number(curr.sell_price) * Number(curr.qty),
    0
  );

  const deliveryCharges = "50";

  return (
    <div className="price-details-container">
      <h2>Price Details</h2>
      <hr />
      <div className="inner-container">
        <span>Price</span>
        <span>₹{orignalPrice}</span>
      </div>
      <div className="inner-container" style={{ padding: "0.5rem 0" }}>
        <span>Discount</span>
        <span>₹{orignalPrice - sellPrice}</span>
      </div>
      <div className="inner-container">
        <span>Delivery Charges</span>
        <span style={{ color: "green" }}>FREE</span>
      </div>
      <hr />
      <div className="inner-container">
        <span className="total">Total Amount</span>
        <span className="total">₹{sellPrice}</span>
      </div>
      <hr />
      <p style={{ color: "green" }}>
        You will save ₹{orignalPrice - sellPrice} on this order
      </p>
      <button onClick={() => navigate("/checkout")} className="btn-checkout">
        CHECKOUT
      </button>
    </div>
  );
};
