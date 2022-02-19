import React from "react";
import "./index.css";
import App from "./App";
import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <link
      href="https://api.tiles.mapbox.com/mapbox-gl-js/v1.1.1/mapbox-gl.css"
      rel="stylesheet"
    ></link>
    <Header />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

document.body.style.overflow = "hidden";
