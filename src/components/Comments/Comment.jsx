import { useContext, useEffect, useState } from "react";
import CommentContext from "../context/CommentContext";
import UserContext from "../context/UserContext";

import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import Reply from "./Reply";

const Comment = () => {
  const { comments, fetchComments } = useContext(CommentContext);
  const { videoList, cookie } = useContext(UserContext);

  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [repliesToggle, setRepliesToggle] = useState(null);
  const [replyText, setReplyText] = useState("");
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

  // useEffect(() => {
  //   if (comments && comments.length > 0 && videoList && videoList.length > 0)
  //     console.log(comments);
  // }, [comments, videoList]);

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
    console.log(parentId);
  };

  const { data: singleComment } = useQuery({
    queryKey: ["singleCommentData", comments],
    queryFn: async () => {
      if (comments && comments.length > 0) {
        const data = [];
        for (const comment of comments) {
          const commentData = await fetchComments(comment?.id);
          data.push(commentData);
        }
        return data;
      }
      return [];
    },
  });

  useEffect(() => {
    if (singleComment && singleComment.length > 0)
      setCommentsData(singleComment);
  }, [singleComment]);

  // useEffect(() => {
  //   if (commentsData && commentsData.length > 0) {
  //     console.log(commentsData);
  //   }
  // }, [commentsData]);
  return (
    <>
      {comments &&
        comments.length > 0 &&
        videoList &&
        videoList.length > 0 &&
        comments.map((item, index) => {
          const videoId = item?.snippet?.topLevelComment?.snippet?.videoId;
          const matchedVideo = videoList.find(
            (v) => v?.contentDetails?.videoId === videoId
          );
          // console.log(matchedVideo);
          if (videoId === matchedVideo?.contentDetails?.videoId) {
            return (
              <div
                key={item?.id}
                className="h-auto border-t flex items-center justify-between"
              >
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
                      commentsData?.[index]?.items.map((reply, index) => {
                        // console.log(reply?.snippet?.parentId);
                        return (
                          <Reply
                            key={index}
                            reply={reply}
                            handleReplyClick={handleReplyClick}
                            editingCommentIndex={editingCommentIndex}
                            replyText={replyText}
                            handleReplyTextChange={handleReplyTextChange}
                            postReply={postReply}
                            setReplyText={setReplyText}
                          />
                        );
                      })}
                  </div>
                </div>
                <div className="videos flex w-96 items-start">
                  <div className="image-div">
                    <img
                      src={matchedVideo?.snippet?.thumbnails?.default?.url}
                      alt=""
                    />
                  </div>
                  <div className="title-div ml-3">
                    <a
                      href={`https://youtu.be/${matchedVideo?.contentDetails?.videoId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="title text-sm hover:underline"
                    >
                      {matchedVideo?.snippet?.title}
                    </a>
                  </div>
                </div>
              </div>
            );
          }
        })}
    </>
  );
};

export default Comment;
