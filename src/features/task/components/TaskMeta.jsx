import { Calendar } from "lucide-react";
import TaskStatusBadge from "./TaskStatusBadge.jsx";

function isToday(dateValue) {
  if (!dateValue) return false;

  const dueDate = new Date(dateValue);
  const today = new Date();

  return (
    dueDate.getFullYear() === today.getFullYear() &&
    dueDate.getMonth() === today.getMonth() &&
    dueDate.getDate() === today.getDate()
  );
}

function TaskMeta({ status, dueDate }) {
  const taskIsDueToday = isToday(dueDate);

  return (
    <div className="flex flex-row items-center gap-2 py-3">
      <TaskStatusBadge status={status} />

      {taskIsDueToday && (
        <p className="flex items-center gap-1.5 text-sm text-text-muted">
          Today
          <Calendar className="h-4 w-4" aria-hidden="true" />
        </p>
      )}
    </div>
  );
}

export default TaskMeta;
