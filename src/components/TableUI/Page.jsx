import { useContext, useEffect, useState } from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import UserContext from "../context/UserContext";

export default function Page() {
  const { videoList } = useContext(UserContext);
  const [videoData, setVideoData] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (videoList && videoList.length > 0) {
      videoList.map((item) => {
        return setData([
          {
            id: item?.id,
            video: item?.snippet?.thumbnails?.default?.url,
            restrictions: item?.status?.privacyStatus,
          },
        ]);
      });
    }
  }, [videoList]);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
