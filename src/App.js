import { Routes, Route, NavLink } from "react-router-dom";

// import "./App.css";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import "primereact/resources/themes/lara-light-teal/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import Mockman from "mockman-js";
import { Products } from "./pages/Products";
import { Auth } from "./pages/Auth";
import logo from "./logo.png";
import { useState , useRef} from "react";

function App() {
  const [text, setText] = useState("");
  const toastRef = useRef();

  const onBtnClick = () => {
    if (text) {
      toastRef.current.show({
        severity: "info",
        summary: "Success",
        detail: text,
      });
    } else {
      toastRef.current.show({
        severity: "error",
        summary: "Error",
        detail: "No data to display",
      });
    }
  };

  return (
    <div className="App">
      <Toast ref={toastRef} />
      <h1>Project 1</h1>

      <span className="p-float-label">
      <InputText id="input_txt" value={text} onChange={(e) => setText(e.target.value)} />
      <label htmlFor="input_txt">Enter Name</label>
      </span>
      <p>{text}</p>
      <Button
        type="button"
        label="Submit"
        icon="pi pi-check"
        onClick={onBtnClick}
      />
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/mockman" element={<Mockman />} />
      </Routes>
    </div>
  );
}

export default App;
