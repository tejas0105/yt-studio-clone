/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";

const UploadDiv = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="upload-div rounded-md mt-4 mr-2 ml-8 border border-gray-300 p-3 h-96 w-80">
      <div className="inner-upload-div">
        <p>Want to see metrics on your recent video?</p>
        <p>Upload and publish a video to get started.</p>
        <Link
          className="upload-btn"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          UPLOAD VIDEOS
        </Link>
        <Modal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        />
      </div>
    </div>
  );
};

export default UploadDiv;
