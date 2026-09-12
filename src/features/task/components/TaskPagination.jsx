import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useContext, useEffect, useState } from "react";

import { TasksContext } from "../context/task.context.jsx";
import { extractQueryString } from "@/lib/extractQueryString.js";

export function TaskPagination() {
  function getVisiblePages(currentPage, totalPages, maximumVisible = 5) {
    let startPage = currentPage;
    let endPage = Math.min(startPage + maximumVisible - 1, totalPages);

    if (endPage - startPage + 1 < maximumVisible) {
      startPage = Math.max(1, endPage - maximumVisible + 1);
    }

    return Array.from(
      {
        length: endPage - startPage + 1,
      },
      (_, index) => startPage + index,
    );
  }

  const [links, setLinks] = useState();
  const [meta, setMeta] = useState();
  const { tasks, setTasks } = useContext(TasksContext);

  const previousPage = links?.previousPage
    ? extractQueryString(links.previousPage).toString()
    : null;

  const nextPage = links?.nextPage
    ? extractQueryString(links.nextPage).toString()
    : null;

  const order = extractQueryString(links?.currentPage).get("order") ?? "asc";

  useEffect(() => {
    if (tasks) {
      setLinks(tasks.pagination.links);
      setMeta(tasks.pagination.meta);
    }
  }, [tasks]);

  if (!meta || meta.totalPage <= 1) {
    return null;
  }

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={previousPage ? `/tasks?${previousPage}` : undefined}
            aria-disabled={!previousPage}
            className={
              !previousPage ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>

        {Array.from({ length: meta.totalPage }, (_, index) => {
          const pageNumber = index + 1;

          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                to={`/tasks?limit=${meta.itemsPerPage}&page=${pageNumber}&order=${order}`}
                isActive={pageNumber == meta.currentPage ? true : false}>
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href={nextPage ? `/tasks?${nextPage}` : undefined}
            aria-disabled={!nextPage}
            className={!nextPage ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
