import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import UserContext from "../context/UserContext";

import { Pagination, PaginationContent } from "@/components/ui/pagination";
import DeleteConfirmModal from "./DeleteConfirmModal";

export default function Page() {
  const {
    videoList,
    viewCount,
    cookie,
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
  const [deleteModal, setDeleteModal] = useState(false);
  const [vidId, setVidId] = useState("");
  const [videoName, setVideoName] = useState("");

  useEffect(() => {
    if (videoList && videoList.length > 0) {
      const indexOfLastPage = currentPage * postsPerPage;
      // console.log(indexOfLastPage);
      const indexOfFirstPage = indexOfLastPage - postsPerPage;
      // console.log(indexOfFirstPage);
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
          video: item?.snippet?.thumbnails?.high?.url,
          restrictions: item?.status?.privacyStatus,
          videoId: item?.contentDetails?.videoId,
          link: `https://www.youtube.com/watch?v=${item?.contentDetails?.videoId}`,
          title: item?.snippet?.title,
          date: formattedDate,
          cookie: cookie,
          videoTitle: item?.snippet?.title,
          changeDeleteModalState: (id) => {
            setDeleteModal(!deleteModal);
            setVidId(id);
          },
          description: item?.snippet?.description,
          views:
            viewCount?.items.find(
              (v) => v?.id === item?.contentDetails?.videoId
            )?.statistics?.viewCount || 0,
          likes:
            viewCount?.items.find(
              (v) => v?.id === item?.contentDetails?.videoId
            )?.statistics?.likeCount || 0,
          getVideoName: (videoName) => {
            setVideoName(videoName);
          },
        };
      });
      setData(newData);
    }
  }, [pages, viewCount?.items, cookie, deleteModal]);

  // useEffect(() => {
  //   if (pages) console.log("pages->", pages);
  // }, [pages]);

  // useEffect(() => {
  //   if (vidId) {
  //     console.log(vidId);
  //   }
  // }, [vidId]);

  const handleNextPage = () => {
    setCurrentPage((prevState) => {
      if (prevState >= pageNumber.length) return;
      return prevState + 1;
    });
  };

  const handlePrevPage = () => {
    setCurrentPage((prevState) => {
      if (prevState <= 1) return;
      return prevState - 1;
    });
  };

  const changePage = (number) => {
    setCurrentPage(number);
  };

  return (
    <div className="container flex flex-col justify-center items-center mx-auto py-8">
      <DataTable columns={columns} data={data} />
      <div className="pagination fixed bottom-10 2xl:bottom-56 flex justify-center items-center">
        <Pagination>
          {currentPage === 1 ? (
            <button
              disabled
              className="pl-3 pr-3 pt-1 pb-1 border mt-4 ml-4 rounded-md text-gray-300"
            >
              Prev
            </button>
          ) : (
            <button
              className="pl-3 pr-3 pt-1 pb-1 border mt-4 ml-4 rounded-md hover:bg-neutral-200 ease-in-out transition"
              onClick={handlePrevPage}
            >
              Prev
            </button>
          )}
          {pageNumber.map((item, index) => {
            return (
              <Link
                className={`pl-3 pr-3 pt-1 pb-1 border mt-4 ml-4 ${
                  currentPage === item ? "bg-neutral-400" : ""
                } rounded-md hover:bg-neutral-200 ease-in-out transition`}
                key={index}
                onClick={() => {
                  changePage(item);
                }}
              >
                {item}
              </Link>
            );
          })}
          <PaginationContent>
            {currentPage === pageNumber.length ? (
              <button
                disabled
                className="pl-3 pr-3 pt-1 pb-1 border mt-4 ml-4 rounded-md text-gray-300"
                onClick={handleNextPage}
              >
                Next
              </button>
            ) : (
              <button
                className="pl-3 pr-3 pt-1 pb-1 border mt-4 ml-4 rounded-md hover:bg-neutral-200 ease-in-out transition"
                onClick={handleNextPage}
              >
                Next
              </button>
            )}
          </PaginationContent>
        </Pagination>
      </div>
      {deleteModal && (
        <DeleteConfirmModal
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
          vidId={vidId}
          videoName={videoName}
        />
      )}
    </div>
  );
}
