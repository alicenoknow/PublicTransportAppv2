import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <link rel="stylesheet" href="https://d1a3f4spazzrp4.cloudfront.net/kepler.gl/uber-fonts/4.0.0/superfine.css"></link>
      <link href="https://api.tiles.mapbox.com/mapbox-gl-js/v1.1.1/mapbox-gl.css" rel="stylesheet"></link>
      <script src="https://unpkg.com/kepler.gl/umd/keplergl.min.js"></script>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

document.body.style.overflow = "hidden"
serviceWorker.unregister();
