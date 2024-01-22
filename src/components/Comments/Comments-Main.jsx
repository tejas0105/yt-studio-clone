import Comment from "./Comment";

const Comments = () => {
  return (
    <div className="comments-div overflow-auto h-[calc(100vh-4rem)]">
      <div className="title-div flex justify-between border-b shadow-md items-center sticky h-16 top-0 z-10">
        <h3 className="title text-2xl ml-7 font-extrabold">
          Channel comments & mentions
        </h3>
      </div>
      <div className="content h-[calc(100vh-8rem)] overflow-y-scroll">
        <Comment />
      </div>
    </div>
  );
};

export default Comments;
