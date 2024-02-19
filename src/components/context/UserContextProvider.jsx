import { useState, useEffect } from "react";

import UserContext from "./UserContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// eslint-disable-next-line react/prop-types
const UserContextProvider = ({ children }) => {
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const [result, setResult] = useState([]);
  const [cookie, setCookie] = useState("");
  const [playlist, setPlayList] = useState("");
  const [videoList, setVideoList] = useState();
  const [videoId, setVideoId] = useState([]);
  const [viewCount, setViewCount] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isAccessTokenExpired, setIsAccessTokenExpired] = useState(false);
  const [refreshToken, setRefreshToken] = useState("");
  const [isRefreshTokenExpired, setIsRefreshTokenExpired] = useState(false);
  // const [nextPageToken, setNextPageToken] = useState("");
  // const [nextPageTokenToSend, setNextPageTokenToSend] = useState();
  // const [prevPageTokenToSend, setPrevPageTokenToSend] = useState();
  // const [prevPageToken, setPrevPageToken] = useState(null);

  useEffect(() => {
    const cookieValue = document.cookie;
    if (cookieValue) {
      const splitCookie = cookieValue.split("=");
      // console.log(splitCookie);
      if (splitCookie[0] === "access_token") {
        const access_token = splitCookie[1].split(";")[0];
        setCookie(access_token);
      }
    } else {
      setCookie(undefined);
    }
  }, []);

  useEffect(() => {
    const cookieValue = document.cookie;
    if (cookieValue) {
      const splitCookie = cookieValue.split("=");
      // console.log(splitCookie[2]);
      // console.log(splitCookie[1].split(";")[1]);
      if (splitCookie[1].split(";")[1] === " refresh_token") {
        const refresh_token = splitCookie[2];
        // console.log(refresh_token);
        setRefreshToken(refresh_token);
      }
    }
  }, []);

  // useEffect(() => {
  //   if (refreshToken) console.log(refreshToken);
  // }, [refreshToken]);

  useEffect(() => {
    if (cookie) {
      console.log();
      setIsAccessTokenExpired(false);
    } else {
      setIsAccessTokenExpired(true);
    }
  }, [cookie]);

  const fetchNewTokens = async () => {
    const resp = await fetch("http://localhost:3000/refresh_token", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
    });
    return resp.json();
  };

  const { mutateAsync, isError } = useMutation({
    mutationKey: "fetchNewTokens",
    mutationFn: async () => {
      return fetchNewTokens();
    },
  });

  useEffect(() => {
    if (isAccessTokenExpired) {
      mutateAsync();
    }
  }, [isAccessTokenExpired]);

  const fetchChannelData = async (cookie) => {
    if (cookie) {
      const response = await fetch(`http://localhost:3000/getchannel`, {
        headers: {
          Authorization: `Bearer ${cookie}`,
          Accept: "application/json",
        },
      });
      return response.json();
    }
  };

  const {
    data: channelDetails,
    isLoading: channelLoading,
    isError: channelError,
  } = useQuery({
    queryKey: ["channelDetails", cookie],
    queryFn: async () => {
      return fetchChannelData(cookie);
    },
  });

  useEffect(() => {
    if (channelDetails) {
      setResult(channelDetails);
      setPlayList(channelDetails?.data?.playlistID);
    }
  }, [channelDetails]);

  // useEffect(() => {
  //   console.log(result);
  // }, [result]);

  const fetchPlaylist = async (cookie, playlist) => {
    if (cookie && playlist) {
      const playlistResponse = await fetch(`http://localhost:3000/getvideos`, {
        method: "POST",
        body: JSON.stringify({
          playlistID: playlist,
        }),
        headers: {
          Authorization: `Bearer ${cookie}`,
          "Content-type": "application/json",
        },
      });
      return playlistResponse.json();
      // setNextPageTokenToSend(playlistData?.nextPageToken);
    }
  };

  const {
    mutateAsync: fetchVideos,
    isLoading: videoLoading,
    isError: videoError,
  } = useMutation({
    mutationKey: ["fetchvideos", cookie, playlist],
    mutationFn: async () => {
      return fetchPlaylist(cookie, playlist);
    },
    onSuccess: (data) => {
      setVideoList(data?.data);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  useEffect(() => {
    if (cookie && playlist) {
      fetchVideos();
    }
  }, [cookie, playlist]);

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
  //   if (videoId) {
  //     console.log(videoId);
  //   }
  // }, [videoId]);

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
        setIsDeleted,
        channelLoading,
        channelError,
        videoLoading,
        videoError,
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
