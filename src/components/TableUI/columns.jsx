// import { ColumnDef } from "@tanstack/react-table";

export let Payment = {
  id: String,
  video: String,
  restrictions: String,
  views: Number,
};

export const columns = [
  {
    accessorKey: "video",
    header: "Video",
    cell: ({ row }) => {
      let url = row?.original?.video;
      return <img src={url} />;
    },
  },
  {
    accessorKey: "restrictions",
    header: "Restrictions",
  },
  {
    accessorKey: "views",
    header: "Views",
  },
];
