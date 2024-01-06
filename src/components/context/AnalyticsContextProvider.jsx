/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import AnalyticsContext from "./AnalyticsContext";

const AnalyticsContextProvider = ({ children }) => {
  const [cookie, setCookie] = useState("");
  const [views, setViews] = useState([]);

  useEffect(() => {
    if (document.cookie.split("=")[1].split(";")[0]) {
      const cookies = document.cookie.split("=")[1].split(";")[0];
      setCookie(cookies);
    } else {
      setCookie(undefined);
    }
  }, []);

  useEffect(() => {
    try {
      const fetchData = async () => {
        if (cookie) {
          const resp = await fetch(
            "https://youtubeanalytics.googleapis.com/v2/reports?dimensions=day&endDate=2024-01-04&ids=channel%3D%3DMINE&metrics=views&sort=day%2C-views&startDate=2023-12-07&key=AIzaSyDALZrN9aPelGVgnPr1n9bJ1r_oAyGjbQ0",
            {
              headers: {
                Authorization: `Bearer ${cookie}`,
                Accept: "application/json",
              },
            }
          );
          const data = await resp.json();
          setViews(data);
        }
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [cookie]);

  // useEffect(() => {
  //   console.log(views);
  // }, [views]);

  return (
    <AnalyticsContext.Provider value={{ views }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export default AnalyticsContextProvider;
