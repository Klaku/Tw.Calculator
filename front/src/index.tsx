import React from "react";
import ReactDOM from "react-dom";
import Layout from "./components/layout/Layout";
import { BrowserRouter } from "react-router-dom";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "./index.css";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
