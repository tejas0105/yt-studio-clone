import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="layout">
      <div className="navbar-div">
        <Navbar />
      </div>
      <section className="content">
        <div className="sidebar-div">
          <Sidebar />
        </div>
        <div className="outlet-div">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default Layout;
