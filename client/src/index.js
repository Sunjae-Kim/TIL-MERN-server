import React from "react";
import ReactDom from "react-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";

import App from "./components/App";

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