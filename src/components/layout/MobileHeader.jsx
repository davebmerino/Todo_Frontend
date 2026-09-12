import { Link, useLocation } from "react-router-dom";
import { User, Plus } from "lucide-react";
import { paths } from "@/paths";
import MobileAddTaskFAB from "./MobileAddTaskFAB.jsx";
import { Button } from "@/components/ui/button.jsx";

const TITLES = {
  [paths.dashboard]: "Dashboard",
  [paths.tasks]: "All Tasks",
  [paths.search]: "Search",
  [paths.profile]: "Profile",
  [paths.settings]: "Settings",
};

function MobileHeader({ firstName }) {
  const { pathname } = useLocation();
  const title = TITLES[pathname] ?? "Todo";
  const today = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <header className="flex items-center justify-between border-b border-border bg-surface px-4 py-4 md:hidden">
      <div>
        <p className="text-lg font-semibold text-text-primary">{title}</p>
        <p className="text-xs text-text-muted">{today}</p>
      </div>
      {/* 
      <Link
        to={paths.profile}
        aria-label="Open profile"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-background text-text-muted">
        <User className="h-5 w-5" aria-hidden="true" />
      </Link> */}

      <div className="md:hidden mb-6 flex flex-wrap  justify-end items-baseline-last">
        <h1 className="text-lg font-normal text-bottom text-text-primary">
          Hi,
          <span className="font-medium"> {firstName}</span>
        </h1>
      </div>

      {/* <MobileAddTaskFAB /> */}
    </header>
  );
}

export default MobileHeader;
