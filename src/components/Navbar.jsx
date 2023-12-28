import { HiBars3 } from "react-icons/hi2";
import { IoIosHelpCircleOutline } from "react-icons/io";

import yt_studio_logo from "./../assets/yt_studio_logo.svg";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-center-section">
        <HiBars3 className="hamburger-menu" />
        <a className="img-a-tag" href="/">
          <img
            className="img-yt-studio"
            src={yt_studio_logo}
            alt="yt_studio_logo"
          />
        </a>
        <div className="navbar-right-section">
          <input
            type="text"
            className="search-bar"
            placeholder="Search across your channel"
          />
        </div>
        <div className="help-button-div">
          <a href="help-a-tag">
            <IoIosHelpCircleOutline className="help-img" />
          </a>
        </div>
        <div className="create-button-div">
          <a href="#" className="create-button">
            CREATE
          </a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
