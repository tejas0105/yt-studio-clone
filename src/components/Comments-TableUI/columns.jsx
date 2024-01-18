// import { ColumnDef } from "@tanstack/react-table";

export let Payment = {
  id: String,
  comments: String,
  Videos: String,
};

export const columns = [
  {
    accessorKey: "comments",
    header: "Comments",
    cell: ({ row }) => {
      let comment = row?.original?.comment;
      let commentAuthor = row?.original?.commentAuthor;
      return (
        <div className="comments flex">
          <div className="img-div mr-2 mt-2">
            <img
              className="w-10 h-10 rounded-full"
              src={row?.original?.authorImageUrl}
            />
          </div>
          <div className="comments-text-div flex flex-col">
            <p className="user text-xs mb-1 text-gray-400">{commentAuthor}</p>
            <p className="comment mb-1">{comment}</p>
            <div className="comment-action-button">
              <button className="hover:text-blue-500">REPLY</button>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "videos",
    header: "Videos",
    cell: ({ row }) => {
      // console.log(row);
      let url = row?.original?.video;
      return (
        <div className="flex items-center h-16 ml-7">
          <div className="img-div">
            <img src={url} />
          </div>
          <div className="ml-4 line-clamp-3 text-ellipsis w-96 h-full">
            <a
              href={`https://www.youtube.com/watch?v=${row?.original?.ids}`}
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              {row?.original?.title}
            </a>
          </div>
        </div>
      );
    },
  },
];
