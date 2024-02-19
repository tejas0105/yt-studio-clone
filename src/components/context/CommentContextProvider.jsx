import { useContext, useEffect, useState } from "react";
import CommentContext from "./CommentContext";
import UserContext from "./UserContext";
import { useMutation, useQuery } from "@tanstack/react-query";

const CommentContextProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [channelId, setChannelId] = useState("");
  // const [commentsData, setCommentsData] = useState([]);
  const { cookie, result, videoList } = useContext(UserContext);
  //   const fetchComments = async () => {
  //     const response = await fetch();
  //   };
  useEffect(() => {
    if (result?.data?.channelId) {
      setChannelId(result?.data?.channelId);
    }
  }, [result?.data?.channelId]);
  const fetchCommentThreads = async (channelId, cookie) => {
    if (cookie) {
      const response = await fetch(
        `http://localhost:3000/fetchCommentThreads`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${cookie}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            channelId: channelId,
          }),
        }
      );
      return response.json();
    }
  };

  // const { data: comment } = useQuery({
  //   queryKey: [
  //     "comments",
  //     result?.items?.[0]?.id,
  //     import.meta.env.VITE_API_KEY,
  //   ],
  //   queryFn: () =>
  //     fetchCommentThreads(result?.items?.[0]?.id, import.meta.env.VITE_API_KEY),
  //   enabled: !!result?.items?.[0]?.id && !!import.meta.env.VITE_API_KEY,
  // });

  const { mutateAsync } = useMutation({
    mutationKey: ["fetchcomments", cookie, channelId],
    mutationFn: () => {
      return fetchCommentThreads(channelId, cookie);
    },
    onSuccess: (data) => {
      setComments(data?.data);
    },
  });

  useEffect(() => {
    if (channelId && cookie) {
      mutateAsync();
    }
  }, [channelId, cookie]);

  // useEffect(() => {
  //   if (comment) {
  //     setComments(comment?.items);
  //   }
  // }, [result, comment]);

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
