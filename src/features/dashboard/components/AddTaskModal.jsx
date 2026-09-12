import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTaskSchema } from "@/schema/createTaskSchema.js";
import useCreateTask from "@/features/task/hooks/createTask.hook.js";
import { toast } from "@/components/ui/toast";
import { useQueryClient } from "@tanstack/react-query";

const STATUS_OPTIONS = [
  { value: "todo", label: "To do" },
  { value: "inProgress", label: "In progress" },
  { value: "done", label: "Done" },
];

const PRIORITY_OPTIONS = [
  { value: "high", label: "High" },
  { value: "moderate", label: "Moderate" },
  { value: "low", label: "Low" },
];

const controlClassName =
  "w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm " +
  "outline-none focus-visible:ring-2 focus-visible:ring-ring " +
  "aria-invalid:border-destructive disabled:opacity-50";

export default function AddTaskModal({ onCreateTask }) {
  const [open, setOpen] = useState(false);
  const { mutate: createTaks, isPending } = useCreateTask();
  const queryClient = useQueryClient();

  const formId = useId();

  const {
    register: task,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "todo",
      priority: "low",
      dueDate: "",
    },
  });

  //FieldAccessibility
  function fieldAccessibility(name) {
    return {
      "aria-invalid": Boolean(errors[name]),
      "aria-describedby": errors[name] ? `${formId}-${name}-error` : undefined,
    };
  }

  //Render Error
  function renderError(name) {
    if (!errors[name]) return null;

    return (
      <p
        id={`${formId}-${name}-error`}
        className="text-sm text-destructive"
        role="alert">
        {errors[name].message}
      </p>
    );
  }

  //On submit
  function onSubmit(values) {
    if (isPending) return;

    createTaks(values, {
      onSuccess: () => {
        reset();
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
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!isPending) setOpen(nextOpen);
      }}>
      <Button
        className="hidden md:flex"
        type="button"
        onClick={() => setOpen(true)}>
        <Plus className="size-4" />
        Add task
      </Button>

      <DialogContent
        className="glass-modal w-[calc(100%-2rem)] max-w-sm
                   sm:max-w-md max-h-[90dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add new task</DialogTitle>
          <DialogDescription>
            Enter the details of your new task.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4  ">
          <FieldGroup className="">
            <Field className="glass-modal">
              <FieldLabel htmlFor={`${formId}-title`} className="glass-modal">
                Task title
              </FieldLabel>

              <Input
                className="glass-input"
                id={`${formId}-title`}
                placeholder="e.g. Complete dashboard design"
                aria-invalid={Boolean(errors.title)}
                aria-describedby={
                  errors.title ? `${formId}-title-error` : undefined
                }
                {...task("title", {
                  validate: (value) =>
                    value.trim().length > 0 || "Task title is required.",
                })}
              />

              {errors.title && (
                <p
                  id={`${formId}-title-error`}
                  className="text-sm text-destructive"
                  role="alert">
                  {errors.title.message}
                </p>
              )}
            </Field>

            <Field className="glass-modal">
              <FieldLabel
                htmlFor={`${formId}-description`}
                className="glass-modal">
                Description
              </FieldLabel>

              <textarea
                id={`${formId}-description`}
                placeholder="Describe what needs to be done"
                rows={4}
                maxLength={500}
                className={`${controlClassName} min-h-24 resize-y glass-input`}
                {...fieldAccessibility("description")}
                {...task("description", {
                  validate: (value) =>
                    Boolean(value.trim()) || "Description is required.",
                  maxLength: {
                    value: 500,
                    message: "Description must be at most 500 characters.",
                  },
                })}
              />

              {renderError("description")}
            </Field>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor={`${formId}-status`}>Status</FieldLabel>

                <select
                  id={`${formId}-status`}
                  className={`${controlClassName} glass-input`}
                  {...fieldAccessibility("status")}
                  {...task("status", {
                    required: "Please select a status.",
                  })}>
                  {STATUS_OPTIONS.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>

                {renderError("status")}
              </Field>

              <Field>
                <FieldLabel htmlFor={`${formId}-priority`}>Priority</FieldLabel>

                <select
                  id={`${formId}-priority`}
                  className={`${controlClassName} glass-input`}
                  {...fieldAccessibility("priority")}
                  {...task("priority", {
                    required: "Please select a priority.",
                  })}>
                  {PRIORITY_OPTIONS.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>

                {renderError("priority")}
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor={`${formId}-dueDate`}>Due date</FieldLabel>

              <Input
                className="glass-input"
                id={`${formId}-dueDate`}
                type="date"
                {...fieldAccessibility("dueDate")}
                {...task("dueDate", {
                  required: "Please select a due date.",
                })}
              />

              {renderError("dueDate")}
            </Field>

            {errors.root && (
              <p className="text-sm text-destructive" role="alert">
                {errors.root.message}
              </p>
            )}

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                disabled={isPending}
                onClick={() => setOpen(false)}>
                Cancel
              </Button>

              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isPending ? "Creating..." : "Create task"}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
