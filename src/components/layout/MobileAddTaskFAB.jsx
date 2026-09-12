import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

import { paths } from "@/paths";

function MobileAddTaskFAB() {
  return (
    <Link
      to={paths.createTask}
      aria-label="Create a new task"
      className="fixed bottom-24 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-primary-700 text-white shadow-lg shadow-primary-900/20 transition hover:bg-primary-800 active:scale-95 md:hidden">
      <Plus className="size-6" />
    </Link>
  );
}

export default MobileAddTaskFAB;
