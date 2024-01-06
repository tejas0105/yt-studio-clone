import { Outlet } from "react-router-dom";
import { useContext } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Error from "./Error Components/Error";
import UserContext from "./context/UserContext";

const Layout = () => {
  const { result } = useContext(UserContext);

  if (result?.error?.code === 401) {
    return <Error />;
  }
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
