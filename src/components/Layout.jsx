/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  const fetchData = async () => {
    const resp = await fetch(
      "https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&mine=true&key=AIzaSyDALZrN9aPelGVgnPr1n9bJ1r_oAyGjbQ0",
      {
        headers: {
          Authorization: `Bearer ${document.cookie}`,
          Accept: "application/json",
        },
      }
    );
    const data = await resp.json();
    console.log(data.items);
    // const resp = await fetch("http://localhost:3000/data", {
    //   credentials: "same-origin",
    // });
    // const data = await resp.json();
    // console.log(data);
  };
  fetchData();
  useEffect(() => {
    const cookies = document.cookie;
    console.log(cookies.split("=")[1]);
  }, []);
  return (
    <div className="layout">
      <div className="navbar-div">
        <Navbar />
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
