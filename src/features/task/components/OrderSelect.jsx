import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContext, useEffect, useState } from "react";

import { TasksContext } from "../context/task.context.jsx";
import { extractQueryString } from "@/lib/extractQueryString";
import { useNavigate } from "react-router-dom";

export function OrderSelect() {
  const { tasks, setTasks } = useContext(TasksContext);
  const [currentOrder, setCurrentOrder] = useState();
  const [query, setQuery] = useState();
  const navigate = useNavigate();

  let order = tasks?.pagination?.links?.nextPage
    ? extractQueryString(tasks?.pagination?.links?.nextPage).get("order")
    : undefined;

  useEffect(() => {
    if (tasks?.pagination?.links?.nextPage) {
      let currentPage = extractQueryString(
        tasks?.pagination?.links?.currentPage,
      );
      let query = currentPage
        ? `/tasks?limit=${currentPage.get("limit")}&page=${currentPage.get(
            "page",
          )}`
        : undefined;
      setQuery(query);
    }
  }, [tasks]);

  useEffect(() => {
    if (currentOrder && query) {
      navigate(`${query}&order=${currentOrder}`);
    }
    if (currentOrder && !query) {
      navigate(`/tasks?order=${currentOrder}`);
    }
  }, [currentOrder]);

  return (
    <Select
      value={currentOrder ?? order}
      onValueChange={(value) => setCurrentOrder(value)}>
      <SelectTrigger className="w-35">
        <SelectValue placeholder="Select Order" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="asc">Oldest first</SelectItem>
          <SelectItem value="dsc"> Newest first</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
