import { Routes, Route, Navigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import Mockman from "mockman-js";

import { Header } from "./components/Header/Header";
import { Products } from "./pages/Products/Products";
import { ProductDetails } from "./pages/ProductDetails/ProductDetails";
import { Landing } from "./pages/Landing/Landing";
import { Error } from "./pages/Error/Error";
import { Login } from "./pages/Login/Login";
import { SignUp } from "./pages/SignUp/SignUp";
import { Wishlist } from "./pages/Wishlist/Wishlist";
import { Cart } from "./pages/Cart/Cart";
import { Account } from "./pages/Account/Account";
import { Orders } from "./components/Orders/Orders";
import { Address } from "./components/Address/Address";
import { Profile } from "./components/Profile/Profile";
import { Loader } from "./components/Loader/Loader";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { RequiresAuth } from "./components/RequiresAuth";
import { useData } from "./contexts/DataContext";

function App() {
  const { loader } = useData();

  return (
    <div className="App">
      {loader && <Loader />}
      <header>
        <Header />
      </header>
      <div className="content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/product-details/:productId"
            element={<ProductDetails />}
          />
          <Route
            path="/wishlist"
            element={
              <RequiresAuth>
                <Wishlist />
              </RequiresAuth>
            }
          />
          <Route
            path="/cart"
            element={
              <RequiresAuth>
                <Cart />
              </RequiresAuth>
            }
          />
          <Route
            path="/account"
            element={
              <RequiresAuth>
                <Account />
              </RequiresAuth>
            }
          >
            <Route path="profile" element={<Profile />} />
            <Route path="address" element={<Address />} />
            <Route path="orders" element={<Orders />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mockman" element={<Mockman />} />
          <Route path="/page-not-found" element={<Error />} />
          <Route path="*" element={<Navigate to={"/page-not-found"} />} />
        </Routes>
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </div>
  );
}

export default App;
