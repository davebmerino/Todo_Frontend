import { Check } from "lucide-react";

import { useUpdateTask } from "../hooks/useUpdateTask.hook.js";

function TaskCompletion({ taskId, title, status }) {
  const { mutate: updateTask, isPending } = useUpdateTask();

  const isDone = status === "done";

  function handleCompletion() {
    if (!taskId) {
      console.error("Task ID is missing.");
      return;
    }
    updateTask({
      _id: taskId,
      status: isDone ? "todo" : "done",
    });
  }

  return (
    <div className="flex min-w-0 items-center gap-3 ">
      <button
        type="button"
        role="checkbox"
        aria-checked={isDone}
        aria-label={
          isDone ? `Mark ${title} as not done` : `Mark ${title} as done`
        }
        onClick={handleCompletion}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent-foreground transition-colors md:h-6 md:w-6 ${
          isDone
            ? "border-primary-700 bg-primary text-white"
            : "border-border bg-surface text-transparent hover:border-primary-600"
        }`}>
        <Check
          className="h-3.5 w-3.5 md:h-4 md:w-4 "
          strokeWidth={3}
          aria-hidden="true"
        />
      </button>

      <p
        className={`truncate text-sm font-medium ${
          isDone ? "text-text-muted line-through" : "text-text-primary"
        }`}>
        {title}
      </p>
    </div>
  );
}

export default TaskCompletion;
