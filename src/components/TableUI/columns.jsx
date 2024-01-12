// import { ColumnDef } from "@tanstack/react-table";

export let Payment = {
  id: String,
  video: String,
  restrictions: String,
  views: Number,
};

export const columns = [
  {
    accessorKey: "videos",
    header: "Videos",
    cell: ({ row }) => {
      let url = row?.original?.video;
      return (
        <div className="flex items-center">
          <div className="img-div">
            <img src={url} />
          </div>
          <div className="title-descript flex justify-center items-center flex-col">
            <a
              href={row?.original?.link}
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              {row?.original?.title}
            </a>
            <p className="opacity-50">
              {row?.original?.description
                ? `${row?.original?.description}`
                : "No description"}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "restrictions",
    header: "Restrictions",
    cell: ({ row }) => {
      let restriction = row?.original?.restrictions;
      return <p className="capitalize">{restriction}</p>;
    },
  },
  {
    accessorKey: "views",
    header: "Views",
  },
  {
    accessorKey: "likes",
    header: "Likes",
  },
  {
    accessorKey: "date",
    header: "Published Date",
  },
];
