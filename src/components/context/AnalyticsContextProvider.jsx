/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import AnalyticsContext from "./AnalyticsContext";
import UserContext from "./UserContext";

const AnalyticsContextProvider = ({ children }) => {
  const { accessToken } = useContext(UserContext);
  const [views, setViews] = useState([]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        if (accessToken) {
          let currentDate = new Date();
          let endDate = `${currentDate.getFullYear()}-${(
            currentDate.getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}-${currentDate
            .getDate()
            .toString()
            .padStart(2, "0")}`;

          let newDate = new Date(
            currentDate.setDate(currentDate.getDate() - 28)
          );
          let startDate = `${newDate.getFullYear()}-${(newDate.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${newDate
            .getDate()
            .toString()
            .padStart(2, "0")}`;

          const resp = await fetch(
            `https://youtubeanalytics.googleapis.com/v2/reports?dimensions=day&endDate=${endDate}&ids=channel%3D%3DMINE&metrics=views&sort=day%2C-views&startDate=${startDate}&key=${
              import.meta.env.VITE_API_KEY
            }`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
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
  }, [accessToken]);

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
