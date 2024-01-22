import { useContext, useEffect, useState } from "react";
import CommentContext from "./CommentContext";
import UserContext from "./UserContext";
import { useQuery } from "@tanstack/react-query";

const CommentContextProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  // const [commentsData, setCommentsData] = useState([]);
  const { result, videoList } = useContext(UserContext);
  //   const fetchComments = async () => {
  //     const response = await fetch();
  //   };
  const fetchCommentThreads = async (channelId, API_KEY) => {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&allThreadsRelatedToChannelId=${channelId}&key=${API_KEY}`
    );
    return await response.json();
  };

  const { data: comment } = useQuery({
    queryKey: [
      "comments",
      result?.items?.[0]?.id,
      import.meta.env.VITE_API_KEY,
    ],
    queryFn: () =>
      fetchCommentThreads(result?.items?.[0]?.id, import.meta.env.VITE_API_KEY),
    enabled: !!result?.items?.[0]?.id && !!import.meta.env.VITE_API_KEY,
  });

  useEffect(() => {
    if (comment) {
      setComments(comment?.items);
    }
  }, [result, comment]);

  // useEffect(() => {
  //   console.log("Video details ->", videoList);
  // }, [videoList]);

  // useEffect(() => {
  //   if (comments) {
  //     console.log("comments ->", comments);
  //   }
  // }, [comments]);
  const fetchComments = async (parentId) => {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/comments?part=snippet&parentId=${parentId}&key=${
        import.meta.env.VITE_API_KEY
      }`
    );
    const data = await response.json();
    return data;
  };

  return (
    <CommentContext.Provider value={{ comments, fetchComments }}>
      {children}
    </CommentContext.Provider>
  );
};

export default CommentContextProvider;
