import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { paths } from "@/paths.js";

function FloatingAddButton() {
  return (
    <Link
      to={paths.taskNew}
      aria-label="Add task"
      className="fixed left-1/2 z-40 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-text-primary shadow-lg shadow-brand-700/20 transition-transform hover:bg-primary-hover active:scale-95 md:hidden bottom-[calc(1.5rem+env(safe-area-inset-bottom))]">
      <Plus className="h-6 w-6" aria-hidden="true" />
    </Link>
  );
}

export default FloatingAddButton;
