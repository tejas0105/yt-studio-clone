import { Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Error from "./Error Components/NotAuthorized";
import UserContext from "./context/UserContext";

const Layout = () => {
  const { result, cookie, toggleSidebar } = useContext(UserContext);
  const [img, setImg] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    username: "",
  });
  const [dropDown, setDropDown] = useState(false);
  const [cookieExpired, setIsCookieExpired] = useState(false);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    setImg(result?.data?.channel?.thumbnails?.high?.url);
    if (result) {
      setUserDetails((prevState) => ({
        ...prevState,
        name: result?.data?.channel?.title,
        username: result?.data?.channel?.customUrl,
      }));
    }
  }, [result]);

  useEffect(() => {
    if (userDetails) console.log(userDetails);
  }, [userDetails]);

  useEffect(() => {
    if (cookie) {
      console.log();
      setIsCookieExpired(false);
    } else {
      setIsCookieExpired(true);
    }
  }, [cookie]);

  if (cookieExpired) {
    return <Error />;
  } else {
    return (
      <div className="layout">
        <div className="navbar-div">
          <Navbar setDropDown={setDropDown} dropDown={dropDown} />
        </div>
        <section className="content w-full flex h-[calc(100vh-4rem)]">
          <div
            className={`sidebar-div m-0 duration-300 ease-in-out ${
              toggleSidebar ? "w-80" : "w-16"
            } h-full border-r border-gray-300`}
          >
            <Sidebar />
          </div>
          <div className="outlet-div w-full h-full">
            {dropDown && (
              <div className="rounded-md bg-white border-gray-100 flex flex-col shadow-lg top-12 fixed right-0 h-auto w-[16rem] z-50 mr-7">
                <section className="upper-section h-[4.5rem] flex justify-start items-center border-b border-t rounded-t-lg w-full border-gray-100">
                  <div className="current-user-div flex justify-center items-center h-16 w-16">
                    <img
                      className="current-user rounded-full h-9 w-9"
                      src={img}
                      alt="current-user"
                    />
                    <div className="name-username fixed right-[5.7rem]">
                      <p className="text-sm">{userDetails.name}</p>
                      <p className="text-sm">{userDetails.username}</p>
                    </div>
                  </div>
                </section>
                <div className="cursor-pointer p-2 transition hover:bg-gray-200">
                  <h1>Settings</h1>
                </div>
                <div className="cursor-pointer p-2 transition hover:bg-gray-100">
                  <h1>Sign Out</h1>
                </div>
              </div>
            )}
            <Outlet />
          </div>
        </section>
      </div>
    );
  }
};

export default Layout;
