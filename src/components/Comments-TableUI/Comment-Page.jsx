import { useContext, useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import CommentContext from "../context/CommentContext";
import UserContext from "../context/UserContext";

export default function CommentPage() {
  const { comments } = useContext(CommentContext);
  const { videoList } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (comments && comments.length > 0 && videoList && videoList.length > 0) {
      const newData = comments.map((item) => {
        const videoId = item?.snippet?.topLevelComment?.snippet?.videoId;
        const matchedVideo = videoList.find(
          (v) => v?.contentDetails?.videoId === videoId
        );
        const videoThumbnailUrl =
          matchedVideo?.snippet?.thumbnails?.default?.url;
        const videoTitle = matchedVideo?.snippet?.title;
        const videoIds = matchedVideo?.contentDetails?.videoId;
        const commentId = item?.id;

        // console.log(commentId);
        const toggleIsEditing = (id) => {
          if (id === commentId) setIsEditing(!isEditing);
        };

        return {
          commentAuthor:
            item?.snippet?.topLevelComment?.snippet?.authorDisplayName,
          comment: item?.snippet?.topLevelComment?.snippet?.textDisplay,
          video: videoThumbnailUrl,
          title: videoTitle,
          ids: videoIds,
          authorImageUrl:
            item?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl,
          editState: isEditing,
          commentId: commentId,
          setIsEditing: toggleIsEditing,
          replies: item?.replies?.comments?.map((reply) => {
            return {
              text: reply?.snippet?.textOriginal,
              img: reply?.snippet?.authorProfileImageUrl,
              name: reply?.snippet?.authorDisplayName,
            };
          }),
          // replyAuthorImg: item?.replies?.comments?.map(
          //   (author) => author?.snippet?.authorProfileImageUrl
          // ),
          // replyAuthorNames: item?.replies?.comments?.map(
          //   (author) => author?.snippet?.authorDisplayName
          // ),
        };
      });
      console.log(comments);
      setData(newData);
    }
    // console.log(comments);
  }, [comments, videoList, isEditing]);

  return (
    <div className="container mx-auto py-8">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
