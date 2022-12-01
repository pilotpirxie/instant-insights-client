import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/css/bootstrap.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from "./utils/reportWebVitals";
import store from "./utils/store";
import Login from "./containers/Login/Login";
import Error from "./containers/Error/Error";
import Dashboard from "./containers/Dashboard/Dashboard";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
    errorElement: <Error />,
  },
  {
    path: "login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    errorElement: <Error />,
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
