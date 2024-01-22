// import Home from "../Home";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      {/* <Home /> */}
      <div className="flex justify-center items-center flex-col mt-36">
        <p className="text-xl mb-6">Not authorized</p>
        <Link
          className="bg-blue-600 pt-2 pb-2 pl-3 pr-3 active:bg-blue-700 hover:bg-blue-500 duration-100 ease-in-out rounded-md text-white"
          to="/"
        >
          Login again
        </Link>
      </div>
    </>
  );
};

export default Error;
