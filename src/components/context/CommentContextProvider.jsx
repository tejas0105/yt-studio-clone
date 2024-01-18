import { useContext, useEffect, useState } from "react";
import CommentContext from "./CommentContext";
import UserContext from "./UserContext";
import { useQuery } from "@tanstack/react-query";

const CommentContextProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const { result, videoList } = useContext(UserContext);
  //   const fetchComments = async () => {
  //     const response = await fetch();
  //   };
  const fetchComments = async (channelId, API_KEY) => {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&allThreadsRelatedToChannelId=${channelId}&key=${API_KEY}`
    );
    return await response.json();
  };

  const { data: commentData } = useQuery({
    queryKey: [
      "comments",
      result?.items?.[0]?.id,
      import.meta.env.VITE_API_KEY,
    ],
    queryFn: () =>
      fetchComments(result?.items?.[0]?.id, import.meta.env.VITE_API_KEY),
    enabled: !!result?.items?.[0]?.id && !!import.meta.env.VITE_API_KEY,
  });

  useEffect(() => {
    if (commentData) {
      setComments(commentData?.items);
    }
  }, [result, commentData]);

  // useEffect(() => {
  //   console.log("Video details ->", videoList);
  // }, [videoList]);

  // useEffect(() => {
  //   if (comments) {
  //     console.log("comments ->", comments);
  //   }
  // }, [comments]);

  return (
    <CommentContext.Provider value={{ comments }}>
      {children}
    </CommentContext.Provider>
  );
};

export default CommentContextProvider;
