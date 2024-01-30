import { Outlet } from "react-router-dom";
import { useContext } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Error from "./Error Components/NotAuthorized";
import UserContext from "./context/UserContext";

const Layout = () => {
  const { result, cookie, toggleSidebar } = useContext(UserContext);

  if (result?.error?.code === 401 || !cookie) {
    return <Error />;
  }
  return (
    <div className="layout">
      <div className="navbar-div">
        <Navbar />
      </div>
      <section className="content w-full flex h-[calc(100vh-4rem)]">
        <div
          className={`sidebar-div m-0 ${
            toggleSidebar ? "w-80" : "w-16"
          } h-full border-r border-gray-300`}
        >
          <Sidebar />
        </div>
        <div className="outlet-div w-full h-full">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default Layout;
