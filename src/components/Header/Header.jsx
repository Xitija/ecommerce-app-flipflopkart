import { NavLink, Routes, Route } from "react-router-dom";
import { CiHeart, CiShoppingBasket, CiUser, CiSearch } from "react-icons/ci";

import "../Header/Header.css";
import finallogo from "../../assets/finallogo.png";

export const Header = () => {
  return (
    <nav className="nav-bar">
      <NavLink to="/" style={{ display: "contents" }}>
        <img
          className="logo"
          style={{ width: "15%" }}
          src={finallogo}
          alt="Flipflopkart_logo"
        />
      </NavLink>
      <div className="wrapper" style={{ width: "30%" }}>
        <div className="icon">
          <CiSearch />
        </div>
        <input
          className="input"
          type="text"
          placeholder="Search Flipflops"
          name="search"
        />
      </div>
      <div className="navigation">
        <NavLink to="/wishlist" className="nav-link">
          <CiHeart color="#fc800b" size={25} strokeWidth="1.2" />
        </NavLink>
        <NavLink to="/cart" className="nav-link">
          <CiShoppingBasket color="#fc800b" size={25} strokeWidth="1.2" />
        </NavLink>
        <NavLink to="/account" className="nav-link">
          <CiUser color="#fc800b" size={25} strokeWidth="1.2" />
        </NavLink>
      </div>
    </nav>
  );
};
