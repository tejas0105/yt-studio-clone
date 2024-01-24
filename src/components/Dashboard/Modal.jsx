/* eslint-disable react/prop-types */
import ReactDom from "react-dom";
import { IoCloseOutline } from "react-icons/io5";
import { RiFeedbackLine } from "react-icons/ri";
import { MdFileUpload } from "react-icons/md";
import { useRef } from "react";

const Modal = ({ isOpen, onClose }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files[0];
    // Process the selected files as needed
    console.log("Selected Files:", selectedFiles);
  };
  if (!isOpen) return null;
  return ReactDom.createPortal(
    <>
      <div
        onClick={onClose}
        className="overlay transition duration-500 ease-in-out fixed top-0 left-0 right-0 bottom-0 z-[1000] bg-modalColor"
      />
      <div className="modal-container transition duration-500 ease-in-out fixed top-2/4 left-2/4 z-[1000] -translate-y-1/2 -translate-x-1/2">
        <div className="modal bg-white h-[33rem] w-[60rem] rounded-md">
          <div className="top-section flex justify-between w-full border-b p-5 fixed top-0">
            <h1 className="font-extrabold text-lg">Upload Videos</h1>
            <button className="mr-5 flex" onClick={onClose}>
              <RiFeedbackLine className="text-2xl mr-5" />
              <IoCloseOutline className="text-2xl font-extrabold" />
            </button>
          </div>
          <section className="modal-content flex justify-center items-center flex-col fixed w-full bottom-0 h-[calc(100%-69px)]">
            <div className="bg-gray-100 h-36 w-36 flex justify-center items-center rounded-full">
              <button>
                <MdFileUpload
                  className="text-6xl opacity-40"
                  onClick={handleFileSelect}
                />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                accept="video/mp4"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
            <h2 className="mt-5 text-sm">Click above to select files</h2>
            <h2 className="mt-2 text-sm opacity-50">
              Your videos will be private until you publish them.
            </h2>
            <button
              className="transition ease-in-out duration-100 mt-6 bg-blue-600 rounded-sm hover:bg-blue-500 active:bg-blue-600 text-white w-32 h-9 text-sm"
              onClick={handleFileSelect}
            >
              SELECT FILES
            </button>
          </section>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
