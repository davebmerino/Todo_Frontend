import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useMemo, useState } from "react";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import TaskForm from "./TaskForm.jsx";
import { useUpdateTask } from "../hooks/useUpdateTask.hook.js";

export default function EditTaskModal({ task }) {
  const [open, setOpen] = useState(false);

  const { mutate: updateTask, isPending } = useUpdateTask();

  const initialValues = useMemo(
    () => ({
      title: task.title ?? "",
      description: task.description ?? "",
      status: task.status ?? "todo",
      priority: task.priority ?? "low",
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
    }),
    [task],
  );

  function handleUpdate(values) {
    updateTask(
      {
        _id: task._id,
        ...values,
      },
      {
        onSuccess: () => {
          setOpen(false);
          toast.add({
            type: "success",
            title: "Task had been edited",
            description: "Your task has been changed",
          });
        },

        onError: (error) => {
          toast.add({
            type: "error",
            title: "Unable to create task",
            description: error.message || "Please try again.",
          });
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="hover:bg-primary  disabled:cursor-not-allowed disabled:opacity-50 inline-flex size-9 items-center justify-center rounded-full"
            aria-label={`Edit ${task.title}`}
          />
        }>
        <Pencil aria-hidden="true" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit task</DialogTitle>
        </DialogHeader>

        <TaskForm
          initialValues={initialValues}
          onSubmit={handleUpdate}
          isPending={isPending}
          submitLabel="Save changes"
        />
      </DialogContent>
    </Dialog>
  );
}
