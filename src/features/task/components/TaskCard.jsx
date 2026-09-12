import { Calendar } from "lucide-react";

import TaskBadge from "./TaskBagde.jsx";
import TaskStatusBadge from "./TaskStatusBadge.jsx";
import TaskCompletion from "./TaskCompletion.jsx";
import EditTaskModal from "./EditTaskModal.jsx";
import DeleteTaskButton from "./DeleteTaskButton.jsx";

function formatDueDate(dateValue) {
  if (!dateValue) return "No due date";

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateValue));
}

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

function TaskCard({ task, variant = "default" }) {
  const taskIsDueToday = isToday(task.dueDate);

  return (
    <article className="w-full rounded-2xl border border-border bg-surface p-4">
      <div className="flex items-start justify-between gap-4">
        <TaskCompletion
          taskId={task._id}
          title={task.title}
          status={task.status}
        />

        <TaskBadge
          taskId={task._id}
          status={task.status}
          variant={task.priority}
        />
      </div>

      {variant !== "compact" && (
        <p className="mt-3 text-sm text-text-muted">{task.description}</p>
      )}

      <div className="flex justify-between">
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <TaskStatusBadge taskId={task._id} status={task.status} />
          <p
            className={`flex items-center gap-1.5 text-sm ${
              taskIsDueToday
                ? "font-medium text-primary-700"
                : "text-text-muted"
            }`}>
            <Calendar className="h-4 w-4" aria-hidden="true" />
            {taskIsDueToday ? "Today" : formatDueDate(task.dueDate)}
          </p>
        </div>

        <div className="flex  items-center">
          <DeleteTaskButton task={task} />
          <EditTaskModal task={task} className="text-center" />
        </div>
      </div>
    </article>
  );
}

export default TaskCard;
