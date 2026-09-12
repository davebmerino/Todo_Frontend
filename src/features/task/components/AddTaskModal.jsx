import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import TaskForm from "./TaskForm.jsx";
import useCreateTask from "@/features/task/hooks/createTask.hook.js";

import { toast } from "@/components/ui/toast";
import { useQueryClient } from "@tanstack/react-query";

const EMPTY_TASK = {
  title: "",
  description: "",
  status: "todo",
  priority: "low",
  dueDate: "",
};

export default function AddTaskModal() {
  const [open, setOpen] = useState(false);

  const { mutate: createTask, isPending } = useCreateTask();

  const queryClient = useQueryClient();

  function handleCreate(values) {
    createTask(values, {
      onSuccess: () => {
        setOpen(false);

        toast.add({
          type: "success",
          title: "Task created successfully",
          description: "Your new task has been added.",
        });
      },

      onError: (error) => {
        toast.add({
          type: "error",
          title: "Unable to create task",
          description: error.message || "Please try again.",
        });
      },
    });

    queryClient.invalidateQueries({
      queryKey: ["taskSummary"],
      refetchType: "all",
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="hidden md:flex"
        render={
          <Button
            className="p-2 rounded-xl text-sm font-semibold hover:bg-foreground hover:text-white cursor-pointer"
            type="button"
            aria-label="create-tasks">
            <Plus className="size-4" />
            Add Task
          </Button>
        }>
        <Plus aria-hidden="true" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create task</DialogTitle>
        </DialogHeader>

        <TaskForm
          initialValues={EMPTY_TASK}
          onSubmit={handleCreate}
          isPending={isPending}
          submitLabel="Create task"
        />
      </DialogContent>
    </Dialog>
  );
}
