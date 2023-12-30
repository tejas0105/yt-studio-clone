import { NavLink } from "react-router-dom";

import profile_default from "./../assets/profile_default.svg";
import links from "./links";

function Sidebar() {
  const navLinkStyles = ({isActive}) =>{
    return {
      color: isActive ? "red" : "black",
      backgroundColor: isActive ? "rgb(239, 239, 239)":"white"
    }
  }
  return (
    <div className="sidebar">
      <div className="img-container">
        <img
          className="pfp-default"
          src={profile_default}
          alt="profile_default"
        />
        <p>Your channel name</p>
        <p>Your user name</p>
      </div>
      <section className="lower-section-items">
        <div className="items-div">
          <ul className="items-ul">
            {links.map((item)=>{
              return (
                <NavLink style={navLinkStyles} className="single-link" key={item.id} to={item.name}>{item.name}</NavLink>
              )
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Sidebar;
