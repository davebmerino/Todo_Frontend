import { apiFetch } from "@/lib/apiFetch.js";

import { useMutation, useQueryClient } from "@tanstack/react-query";

async function updateTask({ _id, ...updates }) {
  if (!_id) {
    throw new Error("Task ID is required.");
  }

  const response = await apiFetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/task/update`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        ...updates,
      }),
    },
  );

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    const validationErrors = Array.isArray(result?.error?.data)
      ? result.error.data
      : Array.isArray(result?.data)
        ? result.data
        : [];

    throw new Error(
      validationErrors[0]?.msg ||
        result?.error?.message ||
        result?.message ||
        `Updating task failed with status ${response.status}`,
    );
  }

  return result;
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,

    onSuccess: async (response, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["fetchTasks"],
        }),

        queryClient.invalidateQueries({
          queryKey: ["taskSummary"],
        }),

        queryClient.invalidateQueries({
          queryKey: ["task", variables.taskId],
        }),
      ]);
    },
  });
}
