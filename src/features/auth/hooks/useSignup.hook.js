import { useMutation } from "@tanstack/react-query";

async function createUser(user) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/user/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    },
  );

  // Read the response before using result.
  const result = await response.json();

  if (!response.ok) {
    // Handle express-validator errors.
    const validationMessage =
      Array.isArray(result.data) && result.data.length > 0
        ? result.data[0].msg
        : null;

    throw new Error(
      validationMessage ||
        result.error.message ||
        "A user this email may already exists",
    );
  }

  return result;
}

//Create a mutation
export default function useSignup() {
  return useMutation({
    mutationFn: createUser,
    onSuccess: (response) => {
      console.log("User was created", response);
    },
    onError: (error) => {
      console.log("Error on creating the user", error);
    },
  });
}
