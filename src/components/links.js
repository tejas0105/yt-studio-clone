import { nanoid } from "nanoid";
import { MdDashboard } from "react-icons/md";
import { MdContentCopy } from "react-icons/md";
import { LiaCommentSolid } from "react-icons/lia";

const iconComponents = {
  dashboard: MdDashboard,
  content: MdContentCopy,
  comments: LiaCommentSolid,
};

const links = [
  { id: nanoid(), name: "dashboard" },
  { id: nanoid(), name: "content" },
  { id: nanoid(), name: "comments" },
];

export { links, iconComponents };
