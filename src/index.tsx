import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.css";
import App from "./components/app/app";
import { Provider } from "react-redux";
import { store } from "./services/store";

ReactDOM.render(
  <React.StrictMode>
   <BrowserRouter>
      <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>
   </React.StrictMode>,
  document.getElementById("root")
);
