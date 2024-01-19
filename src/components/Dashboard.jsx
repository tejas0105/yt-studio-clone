import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./context/UserContext";
import AnalyticsContext from "./context/AnalyticsContext";

const Dashboard = () => {
  const [subsCount, setSubCount] = useState("");
  const [viewsCount, setViewsCount] = useState(0);

  const { result } = useContext(UserContext);
  const { views } = useContext(AnalyticsContext);

  useEffect(() => {
    setSubCount(result?.items?.[0]?.statistics?.subscriberCount);
    const viewsData = views?.rows;

    const calculateViewsSum = (data) => {
      if (data && data.length) {
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
          sum = sum + data[i][1];
        }
        setViewsCount(sum);
        return sum;
      }
      return 0;
    };
    calculateViewsSum(viewsData);
  }, [result, views]);

  // useEffect(() => {
  //   console.log(viewsCount);
  // }, [viewsCount]);

  return (
    <div className="dashboard-div h-[calc(100vh-4rem)]">
      <div className="title-div flex ">
        <h2 className="title text-center mt-8 ml-8">Channel Dashboard</h2>
      </div>
      <div className="info-content flex h-[calc(100% - 62px)] overflow-auto">
        <div className="upload-div rounded-md mt-4 mr-2 ml-8 border border-gray-300 p-3 h-96 w-80">
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
                <hr className="divider" />
              </div>
            </div>
            <div className="summary-div">
              <h4 className="summary-title">Summary</h4>
              <p className="days">Last 28 days</p>
              <div className="views-summary-div">
                <div className="metrics">
                  <p className="views">views</p>
                  <p className="watch-time">watch time (hours)</p>
                </div>
                <div className="values">
                  <p className="views">{viewsCount}</p>
                  <p className="watch-time">0.1</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
