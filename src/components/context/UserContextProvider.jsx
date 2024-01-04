import { useState, useEffect } from "react";

import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [result, setResult] = useState([]);
  const [cookie, setCookie] = useState("");

  useEffect(() => {
    const cookies = document.cookie.split("=")[1];
    setCookie(cookies);
  }, []);

  useEffect(() => {
    try {
      const fetchData = async () => {
        if (cookie) {
          const response = await fetch(
            `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&mine=true&key=AIzaSyDALZrN9aPelGVgnPr1n9bJ1r_oAyGjbQ0`,
            {
              headers: {
                Authorization: `Bearer ${cookie}`,
                Accept: "application/json",
              },
            }
          );
          const data = await response.json();
          setResult(data);
        }
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [cookie]);

  //   useEffect(() => {
  //     console.log(result);
  //   }, [result]);

  return (
    <UserContext.Provider value={{ result, cookie }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
