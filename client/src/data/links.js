import { AiOutlineFolderAdd } from "react-icons/ai";
import { BiListUl, BiUserCircle } from "react-icons/bi";
import { GoGear } from "react-icons/go";
import { TbLayoutDashboard, TbLogout } from "react-icons/tb";

export const links = [
  {
    text: "dashboard",
    path: "/",
    icon: <TbLayoutDashboard />,
    category: "main",
  },
  {
    text: "add job",
    path: "add-job",
    icon: <AiOutlineFolderAdd />,
    category: "main",
  },
  {
    text: "all jobs",
    path: "all-jobs",
    icon: <BiListUl />,
    category: "lists",
  },
  {
    text: "profile",
    path: "profile",
    icon: <BiUserCircle />,
    category: "user",
  },
  {
    text: "settings",
    path: "settings",
    icon: <GoGear />,
    category: "settings",
  },
  {
    text: "logout",
    path: "/landing",
    icon: <TbLogout />,
    category: "logout",
  },
];
