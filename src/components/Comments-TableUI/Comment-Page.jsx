import { useContext, useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import CommentContext from "../context/CommentContext";
import UserContext from "../context/UserContext";

export default function CommentPage() {
  const { comments } = useContext(CommentContext);
  const { videoList } = useContext(UserContext);
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
        return {
          commentAuthor:
            item?.snippet?.topLevelComment?.snippet?.authorDisplayName,
          comment: item?.snippet?.topLevelComment?.snippet?.textDisplay,
          video: videoThumbnailUrl,
          title: videoTitle,
          ids: videoIds,
          authorImageUrl:
            item?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl,
        };
      });
      setData(newData);
    }
  }, [comments, videoList]);

  return (
    <div className="container mx-auto py-8">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
