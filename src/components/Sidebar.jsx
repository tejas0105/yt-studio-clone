/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

import links from "./links";

function Sidebar({ data }) {
  const [img, setImg] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (data && data.items && data.items[0]) {
      setImg(data.items[0].snippet.thumbnails.default.url);
      setName(data.items[0].snippet.title);
    }
  }, [data]);

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
