/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import { links, iconComponents } from "./links";
import UserContext from "./context/UserContext";

function Sidebar() {
  const [img, setImg] = useState("");
  const [name, setName] = useState("");

  const { result, toggleSidebar } = useContext(UserContext);

  useEffect(() => {
    setImg(result?.items?.[0]?.snippet?.thumbnails?.default?.url);
    setName(result?.items?.[0]?.snippet?.title);
  }, [result]);

  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? "red" : "black",
      backgroundColor: isActive ? "rgb(239, 239, 239)" : "",
    };
  };

  return (
    <div className="sidebar">
      <div
        className={`img-container flex transition-all justify-center items-center duration-300 ease-in-out flex-col ${
          toggleSidebar ? "h-56" : "h-16"
        } `}
      >
        <img
          className={`pfp-default rounded-full transition duration-300 ease-in-out ${
            toggleSidebar ? "h-28 w-28" : "h-8 w-8"
          }`}
          src={img}
          alt="profile_default"
        />
        <p className={`your-channel transition ${toggleSidebar || "hidden"}`}>
          Your channel
        </p>
        <p
          className={`channel-name ${toggleSidebar || "hidden"} text-slate-500`}
        >
          {name}
        </p>
      </div>
      <section className="lower-section-items h-auto overflow-hidden">
        <div className="items-div flex justify-center items-center">
          <ul className="items-ul w-full flex justify-center items-start flex-col">
            {links.map((item) => {
              const IconComponent = iconComponents[item.name];
              return (
                <NavLink
                  style={navLinkStyles}
                  className="single-link font-black flex justify-items-start items-center h-11 mt-1 w-full capitalize text-slate-950 no-underline duration-300 ease-in-out hover:bg-gray-300 active:bg-gray-500"
                  key={item.id}
                  to={item.name}
                >
                  <div className="flex ml-5 flex-row w-auto h-full justify-center items-center">
                    <span className="text-xl">
                      <IconComponent />
                    </span>
                    <span
                      className={`ml-4 font-bold ${toggleSidebar || "hidden"}`}
                    >
                      {item.name}
                    </span>
                  </div>
                </NavLink>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Sidebar;
