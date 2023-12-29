import profile_default from "./../assets/profile_default.svg";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="img-container">
        <img
          className="pfp-default"
          src={profile_default}
          alt="profile_default"
        />
        <p>YOUR CHANNEL NAME</p>
        <p>YOUR NAME</p>
      </div>
      <section className="lower-section-items">
        <div className="items-div">
          <ul className="items-ul">
            {/* <Link to="dashboard">Link</Link> */}
            <li>Dashboard</li>
            <li>Content</li>
            <li>Analytics</li>
            <li>Subtitles</li>
            <li>Copyright</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Sidebar;
