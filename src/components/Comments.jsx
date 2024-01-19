import { useContext, useEffect } from "react";
import CommentContext from "./context/CommentContext";

const Comments = () => {
  const { comments } = useContext(CommentContext);
  // console.log(comments);
  useEffect(() => {
    if (comments && comments.length > 0) console.log(comments);
  }, [comments]);

  return (
    <div className="comments-div overflow-auto h-[calc(100vh-4rem)]">
      <div className="title-div h-auto">
        <h3 className="title text-2xl mt-7 ml-7 font-extrabold">
          Channel comments & mentions
        </h3>
      </div>
      {comments &&
        comments.length > 0 &&
        comments.map((item, index) => {
          return <div key={index} className="border h-12 mt-12"></div>;
        })}
    </div>
  );
};

export default Comments;
