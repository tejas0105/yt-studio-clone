import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import Content from "./components/Content";
import Analytics from "./components/Analytics";
import Subtitles from "./components/Subtitles";
import Copyright from "./components/Copyright";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/content" element={<Content />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/subtitles" element={<Subtitles />} />
          <Route path="/copyright" element={<Copyright />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
