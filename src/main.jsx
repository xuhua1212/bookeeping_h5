/*
 * @Author: xuhua
 * @Date: 2023-02-21 11:34:48
 * @LastEditors: xuhua
 * @LastEditTime: 2023-03-02 16:07:57
 * @FilePath: /bookkeeping_h5/src/main.jsx
 * @Description:
 */
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
