import { useContext, useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import UserContext from "../context/UserContext";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Page() {
  const { videoList, viewCount, nextPageToken } = useContext(UserContext);
  const [data, setData] = useState([]);
  // const [nextPageToken, setNextPageToken] = useState("");

  function convertDateFormat(intputDate) {
    const parts = intputDate.split("-");
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const day = parseInt(parts[2]);

    const dateObject = new Date(year, month, day);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthName = monthNames[dateObject.getMonth()];
    const dayOfMonth = dateObject.getDate();
    const yearValue = dateObject.getFullYear();

    const formattedDate = `${monthName}, ${dayOfMonth} ${yearValue}`;
    return formattedDate;
  }

  useEffect(() => {
    if (
      videoList &&
      videoList.length > 0 &&
      viewCount?.items &&
      viewCount?.items.length > 0
    ) {
      const newData = videoList.map((item) => {
        const inputDate =
          item?.snippet?.publishedAt &&
          item?.snippet?.publishedAt.split("T")[0];

        const formattedDate = inputDate && convertDateFormat(inputDate);

        return {
          id: item?.id,
          video: item?.snippet?.thumbnails?.default?.url,
          restrictions: item?.status?.privacyStatus,
          link: `https://www.youtube.com/watch?v=${item?.contentDetails?.videoId}`,
          title: item?.snippet?.title,
          date: formattedDate,
          description: item?.snippet?.description,
          views:
            viewCount?.items.find(
              (v) => v?.id === item?.contentDetails?.videoId
            )?.statistics?.viewCount || 0,
          likes:
            viewCount?.items.find(
              (v) => v?.id === item?.contentDetails?.videoId
            )?.statistics?.likeCount || 0,
        };
      });
      setData(newData);
    }
  }, [videoList, viewCount?.items]);

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  return (
    <div className="container mx-auto py-8">
      <DataTable columns={columns} data={data} />
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
