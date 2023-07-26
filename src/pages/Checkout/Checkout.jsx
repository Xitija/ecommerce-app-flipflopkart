import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useProduct } from "../../contexts/ProductContext";
import { CheckOutDetails } from "../../components/CheckOutDetails/CheckOutDetails";

import "./Checkout.css";

export const Checkout = () => {
  const navigate = useNavigate();
  const { address } = useProduct();
  const [deliveryAddress, setDeliveryAddress] = useState(
    address[0] ? address[0] : {}
  );

  const handleAddress = (selectAddress) => {
    setDeliveryAddress(selectAddress);
  };

  return (
    <div>
      <div>
        {address.length > 0 && (
          <div className="checkout">
            <div className="select-address">
              <h2>Select Address</h2>
              {address.map((singleAddress) => (
                <div className="address-detail-card" key={singleAddress.id}>
                  <p>{singleAddress.name}</p>
                  <p>
                    <>
                      {singleAddress.house} {", "}
                    </>
                    <>
                      {singleAddress.city} {", "}
                    </>
                    <>
                      {singleAddress.state} {", "}
                    </>
                    <>{singleAddress.country} </>
                  </p>
                  <p>Pincode : {singleAddress.pincode}</p>
                  <p>Phone: {singleAddress.mobile}</p>
                  <button
                    className={
                      deliveryAddress.id === singleAddress.id
                        ? "selected-btn"
                        : "non-selected-btn"
                    }
                    onClick={() => handleAddress(singleAddress)}
                  >
                    {deliveryAddress.id === singleAddress.id
                      ? "SELECTED"
                      : "SELECT"}
                  </button>
                </div>
              ))}
              <button
                className="add-new-address"
                onClick={() => navigate("/account/address")}
              >
                Add new Address
              </button>
            </div>
            <CheckOutDetails deliveryAddress={deliveryAddress} />
          </div>
        )}
      </div>
      {!address.length && (
        <div className="proceed-checkout">
          <p>Please Add Address to Proceed Checkout</p>
          <button
            className="add-new-address"
            onClick={() => navigate("/account/address")}
          >
            Add New Address
          </button>
        </div>
      )}
    </div>
  );
};
