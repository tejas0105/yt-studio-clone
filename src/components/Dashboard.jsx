/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="dashboard-div">
      <div className="title-div">
        <h2 className="title">Channel Dashboard</h2>
      </div>
      <div className="info-content">
        <div className="upload-div">
          <div className="inner-upload-div">
            <p>Want to see metrics on your recent video?</p>
            <p>Upload and publish a video to get started.</p>
            <Link className="upload-btn" to="/">
              UPLOAD VIDEOS
            </Link>
          </div>
        </div>
        <div className="analytics-div"></div>
      </div>
    </div>
  );
};

export default Dashboard;
