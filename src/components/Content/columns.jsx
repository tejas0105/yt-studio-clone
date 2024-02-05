// import { ColumnDef } from "@tanstack/react-table";
import { FiEdit2 } from "react-icons/fi";
import { MoreHorizontal } from "lucide-react";
import { MdOutlineDelete } from "react-icons/md";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import { MdOutlinePublic } from "react-icons/md";
import { IoLinkOutline } from "react-icons/io5";

const restrictionIcons = {
  private: RiGitRepositoryPrivateLine,
  public: MdOutlinePublic,
  unlisted: IoLinkOutline,
};

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
            <img className="h-24" src={url} />
          </div>
          <div className=" ml-4 line-clamp-3 text-ellipsis w-96">
            <a
              href={row?.original?.link}
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              {row?.original?.title}
            </a>
            <p className="opacity-50 ">
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
      let Restrictions = restrictionIcons[row?.original?.restrictions];
      return (
        <p className="capitalize flex justify-center items-center">
          <span className="mr-1 text-lg opacity-55">
            <Restrictions />
          </span>
          {restriction}
        </p>
      );
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
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => console.log(payment)}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <FiEdit2 className="mr-2" />
              Edit title or description
            </DropdownMenuItem>
            <span
              onClick={() => {
                row?.original?.changeDeleteModalState(row?.original?.videoId);
                row?.original?.getVideoName(row?.original?.title);
                // console.log(row?.original?.title);
              }}
            >
              <DropdownMenuItem>
                <MdOutlineDelete className="mr-2 h-4 w-4" />
                Delete forever
              </DropdownMenuItem>
            </span>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
