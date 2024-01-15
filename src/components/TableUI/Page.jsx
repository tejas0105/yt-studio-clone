import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import UserContext from "../context/UserContext";

import { Pagination, PaginationContent } from "@/components/ui/pagination";

export default function Page() {
  const {
    videoList,
    viewCount,
    // nextPageTokenToSend,
    // prevPageTokenToSend,
    // setNextPageToken,
    // setPrevPageToken,
  } = useContext(UserContext);
  const [data, setData] = useState([]);
  // const [nextPageToken, setNextPageToken] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);
  const [pages, setPages] = useState([]);
  const [pageNumber, setPageNumber] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (videoList && videoList.length > 0) {
      const indexOfLastPage = currentPage * postsPerPage;
      const indexOfFirstPage = indexOfLastPage - postsPerPage;
      const currentVideos = videoList.slice(indexOfFirstPage, indexOfLastPage);
      setPages(currentVideos);
    }
  }, [videoList, currentPage, postsPerPage]);

  useEffect(() => {
    if (videoList && videoList.length > 0) {
      const pageNumberArray = [];
      for (let i = 1; i <= Math.ceil(videoList.length / postsPerPage); i++) {
        pageNumberArray.push(i);
      }
      setPageNumber(pageNumberArray);
    }
  }, [videoList, postsPerPage]);

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
      pages &&
      pages.length > 0 &&
      viewCount?.items &&
      viewCount?.items.length > 0
    ) {
      const newData = pages.map((item) => {
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
  }, [pages, viewCount?.items]);

  // useEffect(() => {
  //   if (data) console.log(data);
  // }, [data]);

  const handleNextPage = () => {
    setCurrentPage((prevState) => {
      if (prevState > postsPerPage) return;
      return prevState + 1;
    });
  };

  const handlePrevPage = () => {
    setCurrentPage((prevState) => {
      if (prevState < 0) return;
      return prevState - 1;
    });
  };

  const changePage = (number) => {
    setCurrentPage(number);
  };

  return (
    <div className="container mx-auto py-8">
      <DataTable columns={columns} data={data} />
      <Pagination>
        <button
          className="pl-3 pr-3 pt-1 pb-1 border mt-4 ml-4 rounded-md hover:bg-neutral-200 ease-in-out transition"
          onClick={handlePrevPage}
        >
          Prev
        </button>
        {pageNumber.map((item, index) => {
          console.log(item);
          return (
            <NavLink
              className="pl-3 pr-3 pt-1 pb-1 border mt-4 ml-4 rounded-md hover:bg-neutral-200 ease-in-out transition"
              key={index}
              onClick={() => {
                changePage(item);
              }}
            >
              {item}
            </NavLink>
          );
        })}
        <PaginationContent>
          <button
            className="pl-3 pr-3 pt-1 pb-1 border mt-4 ml-4 rounded-md hover:bg-neutral-200 ease-in-out transition"
            onClick={handleNextPage}
          >
            Next
          </button>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
