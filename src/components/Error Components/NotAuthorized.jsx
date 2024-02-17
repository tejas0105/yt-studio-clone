// import Home from "../Home";
import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

const Error = () => {
  const { cookie } = useContext(UserContext);
  const refreshToken = async () => {
    if (cookie) {
      console.log(cookie);
      await fetch("http://localhost:3000/refreshtoken", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh_token: cookie,
        }),
      });
      console.log(document.cookie.split("=")[2]);
    }
    //else {
    //   await fetch("http://localhost:3000/refreshtoken", {
    //     method: "POST",
    //     mode: "cors",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       refresh_token: document.cookie.split("=")[1],
    //     }),
    //   });
    //   console.log(document.cookie.split("=")[1]);
    // }
  };
  return (
    <>
      {/* <Home /> */}
      <div className="flex justify-center items-center flex-col mt-36">
        <p className="text-xl mb-6">Not authorized</p>
        <Link
          to="/"
          // onClick={refreshToken}
          className="bg-blue-600 pt-2 pb-2 pl-3 pr-3 active:bg-blue-700 hover:bg-blue-500 duration-100 ease-in-out rounded-md text-white"
        >
          Login again
        </Link>
      </div>
    </>
  );
};

export default Error;
