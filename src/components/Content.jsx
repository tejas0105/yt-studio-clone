import { useContext, useEffect, useState } from "react";
import UserContext from "./context/UserContext";

const Content = () => {
  const { videoList, viewCount } = useContext(UserContext);
  const [date, setDate] = useState([]);
  const [view, setView] = useState("");
  const [comment, setComment] = useState("");
  const [formattedDate, setFormattedDate] = useState([]);

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
    if (view && view.length > 0) {
      console.log(view);
    }
  }, [view]);

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
                        <p className="view-count">no view</p>
                      )}
                    </div>
                    <div className="comment-count-div">
                      {view && view.length > 0 ? (
                        <p className="comment-count">{view[index]}</p>
                      ) : (
                        <p className="comment-count">no commentsw</p>
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
