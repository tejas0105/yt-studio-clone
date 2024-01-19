import { useContext, useEffect, useRef } from "react";
import CommentContext from "./context/CommentContext";
import UserContext from "./context/UserContext";

const Comments = () => {
  const { comments } = useContext(CommentContext);
  const { videoList } = useContext(UserContext);
  const ref = useRef(null);
  // console.log(comments);
  useEffect(() => {
    const height = ref.current.clientHeight;
    console.log(height);
  }, []);
  useEffect(() => {
    if (comments && comments.length > 0 && videoList && videoList.length > 0)
      console.log(comments);
  }, [comments, videoList]);

  return (
    <div className="comments-div overflow-auto h-[calc(100vh-4rem)]">
      <div
        className="title-div flex justify-between border-b items-center sticky h-16 top-0 z-10"
        ref={ref}
      >
        <h3 className="title text-2xl ml-7 font-extrabold">
          Channel comments & mentions
        </h3>
      </div>
      <div className="content h-[calc(100vh-8rem)] overflow-y-scroll">
        {comments &&
          comments.length > 0 &&
          videoList &&
          videoList.length > 0 &&
          comments.map((item, index) => {
            const videoId = item?.snippet?.topLevelComment?.snippet?.videoId;
            // console.log("videoId->", videoId);
            const matchedVideo = videoList.find(
              (v) => v?.contentDetails?.videoId === videoId
            );
            // console.log("matchedVideo->", matchedVideo);
            if (videoId === matchedVideo?.contentDetails?.videoId) {
              return (
                <div key={index} className="h-32 border-t">
                  <div className="comment-div h-full flex items-start ml-7 mt-4">
                    <div className="img-div">
                      <img
                        className="rounded-full"
                        src={
                          item?.snippet?.topLevelComment?.snippet
                            ?.authorProfileImageUrl
                        }
                        alt={
                          item?.snippet?.topLevelComment?.snippet
                            ?.authorDisplayName
                        }
                      />
                    </div>
                    <div className="name-comment ml-2 mt-1 flex flex-col justify-center">
                      <p className="authorName text-sm mb-1">
                        {
                          item?.snippet?.topLevelComment?.snippet
                            ?.authorDisplayName
                        }
                      </p>
                      <p className="comment text-sm">
                        {item?.snippet?.topLevelComment?.snippet?.textDisplay}
                      </p>
                      <div className="comment-actions mt-5 flex">
                        <button className="text-bold">REPLY</button>
                        {item?.replies?.comments &&
                        item?.replies?.comments.length > 0 ? (
                          <button className="replies ml-9 text-sm">
                            {item?.replies?.comments.length} replies
                          </button>
                        ) : (
                          <button
                            disabled
                            className="replies ml-9 text-sm opacity-55"
                          >
                            0 replies
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default Comments;
