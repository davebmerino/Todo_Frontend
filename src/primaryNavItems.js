import { LayoutDashboard, ListTodo, Search, User } from "lucide-react";
import { paths } from "./paths";

export const primaryNavItems = [
  { label: "Dashboard", path: paths.dashboard, icon: LayoutDashboard },
  { label: "Tasks", path: paths.tasks, icon: ListTodo },
  { label: "Search", path: paths.search, icon: Search },
  { label: "Profile", path: paths.profile, icon: User },
];
