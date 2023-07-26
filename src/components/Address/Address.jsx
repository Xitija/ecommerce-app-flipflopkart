import { useState } from "react";
import { v4 as uuid } from "uuid";
import Modal from "react-modal";
import { AiOutlinePlus } from "react-icons/ai";

import { useProduct } from "../../contexts/ProductContext";

import "./Address.css";

export const Address = () => {
  const { address, addNewAddress, editAddress, deleteAddress } = useProduct();

  const initialAddress = {
    id: uuid(),
    name: "",
    house: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    mobile: "",
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [currentAddress, setCurrentAddress] = useState(initialAddress);

  const isFieldsValid = () => {
    return (
      currentAddress.name !== "" &&
      currentAddress.house &&
      currentAddress.city &&
      currentAddress.state &&
      currentAddress.country &&
      currentAddress.pincode &&
      currentAddress.mobile
    );
  };

  const handleDiscard = () => {
    setCurrentAddress(initialAddress);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddAddress = () => {
    setFormTitle("Add New Address");
    setIsModalOpen(true);
  };

  const handleEdit = (currAddress) => {
    setFormTitle("Edit Address");
    setCurrentAddress(currAddress);
    setIsModalOpen(true);
  };

  const handleSaveAddress = () => {
    if (isFieldsValid()) {
      setIsModalOpen(false);

      const existingAddress = address.find(
        (address) => address.id === currentAddress.id
      );

      if (existingAddress) {
        editAddress(currentAddress);
      } else {
        addNewAddress(currentAddress);
      }
      setCurrentAddress(initialAddress);
    }
  };

  const addressForm = (
    <div className="pop-up">
      <h3>{formTitle}</h3>
      {!isFieldsValid() && <p>Please fill all the fields</p>}
      <label>Name*</label>
      <input
        className="input"
        type="text"
        value={currentAddress.name}
        placeholder="Enter Name"
        onChange={(e) =>
          setCurrentAddress({ ...currentAddress, name: e.target.value })
        }
      />

      <label>House / Flat / Building*</label>
      <input
        className="input"
        type="text"
        value={currentAddress.house}
        placeholder="Enter House / Flat / Building"
        onChange={(e) =>
          setCurrentAddress({ ...currentAddress, house: e.target.value })
        }
      />

      <label>City*</label>
      <input
        className="input"
        type="text"
        value={currentAddress.city}
        placeholder="City"
        onChange={(e) =>
          setCurrentAddress({ ...currentAddress, city: e.target.value })
        }
      />

      <label>State*</label>
      <input
        className="input"
        type="text"
        value={currentAddress.state}
        placeholder="State"
        onChange={(e) =>
          setCurrentAddress({ ...currentAddress, state: e.target.value })
        }
      />

      <label>Country*</label>
      <input
        className="input"
        type="text"
        value={currentAddress.country}
        placeholder="Country"
        onChange={(e) =>
          setCurrentAddress({ ...currentAddress, country: e.target.value })
        }
      />

      <label>Pincode*</label>
      <input
        className="input"
        type="number"
        value={currentAddress.pincode}
        placeholder="Pincode"
        onChange={(e) =>
          setCurrentAddress({ ...currentAddress, pincode: e.target.value })
        }
      />

      <label>Mobile*</label>
      <input
        className="input"
        type="number"
        value={currentAddress.mobile}
        placeholder="Mobile"
        onChange={(e) =>
          setCurrentAddress({ ...currentAddress, mobile: e.target.value })
        }
      />

      <button className="pop-up-btn" onClick={() => handleDiscard()}>
        Discard
      </button>

      <button className="pop-up-btn" onClick={() => handleSaveAddress()}>
        Save
      </button>
    </div>
  );

  return (
    <div>
      <div>
        {address.length > 0 && (
          <div className="cart-product-list">
            {address.map((currAddress) => (
              <div className="address-card" key={currAddress.id}>
                <p>{currAddress.name}</p>
                <p>
                  <>{currAddress.house}</>
                  <>
                    {currAddress.city} {", "}
                  </>
                  <>
                    {currAddress.state} {", "}
                  </>
                  <>{currAddress.country} </>
                </p>
                <p>Pincode : {currAddress.pincode}</p>
                <p>Phone: {currAddress.mobile}</p>
                <button className="edit-address" onClick={(e) => handleEdit(currAddress)}>Edit</button>
                <button className="delete-address"onClick={() => deleteAddress(currAddress)}>Delete</button>
                <hr />
              </div>
            ))}
          </div>
        )}
        <button className="new-address-btn" onClick={handleAddAddress}>
          <AiOutlinePlus /> Add / Edit Address
        </button>
      </div>
      <Modal
        ariaHideApp={false}
        className="pop-up-container"
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
      >
        {addressForm}
      </Modal>
    </div>
  );
};
