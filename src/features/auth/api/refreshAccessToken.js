import Cookies from "js-cookie";

export async function refreshAccessToken() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh`,
    {
      method: "POST",

      // Sends the HTTP-only refreshToken cookie.
      credentials: "include",
    },
  );

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    Cookies.remove("token");
    Cookies.remove("user");

    throw new Error(
      result?.message || result?.error?.message || "Your session has expired.",
    );
  }

  // Supports your possible response wrappers.
  const data = result?.data?.data ?? result?.data ?? result;

  if (!data?.accessToken) {
    throw new Error("The server did not return an access token.");
  }

  Cookies.set("token", data.accessToken, {
    secure: import.meta.env.PROD,
    sameSite: "strict",
  });

  return data.accessToken;
}
