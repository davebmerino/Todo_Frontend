import TaskList from "../components/TaskList.jsx";

import { useEffect, useContext } from "react";
import { useFetchTask } from "@/features/task/hooks/useFetchTask.hook.js";
import { TaskPagination } from "../components/TaskPagination.jsx";
import { TasksContext } from "../context/task.context.jsx";

import { useSearchParams } from "react-router-dom";
import { Field, FieldLabel } from "@/components/ui/field.jsx";
import { OrderSelect } from "../components/OrderSelect.jsx";

function AllTasksPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams);

    let needsUpdate = false;

    if (!nextParams.has("limit")) {
      nextParams.set("limit", "5");
      needsUpdate = true;
    }

    if (!nextParams.has("page")) {
      nextParams.set("page", "1");
      needsUpdate = true;
    }

    if (!nextParams.has("order")) {
      nextParams.set("order", "asc");
      needsUpdate = true;
    }

    if (needsUpdate) {
      setSearchParams(nextParams, {
        replace: true,
      });
    }
  }, [searchParams, setSearchParams]);

  const { tasks, setTasks } = useContext(TasksContext);

  const requestedLimit = Number(searchParams.get("limit"));

  const requestedPage = Number(searchParams.get("page"));

  const requestedOrder = searchParams.get("order");

  const limit =
    Number.isInteger(requestedLimit) && requestedLimit > 0 ? requestedLimit : 5;

  const page =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const order = requestedOrder === "dsc" ? "dsc" : "asc";
  const { data, isError, isSuccess, isPending, error } = useFetchTask({
    limit,
    page,
    order,
  });

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data, setTasks]);

  return (
    <>
      <section className="md:w-170 md:mx-auto">
        <header className="hidden md:flex items-center w-full justify-between gap-4 mb-4 ">
          <div>
            <h1 className="text-2xl font-bold">All Tasks</h1>

            <p className="mt-1 text-sm text-text-muted">
              Manage all your tasks.
            </p>
          </div>
        </header>

        <Field className="w-1/3 py-4 my-4">
          <FieldLabel>Sort by Order</FieldLabel>
          <OrderSelect />
        </Field>

        <TaskList data={tasks?.data} />
        <TaskPagination />
      </section>
    </>
  );
}

export default AllTasksPage;
