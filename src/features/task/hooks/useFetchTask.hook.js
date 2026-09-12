import { apiFetch } from "@/lib/apiFetch.js";
import { useQuery } from "@tanstack/react-query";

async function getTasks({ queryKey }) {
  const [, parameters] = queryKey;

  //I already have an reusable apiFetch
  // const token = Cookies.get("token");

  const query = new URLSearchParams({
    limit: String(parameters.limit),
    page: String(parameters.page),
    order: parameters.order,
  });

  const response = await apiFetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/task/fetch?${query}`,
    {
      method: "GET",
      // headers: {
      //   "Content-Type": "application/json",
      //   Authorization: `Bearer ${token}`,
      // }, //I already have an reusable apiFetch

      credentials: "include",
    },
  );

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.message || result?.reason || "Unable to fetch tasks.",
    );
  }

  return result;
}

export function useFetchTask(parameters) {
  const parsedLimit = Number(parameters.limit);
  const parsedPage = Number(parameters.page);

  const safeParameters = {
    limit: Number.isInteger(parsedLimit) && parsedLimit > 0 ? parsedLimit : 5,

    page: Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1,

    order: parameters.order === "dsc" ? "dsc" : "asc",
  };

  return useQuery({
    queryKey: ["fetchTasks", safeParameters],
    queryFn: getTasks,
  });
}
