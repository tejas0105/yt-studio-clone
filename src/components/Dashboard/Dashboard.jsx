import { useEffect, useState, useContext } from "react";
import UserContext from "../context/UserContext";
import AnalyticsContext from "../context/AnalyticsContext";
import UploadDiv from "./UploadDiv";
import ChannelFacts from "./ChannelFacts";

const Dashboard = () => {
  const [subsCount, setSubCount] = useState("");
  const [viewsCount, setViewsCount] = useState(0);

  const { result } = useContext(UserContext);
  const { views } = useContext(AnalyticsContext);

  useEffect(() => {
    if (result) {
      if (result?.items?.[0]?.statistics?.subscriberCount) {
        setSubCount(result?.items?.[0]?.statistics?.subscriberCount);
      }
    }
  }, [result]);

  useEffect(() => {
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
    <div className="dashboard-div  h-[calc(100vh-4rem)]">
      <div className="title-div flex ">
        <h2 className="title text-center mt-8 ml-8">Channel Dashboard</h2>
      </div>
      <div className="info-content flex h-[calc(100% - 62px)] overflow-auto">
        <UploadDiv />
        <section className="dashboard-div-right-section">
          <ChannelFacts viewsCount={viewsCount} subsCount={subsCount} />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
