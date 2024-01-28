/* eslint-disable react/prop-types */
import ReactDom from "react-dom";
import { IoCloseOutline } from "react-icons/io5";
import { RiFeedbackLine } from "react-icons/ri";
import { MdFileUpload } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";
import { useEffect, useRef, useState, useContext } from "react";

import { Button } from "@/components/ui/button";

import UserContext from "./../context/UserContext";

const Modal = ({ isOpen, onClose }) => {
  const { cookie } = useContext(UserContext);
  const [file, setFile] = useState();
  const [fileData, setFileData] = useState();
  const [fileSelected, setFileSelected] = useState(false);
  const [success, setSuccess] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const fileInputRef = useRef(null);

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const uploadFile = async () => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("access_token", cookie);
        formData.append("title", title);
        formData.append("description", description);
        const postFile = await fetch("http://localhost:3000/upload", {
          method: "POST",
          body: formData,
        });
        const data = await postFile.json();
        setFileData(data);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files[0];
    setFile(selectedFiles);

    // if (file) uploadFile();
    console.log("Selected Files:", selectedFiles);
  };

  useEffect(() => {
    if (file) {
      setFileSelected(true);
    }
  }, [file]);

  useEffect(() => {
    if (fileData && fileData.status === "success") {
      setSuccess(true);
    }
  }, [fileData]);

  if (!isOpen) return null;
  return ReactDom.createPortal(
    <>
      <div
        onClick={onClose}
        className="overlay transition duration-500 ease-in-out fixed top-0 left-0 right-0 bottom-0 z-[1000] bg-modalColor"
      />
      <div className="modal-container transition duration-500 ease-in-out fixed top-2/4 left-2/4 z-[1000] -translate-y-1/2 -translate-x-1/2">
        <div className="modal bg-white h-[33rem] w-[60rem] rounded-md">
          {success ? (
            <div>
              <div className="fixed w-full p-6 flex justify-end items-end top-0">
                <IoCloseOutline
                  className="text-2xl mr-3 cursor-pointer"
                  onClick={() => {
                    onClose();
                  }}
                />
              </div>
              <div className="success w-full flex flex-col fixed bottom-0 h-[calc(100%-40px)] justify-center items-center">
                <div className="h-36 w-36 flex justify-center items-center rounded-full bg-green-400">
                  <MdOutlineDone className="text-6xl" />
                </div>
                <h2 className="mt-5 text-base">
                  Video Successfully Uploaded to Youtube
                </h2>
              </div>
            </div>
          ) : (
            <div>
              <div className="top-section flex justify-between w-full border-b p-5 fixed top-0">
                <h1 className="font-extrabold text-lg">Upload Videos</h1>
                <button className="mr-5 flex" onClick={onClose}>
                  <RiFeedbackLine className="text-2xl mr-5" />
                  <IoCloseOutline className="text-2xl font-extrabold" />
                </button>
              </div>

              {fileSelected ? (
                <div className="upload flex fixed w-full bottom-0 h-[calc(100%-69px)]">
                  <section className="border-r w-2/4 h-full flex justify-center items-center">
                    <div className=" flex flex-col">
                      <h3>Selected File</h3>
                      {file && <h4 className="opacity-60">{file?.name}</h4>}
                    </div>
                  </section>
                  <section className="flex flex-col w-2/4 titleDescript ">
                    <div className="title h-1/3 flex flex-col p-9">
                      <label className="text-lg" htmlFor="title">
                        Title
                      </label>
                      <input
                        value={title}
                        type="text"
                        className="title border w-96 h-10 mt-1 text-sm p-1 rounded"
                        placeholder="Title"
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                      />
                    </div>
                    <div className="description h-72 p-9 flex flex-col">
                      <label className=" text-black text-lg" htmlFor="title">
                        Description
                      </label>
                      <textarea
                        value={description}
                        className="border mt-1 text-sm w-96 h-28 p-1 rounded resize-none"
                        placeholder="Description"
                        name="description"
                        cols="2"
                        rows="2"
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      ></textarea>
                      {/* <input
                    type="text"
                    className="title border w-96 text-sm h-16 mt-2 align-text-top"
                    placeholder="please mention description"
                  /> */}
                    </div>
                    <div className="cancel-upload-btn flex h-full justify-center items-center">
                      <div
                        className="cancel-btn mr-4"
                        onClick={() => {
                          setFile(null);
                          setFileSelected(false);
                        }}
                      >
                        <Button variant="destructive">Cancel</Button>
                      </div>
                      <div
                        className=""
                        onClick={() => {
                          uploadFile();
                          setFile(null);
                        }}
                      >
                        <Button>Upload</Button>
                      </div>
                    </div>
                  </section>
                </div>
              ) : (
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
                      onChange={(e) => {
                        handleFileChange(e);
                      }}
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
              )}
            </div>
          )}
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
