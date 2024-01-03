/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [cookie, setCookie] = useState("");
  const [result, setResult] = useState([]);
  const fetchData = async () => {
    const resp = await fetch(
      "https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&mine=true&key=AIzaSyDALZrN9aPelGVgnPr1n9bJ1r_oAyGjbQ0",
      {
        headers: {
          Authorization: `Bearer ${cookie}`,
          Accept: "application/json",
        },
      }
    );
    const data = await resp.json();
    console.log(data.items);
    setResult(data.items);
    //   credentials: "same-origin",
    // const resp = await fetch("http://localhost:3000/data", {
    // });
    // const data = await resp.json();
    // console.log(data);
  };
  useEffect(() => {
    const cookies = document.cookie;
    fetchData();
    setCookie(cookies.split("=")[1]);
  }, []);
  return (
    <div className="layout">
      <div className="navbar-div">
        <Navbar data={result} />
      </div>
      <section className="content">
        <div className="sidebar-div">
          <Sidebar />
        </div>
        <div className="outlet-div">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default Layout;
