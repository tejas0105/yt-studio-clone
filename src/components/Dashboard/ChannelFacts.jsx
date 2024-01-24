/* eslint-disable react/prop-types */
const ChannelFacts = ({ viewsCount, subsCount }) => {
  return (
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
  );
};

export default ChannelFacts;
