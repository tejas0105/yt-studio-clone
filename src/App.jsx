/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import Layout from "./components/Layout";
import Content from "./components/Content";
import Analytics from "./components/Analytics";
import Comments from "./components/Comments/Comments-Main";
import Home from "./components/Home";

import "./index2.css";
import "./index.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/content" element={<Content />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/comments" element={<Comments />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
