import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { store } from "./store/store";
import { Provider } from "react-redux";

const container = document.getElementById('root');

// Create a root.
const root = ReactDOM.createRoot(container);

// Initial render
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
