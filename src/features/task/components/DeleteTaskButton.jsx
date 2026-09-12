import { Trash2 } from "lucide-react";
import { toast } from "@/components/ui/toast";

import { useDeleteTask } from "../hooks/useDeleteTask.hook.js";

function DeleteTaskButton({ task }) {
  const { mutate: deleteTask, isPending } = useDeleteTask();

  function handleDelete() {
    const confirmed = window.confirm(`Delete "${task.title}"?`);

    if (!confirmed) {
      return;
    }

    deleteTask(
      {
        _id: task._id,
      },
      {
        onSuccess: () => {
          toast.add({
            type: "success",
            title: "Task deleted",
            description: "The task was deleted successfully.",
          });
        },

        onError: (error) => {
          toast.add({
            type: "error",
            title: "Unable to delete task",
            description: error.message,
          });
        },
      },
    );
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      aria-label={`Delete ${task.title}`}
      className="inline-flex size-9 items-center justify-center rounded-full text-destructive transition-colors hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50">
      <Trash2 className="size-4" aria-hidden="true" />
    </button>
  );
}

export default DeleteTaskButton;
