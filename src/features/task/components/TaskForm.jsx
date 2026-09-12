import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateTaskSchema } from "@/schema/createTaskSchema.js";

const EMPTY_TASK = {
  title: "",
  description: "",
  status: "todo",
  priority: "low",
  dueDate: "",
};

export default function TaskForm({
  initialValues = EMPTY_TASK,
  onSubmit,
  isPending = false,
  submitLabel = "Save task",
}) {
  const {
    register: registerField,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 glass-modal "
      noValidate>
      <div className="glass-modal">
        <label htmlFor="task-title">Title</label>

        <Input
          id="task-title"
          {...registerField("title")}
          aria-invalid={Boolean(errors.title)}
        />

        {errors.title && (
          <p className="text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div className="glass-modal">
        <label htmlFor="task-description">Description</label>

        <textarea
          id="task-description"
          {...registerField("description")}
          className="w-full rounded-xl border border-border bg-surface p-3 glass-modal"
          aria-invalid={Boolean(errors.description)}
        />

        {errors.description && (
          <p className="text-sm text-red-600 glass-modal">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="task-status">Status</label>

        <select
          id="task-status"
          {...registerField("status")}
          className="w-full rounded-xl border border-border bg-surface p-3 glass-modal">
          <option value="todo">To do</option>

          <option value="inProgress">In progress</option>

          <option value="done">Done</option>
        </select>
      </div>

      <div>
        <label htmlFor="task-priority">Priority</label>

        <select
          id="task-priority"
          {...registerField("priority")}
          className="w-full rounded-xl border border-border bg-surface p-3">
          <option value="low">Low</option>

          <option value="moderate">Moderate</option>

          <option value="high">High</option>
        </select>
      </div>

      <div>
        <label htmlFor="task-due-date">Due date</label>

        <Input
          id="task-due-date"
          type="date"
          {...registerField("dueDate")}
          aria-invalid={Boolean(errors.dueDate)}
        />

        {errors.dueDate && (
          <p className="text-sm text-red-600">{errors.dueDate.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
