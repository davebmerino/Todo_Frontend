import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiFetch } from "@/lib/apiFetch.js";

async function deleteTask({ _id }) {
  if (!_id) {
    throw new Error("Task ID is required.");
  }

  const response = await apiFetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/task/delete`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
      }),
    },
  );

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    const validationErrors = result?.error?.data;

    throw new Error(
      validationErrors?.[0]?.msg ||
        result?.error?.message ||
        result?.message ||
        `Unable to delete task (${response.status})`,
    );
  }

  return result;
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,

    onSuccess: async (response, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["fetchTasks"],
        }),

        queryClient.invalidateQueries({
          queryKey: ["taskSummary"],
        }),
      ]);

      queryClient.removeQueries({
        queryKey: ["task", variables._id],
      });
    },
  });
}
