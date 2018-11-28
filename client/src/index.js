import React from "react";
import ReactDom from "react-dom";

import 'materialize-css/dist/css/materialize.min.css';

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from 'redux-thunk'; // redux에서 비동기 처리를 가능케 함

import App from "./components/App";
import reducers from "./reducers";

const store = createStore(
    reducers,
    {},
    applyMiddleware(reduxThunk)
);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);