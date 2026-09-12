import { apiFetch } from "@/lib/apiFetch.js";
import { useMutation } from "@tanstack/react-query";

const doneButton = async (task) => {
  const response = await apiFetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/task/create`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    },
  );

  //Get the response as result
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
        `Creating task failed with status ${response.status}`,
    );
  }
};

export function useDoneButton() {
  return useMutation({
    mutationFn: doneButton,
  });
}
