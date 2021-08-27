import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
// import "../bootstrap/dist/";
import AddUsers from "./components/addUsers";

ReactDOM.render(
  <React.StrictMode>
    <AddUsers />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
