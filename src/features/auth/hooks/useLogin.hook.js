import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

// Simulated function to post data to an API endpoint
const loginUser = async (user) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      // Required if your backend sends a refresh-token cookie.
      credentials: "include",

      body: JSON.stringify(user),
    },
  );

  //Get the response as result
  const result = await response.json().catch(() => null);

  //Condition is no reponse
  if (!response.ok) {
    const validationMessage =
      Array.isArray(result?.data) && result.data.length > 0
        ? result.data[0].msg
        : null;

    throw new Error(
      validationMessage ||
        result?.error.message ||
        `Login failed with status ${response.status}`,
    );
  }

  return result;
};

//Create mutation
export default function useLogin() {
  return useMutation({
    // mutationKey: ["login"],

    mutationFn: loginUser,

    onSuccess: (response) => {
      // Supports both wrapped and unwrapped responses.
      const data = response.data ?? response;

      if (!data.accessToken) {
        throw new Error("The server did not return an access token.");
      }

      // This will trigger the callback
      Cookies.set("token", response.data.accessToken, {
        expires: 1,
        sameSite: "strict",
      });

      //Set user
      Cookies.set(
        "user",
        JSON.stringify({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
        }),
        { expires: 1 },
      );
    },
    onError: (error) => {
      // Handle error case
      console.error("Error authenticating:", error);
    },
  });
}
