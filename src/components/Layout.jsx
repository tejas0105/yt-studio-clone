import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Error from "./Error Components/Error";

const Layout = () => {
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

  useEffect(() => {
    console.log(result);
  }, [result]);

  if (!cookie) {
    return <Error />;
  }

  return (
    <div className="layout">
      <div className="navbar-div">
        <Navbar data={result} />
      </div>
      <section className="content">
        <div className="sidebar-div">
          <Sidebar data={result} />
        </div>
        <div className="outlet-div">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default Layout;
