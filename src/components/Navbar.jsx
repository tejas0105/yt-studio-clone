import { HiBars3 } from "react-icons/hi2";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

import yt_studio_logo from "./../assets/yt_studio_logo.svg";

function Navbar() {
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
          <CgProfile className="current-user" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
