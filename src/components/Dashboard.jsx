import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const ref = useRef(null);
  useEffect(()=>{
    console.log(ref.current.clientHeight);
  },[])
  return (
    <div className="dashboard-div">
      <div className="title-div" ref={ref}>
        <h2 className="title">Channel Dashboard</h2>
      </div>
      <div className="info-content">
        <div className="upload-div">
          
          <div className="inner-upload-div"><p>Want to see metrics on your recent video?</p>
          <p>Upload and publish a video to get started.</p><Link className="upload-btn" to="/">UPLOAD VIDEOS</Link></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
