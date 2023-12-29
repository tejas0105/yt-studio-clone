import profile_default from "./../assets/profile_default.svg";

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
    </div>
  );
}

export default Sidebar;
