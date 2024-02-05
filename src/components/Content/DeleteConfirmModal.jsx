import ReactDom from "react-dom";
import { Button } from "@/components/ui/button";
import { useContext } from "react";

import UserContext from "./../context/UserContext";

const DeleteConfirmModal = ({ setDeleteModal, vidId, videoName }) => {
  const { cookie, setIsDeleted } = useContext(UserContext);

  const deleteVideo = async (videoId) => {
    const resp = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?id=${videoId}&key=${
        import.meta.env.VITE_API_KEY
      }`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${cookie}`,
          Accept: "application/json",
        },
      }
    );
    console.log(resp);
    if (resp.status === 204) {
      setTimeout(() => {
        setIsDeleted(true);
      }, 4500);
    }
  };

  return ReactDom.createPortal(
    <>
      <div
        onClick={() => {
          setDeleteModal(false);
        }}
        className="overlay transition duration-500 ease-in-out fixed top-0 left-0 right-0 bottom-0 z-[1000] bg-modalColor"
      />
      <div className="modal-container transition duration-500 ease-in-out fixed top-2/4 left-2/4 z-[1000] -translate-y-1/2 -translate-x-1/2">
        <div className="modal bg-white h-40 w-[50rem] rounded-md flex flex-col justify-center items-center">
          <div className="text-left w-full ml-14 fixed top-6">
            <p className="text-lg">
              Are you sure you want to delete {`${videoName}`} ?
            </p>
          </div>
          <div className="button-div flex fixed bottom-6 right-9">
            <div
              className="delete-button"
              onClick={() => {
                console.log(vidId);
                deleteVideo(vidId);
              }}
            >
              <Button variant="destructive">Delete</Button>
            </div>
            <div
              className="cancel-button ml-4"
              onClick={() => {
                setDeleteModal(false);
              }}
            >
              <Button variant="outline">Cancel</Button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default DeleteConfirmModal;
