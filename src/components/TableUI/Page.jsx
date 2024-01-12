import { useContext, useEffect, useState } from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import UserContext from "../context/UserContext";

export default function Page() {
  const { videoList, viewCount } = useContext(UserContext);
  // const [videoData, setVideoData] = useState([]);
  const [data, setData] = useState([]);
  const [views, setViews] = useState([]);

  useEffect(() => {
    if (viewCount && viewCount.length > 0) {
      console.log(viewCount);
    }
  }, [viewCount]);

  useEffect(() => {
    if (videoList && videoList.length > 0) {
      // Map through videoList to create an array of data objects
      const newData = videoList.map((item) => ({
        id: item?.id,
        video: item?.snippet?.thumbnails?.default?.url,
        restrictions: item?.status?.privacyStatus,
      }));

      // Set the state with the accumulated data array
      setData(newData);
    }
  }, [videoList]);

  // useEffect(() => {
  //   data.map((item) => {
  //     console.log(item);
  //   });
  // }, [data]);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
