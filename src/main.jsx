// import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import axios from "axios";
import "./main.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./HomePage.jsx";
import ZonePage from "../Components/ZonePage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route
        path="zone/:id"
        element={<ZonePage />}
        loader={(req) => req.params.id}
      />
      {/* <Route
        path="zone"
        element={<ZonePage />}
        loader={(req) => req.params.id}
      /> */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

// ANCHOR == ARCHIVED ==
