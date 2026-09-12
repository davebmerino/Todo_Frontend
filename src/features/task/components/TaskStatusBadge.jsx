import { useUpdateTask } from "../hooks/useUpdateTask.hook.js";

const statusVariants = {
  todo: {
    label: "To Do",
    className: "border-slate-200 bg-slate-100 text-slate-700",
  },

  inProgress: {
    label: "In Progress",
    className: "border-blue-200 bg-blue-100 text-blue-700",
  },

  done: {
    label: "Done",
    className: "border-green-200 bg-green-100 text-green-700",
  },
};

function TaskStatusBadge({ taskId, status }) {
  const selectedStatus = statusVariants[status] ?? statusVariants.todo;

  const { mutate: updateTask, isPending } = useUpdateTask();

  function handleStatusChange() {
    if (status === "done") {
      return;
    }

    const nextStatus = status === "todo" ? "inProgress" : "todo";

    updateTask({
      _id: taskId,
      status: nextStatus,
    });
  }

  const labels = {
    todo: "To do",
    inProgress: "In progress",
    done: "Done",
  };

  return (
    <button
      type="button"
      onClick={handleStatusChange}
      disabled={status === "done" || isPending}
      className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${selectedStatus.className}`}>
      {isPending ? "Updating..." : labels[status]}
    </button>
  );
}

export default TaskStatusBadge;
