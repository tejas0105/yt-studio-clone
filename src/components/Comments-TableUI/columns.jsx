// import { ColumnDef } from "@tanstack/react-table";

export let Payment = {
  id: String,
  comments: String,
  Videos: String,
};
// const [isEditing, setIsEditing] = useState(false);
export const columns = [
  {
    accessorKey: "comments",
    header: "Comments",
    cell: ({ row }) => {
      let comment = row?.original?.comment;
      let commentAuthor = row?.original?.commentAuthor;
      // let id = row?.index;
      return (
        <div key={row?.index} className="comments flex">
          <div className="img-div mr-2 mt-2">
            <img
              className="w-10 h-10 rounded-full"
              src={row?.original?.authorImageUrl}
            />
          </div>
          <div className="comments-text-div flex flex-col">
            <p className="user text-xs mb-1 text-gray-400">{commentAuthor}</p>
            <p className="comment mb-2 text-base">{comment}</p>
            <div className="comment-action-button">
              {row?.original?.replies && row?.original?.replies.length > 0 && (
                <p>{row?.original?.replies.length || 0} replies</p>
              )}
              {/* <button
                onClick={() =>
                  row?.original?.setIsEditing(row?.original?.commentId)
                }
                className="hover:text-blue-500"
              >
                REPLY
              </button>
              {row?.original?.editState && (
                <input className="border-2 ml-2" type="text" />
              )} */}
              {row?.original?.replies &&
                row?.original?.replies?.map((reply, index) => {
                  return (
                    <div className="flex items-center mt-1" key={index}>
                      <div className="img-div ">
                        <img src={reply?.img} alt="" className="rounded-full" />
                      </div>
                      <div className="ml-2  name-reply-div flex flex-col">
                        <div className="name-div">
                          <p className="name mb-1 text-xs font-extrabold">
                            {reply?.name}
                          </p>
                        </div>
                        <div className="reply-div">
                          <p className="reply">{reply?.text}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "video",
    header: "Videos",
    cell: ({ row }) => {
      console.log(row);
      let url = row?.original?.video;
      return (
        <div className="flex items-center h-16 ">
          <div className="img-div">
            <img src={url} />
          </div>
          <div className="ml-4 line-clamp-3 text-ellipsis w-96 h-full">
            <a
              href={`https://www.youtube.com/watch?v=${row?.original?.ids}`}
              target="_blank"
              rel="noreferrer"
              className="hover:underline text-xs"
            >
              {row?.original?.title}
            </a>
          </div>
        </div>
      );
    },
  },
];
