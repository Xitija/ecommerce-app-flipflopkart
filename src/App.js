import { Routes, Route, NavLink } from "react-router-dom";

import "./App.css";
import { Header } from "./components/Header/Header";

import Mockman from "mockman-js";
import { Products } from "./pages/Products";
import { Auth } from "./pages/Auth";
import { Landing } from "./pages/Landing/Landing";
import { Error } from "./pages/Error/Error";
import logo from "./logo.png";
import { useState, useRef } from "react";

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <div className="content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/products" element={<Products />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/mockman" element={<Mockman />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
