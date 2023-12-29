import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import Content from "./components/Content";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/content" element={<Content />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
