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

  useEffect(() => {
    setImg(result?.items?.[0]?.snippet?.thumbnails?.default?.url);
  }, [result]);

  return (
    <div className="navbar">
      <div className="navbar-left-section">
        <div className="hamburger-div">
          <HiBars3 className="hamburger-menu" />
        </div>
        <div className="yt-logo-div">
          <img
            className="yt_studio_logo"
            src={yt_studio_logo}
            alt="yt_studio_logo"
          />
        </div>
      </div>
      <div className="navbar-right-section">
        {/* <div className="search-bar-div"> */}
        <input
          className="search-bar"
          type="text"
          placeholder="Search across your channel"
        />
        {/* </div> */}
        <div className="help-button-div">
          <IoIosHelpCircleOutline className="help-button" />
        </div>
        <div className="create-button-div">
          <IoAdd /> CREATE
        </div>
        <div className="current-user-div">
          {/* <CgProfile className="current-user" /> */}
          <img className="current-user" src={img} alt="current-user" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
