import { useContext, useEffect, useState } from "react";
import CommentContext from "./context/CommentContext";
import UserContext from "./context/UserContext";

import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

const Comments = () => {
  const { comments } = useContext(CommentContext);
  const { videoList, cookie } = useContext(UserContext);

  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [repliesToggle, setRepliesToggle] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replyData, setReplyData] = useState();
  const [refreshDiv, setRefreshDiv] = useState(false);
  const [commentsData, setCommentsData] = useState();

  const handleReplyClick = (id) => {
    setEditingCommentIndex(id === editingCommentIndex ? null : id);
  };

  const handleRepliesToggle = (id) => {
    setRepliesToggle(id === repliesToggle ? null : id);
  };

  const handleReplyTextChange = (e) => {
    setReplyText(e.target.value);
  };

  useEffect(() => {
    if (comments && comments.length > 0 && videoList && videoList.length > 0)
      console.log(comments);
  }, [comments, videoList]);

  const postReply = async (parentId) => {
    const postData = await fetch(
      `https://youtube.googleapis.com/youtube/v3/comments?part=snippet&key=${
        import.meta.env.VITE_API_KEY
      }`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cookie}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          snippet: {
            parentId: parentId,
            textOriginal: replyText,
          },
        }),
      }
    );
    const data = await postData.json();
    setReplyData(data);
    setRefreshDiv(true);
    console.log(parentId);
  };

  // useEffect(() => {
  //   if (replyData) {
  //     console.log(replyData);
  //   }
  // }, [replyData]);

  const fetchComments = async (parentId) => {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/comments?part=snippet&parentId=${parentId}&key=${
        import.meta.env.VITE_API_KEY
      }`
    );
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (comments && comments.length > 0) {
        const data = [];
        for (const comment of comments) {
          const commentData = await fetchComments(comment?.id);
          data.push(commentData);
        }
        setCommentsData(data);
      }
    };
    fetchData();
  }, [comments]);

  useEffect(() => {
    if (commentsData && commentsData.length > 0) {
      console.log(commentsData);
    }
  }, [commentsData]);

  return (
    <div className="comments-div overflow-auto h-[calc(100vh-4rem)]">
      <div className="title-div flex justify-between border-b shadow-md items-center sticky h-16 top-0 z-10">
        <h3 className="title text-2xl ml-7 font-extrabold">
          Channel comments & mentions
        </h3>
      </div>
      <div
        key={refreshDiv}
        className="content h-[calc(100vh-8rem)] overflow-y-scroll"
      >
        {comments &&
          comments.length > 0 &&
          videoList &&
          videoList.length > 0 &&
          comments.map((item, index) => {
            const videoId = item?.snippet?.topLevelComment?.snippet?.videoId;
            const matchedVideo = videoList.find(
              (v) => v?.contentDetails?.videoId === videoId
            );
            if (videoId === matchedVideo?.contentDetails?.videoId) {
              return (
                <div key={item?.id} className="h-auto border-t">
                  <div className="comment-div h-full flex items-start p-4">
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
                      <p className="authorName text-sm mb-1 opacity-65">
                        {
                          item?.snippet?.topLevelComment?.snippet
                            ?.authorDisplayName
                        }
                      </p>
                      <p className="comment text-sm">
                        {item?.snippet?.topLevelComment?.snippet?.textDisplay}
                      </p>
                      <div className="comment-actions mt-5 flex">
                        <button
                          className="text-bold"
                          onClick={() => handleReplyClick(item?.id)}
                        >
                          REPLY
                        </button>

                        {commentsData?.[index]?.items &&
                        commentsData?.[index]?.items.length > 0 ? (
                          <button className="replies ml-9 text-sm flex">
                            {commentsData[index].items.length} replies{" "}
                            {/* toggle showReplies button */}
                            {repliesToggle === item?.id ? (
                              <FaAngleUp
                                onClick={() => handleRepliesToggle(item?.id)}
                                className="ml-2 mt-1"
                              />
                            ) : (
                              <FaAngleDown
                                onClick={() => handleRepliesToggle(item?.id)}
                                className="ml-2 mt-1"
                              />
                            )}
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
                      {editingCommentIndex === item?.id && (
                        <div className="flex flex-col" key={item?.id}>
                          <input
                            placeholder="type a reply"
                            className="border h-16 w-64 text-sm"
                            type="text"
                            value={replyText}
                            onChange={handleReplyTextChange}
                          />
                          <div className="flex">
                            <button
                              onClick={() => handleReplyClick(item?.id)}
                              className="ml-2"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => {
                                postReply(item?.id);
                                setReplyText("");
                              }}
                              className="ml-4"
                            >
                              Reply
                            </button>
                          </div>
                        </div>
                      )}
                      {commentsData?.[index]?.items &&
                        commentsData?.[index]?.items.length > 0 &&
                        repliesToggle === item?.id &&
                        commentsData?.[index]?.items.map((reply) => {
                          // console.log(reply?.snippet?.parentId);
                          return (
                            <div
                              key={reply?.id}
                              className="h-auto w-auto flex items-center p-3"
                            >
                              <div className="repliy-img-div ml-2">
                                <img
                                  className="rounded-full"
                                  src={reply?.snippet?.authorProfileImageUrl}
                                  alt={reply?.snippet?.authorProfileDisplayName}
                                />
                              </div>
                              <div className="reply-author-name-div flex flex-col ml-3">
                                <p className="reply-author-name text-sm opacity-65">
                                  {reply?.snippet?.authorDisplayName}
                                </p>
                                <p className="text-sm">
                                  {reply?.snippet?.textDisplay}
                                </p>

                                <button
                                  onClick={() => handleReplyClick(reply?.id)}
                                  className="text-bold text-left mt-1"
                                >
                                  REPLY
                                </button>

                                {editingCommentIndex === reply?.id && (
                                  <div
                                    className="flex flex-col"
                                    key={reply?.id}
                                  >
                                    <input
                                      placeholder="type a reply"
                                      className="border h-16 w-64 text-sm"
                                      type="text"
                                      value={replyText}
                                      onChange={handleReplyTextChange}
                                    />
                                    <div className="flex">
                                      <button
                                        onClick={() =>
                                          handleReplyClick(reply?.id)
                                        }
                                        className="ml-2"
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        onClick={() => {
                                          postReply(reply?.snippet?.parentId);
                                          setReplyText("");
                                        }}
                                        className="ml-4"
                                      >
                                        Reply
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div className="videos"></div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default Comments;
