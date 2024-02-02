import ReactDom from "react-dom";

import { Button } from "@/components/ui/button";

const DeleteConfirmModal = ({ deleteModal, setDeleteModal }) => {
  return ReactDom.createPortal(
    <>
      <div
        onClick={deleteModal}
        className="overlay transition duration-500 ease-in-out fixed top-0 left-0 right-0 bottom-0 z-[1000] bg-modalColor"
      />
      <div className="modal-container transition duration-500 ease-in-out fixed top-2/4 left-2/4 z-[1000] -translate-y-1/2 -translate-x-1/2">
        <div className="modal bg-white h-40 w-[50rem] rounded-md flex flex-col justify-center items-center">
          <div className="text-left w-full ml-14 fixed top-6">
            <p className="text-lg">
              Are you sure you want to delete this video ?
            </p>
          </div>
          <div className="button-div flex fixed bottom-6 right-9">
            <div
              className="cancel-button mr-4"
              onClick={() => {
                setDeleteModal(false);
              }}
            >
              <Button variant="outline">Cancel</Button>
            </div>
            <div className="delete-button">
              <Button variant="destructive">Delete</Button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default DeleteConfirmModal;
