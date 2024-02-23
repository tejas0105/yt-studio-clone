import { useState, useEffect } from "react";

import UserContext from "./UserContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// eslint-disable-next-line react/prop-types
const UserContextProvider = ({ children }) => {
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const [result, setResult] = useState([]);
  const [accessToken, setAccessToken] = useState("");
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
    if (cookieValue.split("=")[0] === "access_token") {
      setAccessToken(cookieValue.split("=")[1].split("; ")[0]);
      setRefreshToken(cookieValue.split("=")[2]);
    }
  }, []);

  useEffect(() => {
    const cookieValue = document.cookie;
    // console.log(cookieValue.split("="));
    if (
      cookieValue.split("=")[0] === "refresh_token" &&
      !cookieValue.split("=")[1].split("; ")[0]
    ) {
      setAccessToken("");
      setRefreshToken(cookieValue.split("=")[1]);
    }
    if (cookieValue.split("=")[0] === "refresh_token") {
      setAccessToken(cookieValue.split("=")[2]);
      setRefreshToken(cookieValue.split("=")[1].split("; ")[0]);
    }
  }, []);

  // useEffect(() => {
  //   console.log(accessToken);
  // }, [accessToken]);

  useEffect(() => {
    if (accessToken === undefined) {
      setIsAccessTokenExpired(true);
    } else {
      setIsAccessTokenExpired(false);
    }
  }, [accessToken]);

  useEffect(() => {
    if (isAccessTokenExpired === true) {
      console.log(isAccessTokenExpired);
    }
  }, [isAccessTokenExpired]);

  // const refreshGetNewAcessToken = async () => {
  //   const resp = await fetch("http://localhost:3000/refreshToken", {
  //     headers: {
  //       "Content-type": "application/json",
  //       refresh_token: refreshToken,
  //     },
  //   });
  //   console.log(await resp.json());
  // };

  // useEffect(() => {
  //   refreshGetNewAcessToken();
  // }, []);

  // const { mutateAsync, isError } = useMutation({
  //   mutationKey: ["getNewTokens"],
  //   mutationFn: async () => await refreshGetNewAcessToken(),
  // });

  const fetchChannelData = async () => {
    const response = await fetch(`http://localhost:3000/getchannel`);
    return await response.json();
  };

  const {
    data: channelDetails,
    isLoading: channelLoading,
    isError: channelError,
  } = useQuery({
    queryKey: ["channelDetails"],
    queryFn: async () => {
      return fetchChannelData();
    },
  });

  useEffect(() => {
    if (channelDetails) {
      console.log(channelDetails);
      setResult(channelDetails);
      setPlayList(channelDetails?.data?.playlistID);
    }
  }, [channelDetails]);

  useEffect(() => {
    if (result && playlist) {
      console.log("result->", result);
      console.log("playlist->", playlist);
    }
  }, [playlist, result]);

  const fetchPlaylist = async (playlist) => {
    if (playlist) {
      const playlistResponse = await fetch(`http://localhost:3000/getvideos`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          playlistID: playlist,
        }),
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
    mutationKey: ["fetchvideos", playlist],
    mutationFn: async () => {
      return fetchPlaylist(playlist);
    },
    onSuccess: (data) => {
      setVideoList(data?.data);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  useEffect(() => {
    if (playlist) {
      fetchVideos();
    }
  }, [playlist]);

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
      const newIDs = videoId;
      const getData = async () => {
        const response = await fetch(`http://localhost:3000/getSingleVideo`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            videoIds: newIDs,
          }),
        });
        const data = await response.json();
        setViewCount(data?.data);
      };
      getData();
    }
  }, [videoId]);

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
        accessToken,
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
