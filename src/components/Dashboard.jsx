/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./context/UserContext";

const Dashboard = () => {
  const { result } = useContext(UserContext);
  const [subsCount, setSubCount] = useState("");
  useEffect(() => {
    setSubCount(result?.items?.[0]?.statistics?.subscriberCount);
  }, [result]);

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
        <section className="dashboard-div-right-section">
          <div className="channel-facts-div">
            <div className="channel-facts-title-div">
              <h3 className="channel-facts-title">Channel Analytics</h3>
            </div>
            <div className="current-subscribers-div">
              <div className="current-subscribers-title-div">
                <p className="current-subscribers-title">Current subscribers</p>
                <h1 className="current-subscribers-number">{subsCount}</h1>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
