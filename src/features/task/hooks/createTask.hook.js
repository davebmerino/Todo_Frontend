import { apiFetch } from "@/lib/apiFetch.js";
import { useMutation } from "@tanstack/react-query";

// Simulated function to post data to an API endpoint
const createTask = async (task) => {
  // const token = Cookies.get("token");  //I already had an apiFectch function for refresh token

  const response = await apiFetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/task/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`, //I already have an reusable apiFetch
      },

      // Required if your backend sends a refresh-token cookie.
      credentials: "include",

      body: JSON.stringify(task),
    },
  );

  //Get the response as result
  const result = await response.json().catch(() => null);

  //Condition is no reponse
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

  return result;
};

//Create mutation
export default function useCreateTask() {
  return useMutation({
    mutationFn: createTask,
  });
}
