import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import QRGenerator from "views/QRGenerator";

const router = createBrowserRouter([
  {
    path: "/",
    element: <QRGenerator />,
  },
]);

const Router = () => {
  useEffect(() => {
    window.addEventListener("error", (e) => {
      if (e.message === "ResizeObserver loop limit exceeded") {
        const resizeObserverErrDiv = document.getElementById(
          "webpack-dev-server-client-overlay-div"
        );
        const resizeObserverErr = document.getElementById(
          "webpack-dev-server-client-overlay"
        );
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute("style", "display: none");
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute("style", "display: none");
        }
      }
    });
  }, []);
  
  return <RouterProvider router={router} />;
};

export default Router;
