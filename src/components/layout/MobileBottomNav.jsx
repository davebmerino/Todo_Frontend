import { NavLink } from "react-router-dom";

import { primaryNavItems } from "@/primaryNavItems.js";
import { paths } from "@/paths.js";

import { Plus } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog.jsx";
import { Button } from "@base-ui/react";
import { useState } from "react";
import TaskForm from "@/features/task/components/TaskForm.jsx";
import useCreateTask from "@/features/task/hooks/createTask.hook.js";
import { toast } from "@/components/ui/toast";
import { useQueryClient } from "@tanstack/react-query";

function NavItem({ path, label, icon: Icon }) {
  return (
    <NavLink
      to={path}
      end={path === paths.dashboard}
      className={({ isActive }) =>
        `flex h-12 min-w-16 flex-col items-center justify-center gap-0.5 rounded-2xl px-3 text-[11px] font-medium transition-colors ${
          isActive
            ? "bg-primary text-primary-800"
            : "text-text-muted hover:bg-background hover:text-primary-foreground"
        }`
      }>
      {({ isActive }) => (
        <>
          <Icon
            className="h-5 w-5"
            aria-hidden="true"
            strokeWidth={isActive ? 2.5 : 2}
          />

          <span>{label}</span>
        </>
      )}
    </NavLink>
  );
}

function MobileBottomNav() {
  const leftItems = primaryNavItems.slice(0, 2);
  const rightItems = primaryNavItems.slice(2);

  async function handleCreateTask(values) {
    // Replace this with your API call.
    console.log("New task:", values);
  }

  const EMPTY_TASK = {
    title: "",
    description: "",
    status: "todo",
    priority: "low",
    dueDate: "",
  };

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
    <nav
      aria-label="Primary navigation"
      className=" glass-primary fixed inset-x-0 bottom-0 z-30 flex h-16 items-center justify-around m-2 px-2 pb-[env(safe-area-inset-bottom)] md:hidden">
      {leftItems.map((item) => (
        <NavItem key={item.path} {...item} />
      ))}

      {/*Center add button on mobile */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <Button
              onClick={() => setOpen(true)}
              type="button"
              size="icon"
              variant="ghost"
              aria-label="create-task"
              className="flex  h-13 w-13 -translate-y-7 items-center justify-center rounded-full bg-secondary-foreground text-white shadow-lg shadow-primary-900/25 transition hover:bg-primary-800 active:scale-95"
            />
          }>
          <Plus className="h-7 w-7" strokeWidth={3} aria-hidden="true" />
        </DialogTrigger>
        <DialogContent>
          <TaskForm
            initialValues={EMPTY_TASK}
            onSubmit={handleCreate}
            isPending={isPending}
            submitLabel="Create task"
          />
        </DialogContent>
      </Dialog>

      {rightItems.map((item) => (
        <NavItem key={item.path} {...item} />
      ))}
    </nav>
  );
}

export default MobileBottomNav;
