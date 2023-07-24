import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { CiHeart, CiShoppingBasket, CiUser, CiSearch } from "react-icons/ci";

import { useFilters } from "../../contexts/FiltersContext";
import { useAuth } from "../../contexts/AuthContext";
import { useProduct } from "../../contexts/ProductContext";
import "../Header/Header.css";
import finallogo from "../../assets/finallogo.png";

export const Header = () => {
  const { search, filtersDispatcher } = useFilters();
  const { userAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { wishlist, cart } = useProduct();

  const handleSearchInput = () => {
    // TODO : if search length is more then navigate and dispatch both
    if (location.pathname !== "/products") {
      navigate("/products");
    }
  };

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
      <div
        className="wrapper"
        style={{ width: "30%" }}
        onClick={() => handleSearchInput()}
      >
        <div className="icon">
          <CiSearch />
        </div>
        <input
          className="input"
          type="text"
          placeholder="Search Flipflops"
          name="search"
          value={search}
          onChange={(event) =>
            filtersDispatcher({
              type: "SET_SEARCH_VALUE",
              payload: event.target.value,
            })
          }
        />
      </div>
      <div className="navigation">
        <NavLink to="/products" className="nav-link explore">
          Explore
        </NavLink>
        <NavLink to="/wishlist" className="nav-link">
          <div className="wishlist-icon">
            <CiHeart color="#fc800b" size={25} strokeWidth="1.2" />
            {wishlist.length > 0 && (
              <div className="badge">{wishlist.length}</div>
            )}
          </div>
        </NavLink>
        <NavLink to="/cart" className="nav-link">
          <div className="cart-icon">
            <CiShoppingBasket color="#fc800b" size={25} strokeWidth="1.2" />
            {cart.length > 0 && <div className="badge">{cart.length}</div>}
          </div>
        </NavLink>
        {userAuth.isLoggedIn ? (
          <NavLink to="/account/profile" className="nav-link">
            <CiUser color="#fc800b" size={25} strokeWidth="1.2" />
          </NavLink>
        ) : (
          <NavLink to="/login" className="nav-link">
            <button className="btn-login">Login</button>
          </NavLink>
        )}
      </div>
    </nav>
  );
};
