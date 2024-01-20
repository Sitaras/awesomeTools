import React from "react";
import ReactDOM from "react-dom/client";

import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/material";
import { theme } from "utils/materialTheme.jsx";
import GlobalLayout from "containers/GlobalLayout";
import { HashRouter, Routes, Route } from "react-router-dom";
import NavBar from "components/NavBar/NavBar";
import AppRoutes from "utils/AppRoutes";

import "./styles/globals.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <HashRouter>
      <GlobalLayout>
        <Routes>
          <Route path="*" element={<NavBar />} />
        </Routes>
        <AppRoutes />
      </GlobalLayout>
    </HashRouter>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
