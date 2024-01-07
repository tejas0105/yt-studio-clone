import { useState, useEffect } from "react";

import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [result, setResult] = useState([]);
  const [cookie, setCookie] = useState("");
  const [playlist, setPlayList] = useState("");
  const [videoList, setVideoList] = useState();

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
            `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&mine=true&key=${
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

  useEffect(() => {
    const fetchPlaylist = async () => {
      if (result && cookie && playlist) {
        const response2 = await fetch(
          `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=${playlist}&key=AIzaSyDALZrN9aPelGVgnPr1n9bJ1r_oAyGjbQ0`,
          {
            headers: {
              Authorization: `Bearer ${cookie}`,
              Accept: "application/json",
            },
          }
        );
        const data2 = await response2.json();
        setVideoList(data2?.items);
      }
    };

    fetchPlaylist();
  }, [playlist, cookie, result]);

  // useEffect(() => {
  //   if (videoList) console.log(videoList);
  // }, [videoList]);

  return (
    <UserContext.Provider value={{ result, cookie, videoList }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
