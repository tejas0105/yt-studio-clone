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
      <div className="img-container">
        <img className="pfp-default" src={img} alt="profile_default" />
        <p>Your channel</p>
        <p>{name}</p>
      </div>
      <section className="lower-section-items">
        <div className="items-div">
          <ul className="items-ul">
            {links.map((item) => {
              return (
                <NavLink
                  style={navLinkStyles}
                  className="single-link"
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
