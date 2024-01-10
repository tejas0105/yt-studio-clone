/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { HiBars3 } from "react-icons/hi2";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";

import yt_studio_logo from "./../assets/yt_studio_logo.svg";
import UserContext from "./context/UserContext";

function Navbar() {
  const { result } = useContext(UserContext);
  const [img, setImg] = useState("");
  const [dimensions, setDimensions] = useState({});

  useEffect(() => {
    setImg(result?.items?.[0]?.snippet?.thumbnails?.default?.url);
    setDimensions({
      width: result?.items?.[0]?.snippet?.thumbnails?.default?.width,
      height: result?.items?.[0]?.snippet?.thumbnails?.default?.height,
    });
  }, [result]);

  return (
    <div className="navbar m-0 p-0 flex justify-between items-center h-16 w-full shadow-md">
      <div className="navbar-left-section flex justify-center items-center w-44">
        <div className="hamburger-div ml-7">
          <HiBars3 className="hamburger-menu text-2xl" />
        </div>
        <div className="yt-logo-div ml-4">
          <img
            className="yt_studio_logo h-6"
            src={yt_studio_logo}
            alt="yt_studio_logo"
          />
        </div>
      </div>
      <div className="navbar-right-section flex w-48 flex-1 justify-between items-center">
        {/* <div className="search-bar-div"> */}
        <input
          className="search-bar pl-6 border font-medium w-full h-9 mr-48 ml-48"
          type="text"
          placeholder="Search across your channel"
        />
        {/* </div> */}
        <div className="help-button-div">
          <IoIosHelpCircleOutline className="help-button text-2xl w-20 mr-2" />
        </div>
        <div className="create-button-div flex justify-between items-center h-8 p-2 mr-5 border-slate-800 border">
          <IoAdd /> CREATE
        </div>
        <div className="current-user-div mr-7">
          {/* <CgProfile className="current-user" /> */}
          <img
            className="current-user rounded-full"
            src={img}
            alt="current-user"
            style={{
              width: `${dimensions.width}`,
              height: `${dimensions.height}`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
