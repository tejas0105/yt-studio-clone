import { useContext, useEffect } from "react";
import UserContext from "./context/UserContext";

const Content = () => {
  const { videoList } = useContext(UserContext);

  useEffect(() => {
    if (videoList) console.log(videoList);
  }, [videoList]);

  return (
    <div className="content-page-div">
      <div className="content-page-title-div">
        <h1 className="title">Channel Content</h1>
      </div>
      <div className="content-page-info">
        <div className="vid-info-div">
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
            <p>No videos available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;
