import { useContext, useEffect, useState } from "react";
import UserContext from "./context/UserContext";

const Content = () => {
  const { videoList, viewCount } = useContext(UserContext);
  const [date, setDate] = useState([]);
  const [view, setView] = useState("");
  const [comment, setComment] = useState("");
  const [formattedDate, setFormattedDate] = useState([]);
  const [engagement, setEngagement] = useState();
  const [percent, setPercent] = useState([]);

  const ratioPercent = (likes, dislikes) => {
    if (
      isNaN(likes) ||
      isNaN(dislikes) ||
      likes === undefined ||
      dislikes === undefined ||
      likes + dislikes === 0
    ) {
      return 0;
    }
    return (likes / (likes + dislikes)) * 100;
  };

  useEffect(() => {
    if (viewCount) {
      console.log(viewCount);
      if (viewCount?.items && viewCount?.items.length > 0) {
        const views = viewCount?.items.map((item) => {
          return item?.statistics?.viewCount;
        });
        setView(views);
      }
    }
  }, [viewCount]);

  useEffect(() => {
    if (viewCount?.items && viewCount?.items.length > 0) {
      const comments = viewCount?.items.map((item) => {
        return item?.statistics?.commentCount;
      });
      setComment(comments);
    }
  }, [viewCount]);

  useEffect(() => {
    if (comment) {
      console.log(comment);
    }
  }, [comment]);

  useEffect(() => {
    if (viewCount?.items && viewCount?.items.length > 0) {
      const engagements = viewCount?.items.map((item) => {
        return {
          likes: item?.statistics?.likeCount,
          dislikes: item?.statistics?.dislikeCount,
        };
      });
      setEngagement(engagements);
    }
  }, [viewCount]);

  useEffect(() => {
    if (Array.isArray(engagement)) {
      const percentages = engagement.map((item) => {
        return ratioPercent(parseInt(item?.likes), parseInt(item?.dislikes));
      });
      setPercent((prevPercent) => [...prevPercent, ...percentages]);
      console.log(engagement);
    }
  }, [engagement]);

  useEffect(() => {
    console.log(percent);
  }, [percent]);

  useEffect(() => {
    setDate(
      videoList &&
        videoList.length > 0 &&
        videoList.map((item) => {
          return item?.snippet?.publishedAt.split("T")[0];
        })
    );
  }, [videoList]);

  useEffect(() => {
    function convertDateFormat(intputDate) {
      const parts = intputDate.split("-");
      const year = parseInt(parts[0]);
      const month = parseInt(parts[1]);
      const day = parseInt(parts[2]);

      const dateObject = new Date(year, month, day);

      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ];
      const monthName = monthNames[dateObject.getMonth()];
      const dayOfMonth = dateObject.getDate();
      const yearValue = dateObject.getFullYear();

      const formattedDate = `${monthName}, ${dayOfMonth} ${yearValue}`;
      return formattedDate;
    }
    if (date && date.length > 0) {
      const formattedDates = date.map((inputDate) => {
        return convertDateFormat(inputDate);
      });
      setFormattedDate(formattedDates);
    }
  }, [date]);

  // useEffect(() => {
  //   console.log(formattedDate);
  // }, [formattedDate]);

  return (
    <div className="content-page-div">
      <div className="content-page-title-div">
        <h1 className="title">Channel Content</h1>
      </div>
      <div className="content-page-info">
        <div className="vid-info-div">
          <section className="vid-info-left-secton">
            {videoList && videoList.length > 0 ? (
              videoList.map((item) => {
                const vidThumbnail = item?.snippet?.thumbnails?.default?.url;
                // console.log(vidThumbnail);
                return (
                  <div key={item?.id} className="vid-info">
                    <div className="thumbnail">
                      <img
                        src={vidThumbnail}
                        alt="thumbnail"
                        style={{
                          height: `${item?.snippet?.thumbnails?.default?.height}px`,
                          width: `${item?.snippet?.thumbnails?.default?.width}px`,
                        }}
                      />
                      <div className="title-descript">
                        <a
                          target="_blank"
                          rel="noreferrer"
                          className="vid-title"
                          href={`https://youtu.be/${item?.contentDetails?.videoId}`}
                        >
                          <p>{item?.snippet?.title}</p>
                        </a>
                        {item?.snippet?.description !== "" ? (
                          <p className="description">
                            {item?.snippet?.description}
                          </p>
                        ) : (
                          <p className="description">No Description</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Loading...</p>
            )}
          </section>
          <section className="vid-info-section-right">
            {videoList && videoList.length > 0 ? (
              videoList.map((item, index) => {
                return (
                  <div className="right-section-info" key={item?.id}>
                    <div className="status-div">
                      <p className="status">{item?.status?.privacyStatus}</p>
                    </div>
                    <div className="publishedAt-div">
                      <p className="publishedAt">{formattedDate[index]}</p>
                    </div>
                    <div className="view-count-div">
                      {view && view.length > 0 ? (
                        <p className="view-count">{view[index]}</p>
                      ) : (
                        <p className="view-count">Loading...</p>
                      )}
                    </div>
                    <div className="comment-count-div">
                      {view && view.length > 0 ? (
                        <p className="comment-count">{comment[index]}</p>
                      ) : (
                        <p className="comment-count">Loading...</p>
                      )}
                    </div>
                    <div className="ratio-div">
                      {percent && percent.length > 0 ? (
                        <div>
                          <p className="ratio">
                            {percent[index] !== 0
                              ? `${Math.ceil(percent[index])}%`
                              : "--"}
                          </p>
                          <p className="likes">
                            {engagement[index]?.likes !== "0"
                              ? `${engagement[index]?.likes} ${
                                  engagement[index]?.likes !== "1"
                                    ? "likes"
                                    : "like"
                                }`
                              : ""}
                            {percent[index] === 0 || (
                              <progress
                                className="progress-bar"
                                value={percent[index]}
                                max="100"
                              >
                                {percent[index]}
                              </progress>
                            )}
                          </p>
                        </div>
                      ) : (
                        <p className="ratio">Loading...</p>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Loading...</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Content;
