import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import reduxThunk from "redux-thunk";
import { usePromiseTracker } from "react-promise-tracker";

import reducers from "./reducers";
import App from "./App";

const LoadingIndicator = (props) => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && (
      <div class="preloader">
        <img src="./Images/giphy.gif" class="loader" />
      </div>
    )
  );
};

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
    <LoadingIndicator />
  </Provider>,
  document.getElementById("root")
);
