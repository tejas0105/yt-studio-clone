import { useState, useEffect } from "react";

import UserContext from "./UserContext";

// eslint-disable-next-line react/prop-types
const UserContextProvider = ({ children }) => {
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const [result, setResult] = useState([]);
  const [cookie, setCookie] = useState("");
  const [playlist, setPlayList] = useState("");
  const [videoList, setVideoList] = useState();
  const [videoId, setVideoId] = useState([]);
  const [viewCount, setViewCount] = useState([]);
  // const [nextPageToken, setNextPageToken] = useState("");
  // const [nextPageTokenToSend, setNextPageTokenToSend] = useState();
  // const [prevPageTokenToSend, setPrevPageTokenToSend] = useState();
  // const [prevPageToken, setPrevPageToken] = useState(null);

  useEffect(() => {
    console.log(toggleSidebar);
  }, [toggleSidebar]);

  useEffect(() => {
    const cookieValue = document.cookie;

    if (cookieValue) {
      const splitCookie = cookieValue.split("=");

      const cookies = splitCookie[1].split(";")[0];

      setCookie(cookies);
    } else {
      setCookie(undefined);
    }
  }, []);

  useEffect(() => {
    try {
      const fetchData = async () => {
        if (cookie) {
          const response = await fetch(
            `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics%2Cstatus&mine=true&key=${
              import.meta.env.VITE_API_KEY
            }`,
            {
              headers: {
                Authorization: `Bearer ${cookie}`,
                Accept: "application/json",
              },
            }
          );
          const data = await response.json();
          setResult(data);
          setPlayList(
            data?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads
          );
        }
      };

      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [cookie]);

  // useEffect(() => {
  //   console.log(result);
  // }, [result]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      if (result && cookie && playlist) {
        const playlistResponse = await fetch(
          `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails%2Cid%2Cstatus&maxResults=25&playlistId=${playlist}&key=${
            import.meta.env.VITE_API_KEY
          }`,
          {
            headers: {
              Authorization: `Bearer ${cookie}`,
              Accept: "application/json",
            },
          }
        );
        const playlistData = await playlistResponse.json();

        setVideoList(playlistData?.items);
        // setNextPageTokenToSend(playlistData?.nextPageToken);
      }
    };

    fetchPlaylist();
  }, [playlist, cookie, result]);

  useEffect(() => {
    if (videoList && videoList.length > 0) {
      setVideoId(
        videoList &&
          videoList.length > 0 &&
          videoList.map((item) => {
            return item?.contentDetails?.videoId;
          })
      );
    }
  }, [videoList]);

  // useEffect(() => {
  //   console.log(videoList);
  // }, [videoList]);

  useEffect(() => {
    if (videoId && videoId.length > 0) {
      const newIDs = videoId.join("%2C");
      const getData = async () => {
        const response = await fetch(
          `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${newIDs}&key=${
            import.meta.env.VITE_API_KEY
          }`,
          {
            headers: {
              Authorization: `Bearer ${cookie}`,
              Accept: "application/json",
            },
          }
        );
        const data = await response.json();
        setViewCount(data);
      };
      getData();
    }
  }, [cookie, videoId]);

  // useEffect(() => {
  //   const fetchDataNext = async () => {
  //     if (result && cookie && playlist) {
  //       const playlistResponse = await fetch(
  //         `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails%2Cid%2Cstatus&maxResults=4&pageToken=${nextPageToken}&playlistId=${playlist}&key=${
  //           import.meta.env.VITE_API_KEY
  //         }`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${cookie}`,
  //             Accept: "application/json",
  //           },
  //         }
  //       );
  //       const playlistData = await playlistResponse.json();
  //       setVideoList(playlistData?.items);
  //       setNextPageTokenToSend(playlistData?.nextPageToken);
  //       setPrevPageTokenToSend(playlistData?.prevPageToken);
  //     }
  //   };

  //   fetchDataNext();
  // }, [result, cookie, playlist, nextPageToken]);

  // useEffect(() => {
  //   const fetchPrevData = async () => {
  //     if (nextPageToken && prevPageToken && result && cookie && playlist) {
  //       const playlistResponse = await fetch(
  //         `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails%2Cid%2Cstatus&maxResults=4&pageToken=${prevPageToken}&playlistId=${playlist}&key=${
  //           import.meta.env.VITE_API_KEY
  //         }`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${cookie}`,
  //             Accept: "application/json",
  //           },
  //         }
  //       );
  //       const playlistData = await playlistResponse.json();

  //       setVideoList(playlistData?.items);
  //       setNextPageTokenToSend(playlistData?.nextPageToken);
  //       setPrevPageTokenToSend(playlistData?.prevPageToken);
  //     }
  //   };

  //   fetchPrevData();
  // }, [result, cookie, playlist, prevPageToken, nextPageToken]);

  return (
    <UserContext.Provider
      value={{
        result,
        cookie,
        videoList,
        viewCount,
        toggleSidebar,
        setToggleSidebar,
        // setNextPageToken,
        // setPrevPageToken,
        // nextPageTokenToSend,
        // prevPageTokenToSend,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
