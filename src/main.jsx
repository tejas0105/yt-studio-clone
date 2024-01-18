import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.jsx";

import "./index.css";
import "./content.css";
import UserContextProvider from "./components/context/UserContextProvider.jsx";
import AnalyticsContextProvider from "./components/context/AnalyticsContextProvider.jsx";
import CommentContextProvider from "./components/context/CommentContextProvider.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.Fragment>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserContextProvider>
          <AnalyticsContextProvider>
            <CommentContextProvider>
              <App />
            </CommentContextProvider>
          </AnalyticsContextProvider>
        </UserContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.Fragment>
);
