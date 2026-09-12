import { apiFetch } from "@/lib/apiFetch.js";
import { useQuery } from "@tanstack/react-query";

async function getTasks() {
  //I already have an reusable apiFetch
  // const token = Cookies.get("token");

  const response = await apiFetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/task/summary`,
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
      result?.message ||
        result?.reason ||
        result?.error?.message ||
        "Unable to fetch task summary.",
    );
  }

  return result;
}

export function useSummary() {
  return useQuery({
    queryKey: ["taskSummary"],
    queryFn: getTasks,

    // Your response is response.data.data
    select: (response) => response.data.data,

    staleTime: 30 * 1000,
  });
}
