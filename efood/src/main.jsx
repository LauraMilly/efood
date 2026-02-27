import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store"; 
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
<Provider store={store}>
    <BrowserRouter>
       <App />
    </BrowserRouter>
    <ToastContainer position="top-right" autoClose={2000} />
  </Provider>
  </React.StrictMode>
);