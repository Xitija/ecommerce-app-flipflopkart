import { useProduct } from "../../contexts/ProductContext";

import "./CheckOutDetails.css";

export const CheckOutDetails = ({ deliveryAddress }) => {
  const { cart, handleCheckout } = useProduct();

  const { name, house, city, state, country, pincode, mobile } =
    deliveryAddress;

  const orignalPrice = cart.reduce(
    (acc, curr) => acc + Number(curr.orig_price) * Number(curr.qty),
    0
  );

  const sellPrice = cart.reduce(
    (acc, curr) => acc + Number(curr.sell_price) * Number(curr.qty),
    0
  );

  //   const deliveryCharges = "50";

  return (
    <div className="price-details-container">
      <h2>Order Details</h2>
      <hr />
      <div className="inner-container">
        <span>Product</span>
        <span>Quantity</span>
      </div>
      <div className="product-summary">
        {cart.map(({ title, id, qty }) => (
          <div
            key={id}
            className="products-summary-container"
            style={{ padding: "0.5rem 0" }}
          >
            <span className="product-title">{title}</span>
            <span>{qty}</span>
          </div>
        ))}
      </div>
      <hr />
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
      <h2>Delivery Address</h2>
      <hr />
      <div className="delivery-address">
        <p>{name}</p>
        <p>
          <>
            {house}
            {", "}
          </>
          <>
            {city}
            {", "}
          </>
          <>
            {state}
            {", "}
          </>
          <>{country} </>
        </p>
        <p>Pincode : {pincode}</p>
        <p>Phone: {mobile}</p>
      </div>
      <button onClick={handleCheckout} className="btn-checkout">
        CHECKOUT
      </button>
    </div>
  );
};
