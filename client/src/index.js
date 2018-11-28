import React from "react";
import ReactDom from "react-dom";

import 'materialize-css/dist/css/materialize.min.css';

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import App from "./components/App";
import reducers from "./reducers";

const store = createStore(
    reducers,
    {},
    applyMiddleware()
);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);