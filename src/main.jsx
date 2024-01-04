import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";
import UserContextProvider from "./components/context/UserContextProvider.jsx";
import AnalyticsContextProvider from "./components/context/AnalyticsContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.Fragment>
    <BrowserRouter>
      <UserContextProvider>
        <AnalyticsContextProvider>
          <App />
        </AnalyticsContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.Fragment>
);
