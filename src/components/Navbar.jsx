/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { HiBars3 } from "react-icons/hi2";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { useContext, useEffect, useState } from "react";

import yt_studio_logo from "./../assets/yt_studio_logo.svg";
import UserContext from "./context/UserContext";

function Navbar({ dropDown, setDropDown }) {
  const { result, toggleSidebar, setToggleSidebar } = useContext(UserContext);
  const [img, setImg] = useState("");

  useEffect(() => {
    setImg(result?.items?.[0]?.snippet?.thumbnails?.default?.url);
  }, [result]);

  return (
    <div className="border h-16 flex justify-between items-center shadow-md">
      <section className="leftSection flex justify-between items-center ml-4 w-40">
        <div className="hamburger-div">
          <HiBars3
            className="hamburger ml-4 h-6 w-6 cursor-pointer"
            onClick={() => {
              setToggleSidebar(!toggleSidebar);
            }}
          />
        </div>
        <div className="yt-studio-logo-div mr-2">
          <img
            className="yt-studio-logo h-8 w-24"
            src={yt_studio_logo}
            alt="yt-studio-logo"
          />
        </div>
      </section>
      <section className="rightSection flex justify-center items-center w-4/5 h-full">
        <div className="search-bar-div w-auto relative right-[7.5rem] 2xl:right-[11rem]">
          <input
            className="pl-5 border w-[36rem] h-9 rounded-sm"
            type="text"
            placeholder="Search across your channel"
          />
        </div>
        <div className="help-div flex justify-center fixed right-24 items-center ">
          <IoIosHelpCircleOutline className="h-6 w-6" />
        </div>
        <div className="pfp-div fixed right-10">
          <img
            className="current-user cursor-pointer rounded-full h-8 w-8"
            src={img}
            alt="current-user"
            onClick={() => {
              setDropDown(!dropDown);
            }}
          />
        </div>
      </section>
    </div>
  );
}

export default Navbar;
