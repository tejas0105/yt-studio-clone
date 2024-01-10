/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import links from "./links";
import UserContext from "./context/UserContext";

function Sidebar() {
  const [img, setImg] = useState("");
  const [name, setName] = useState("");

  const { result } = useContext(UserContext);

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
      <div className="img-container flex justify-center items-center flex-col h-56 relative bottom-6">
        <img
          className="pfp-default rounded-full h-28 w-28"
          src={img}
          alt="profile_default"
        />
        <p>Your channel</p>
        <p className="text-slate-500">{name}</p>
      </div>
      <section className="lower-section-items h-auto overflow-hidden">
        <div className="items-div flex justify-center items-center">
          <ul className="items-ul w-full flex justify-center items-start flex-col">
            {links.map((item) => {
              return (
                <NavLink
                  style={navLinkStyles}
                  className="single-link font-black flex justify-center items-center h-11 mt-1 w-full capitalize text-slate-950 no-underline duration-300 ease-in-out hover:bg-gray-300 active:bg-gray-500"
                  key={item.id}
                  to={item.name}
                >
                  {item.name}
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
