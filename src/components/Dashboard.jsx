import { useEffect, useRef } from "react";

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
          <h3>upload videos</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
