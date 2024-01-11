// import { ColumnDef } from "@tanstack/react-table";

export let Payment = {
  id: String,
  video: String,
  restrictions: String,
};

export const columns = [
  {
    accessorKey: "video",
    header: "Video",
  },
  {
    accessorKey: "restrictions",
    header: "Restrictions",
  },
];
