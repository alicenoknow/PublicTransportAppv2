import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <link
        href="https://api.tiles.mapbox.com/mapbox-gl-js/v1.1.1/mapbox-gl.css"
        rel="stylesheet"
      ></link>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

document.body.style.overflow = "hidden";
