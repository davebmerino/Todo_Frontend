import Cookies from "js-cookie";
import { refreshAccessToken } from "@/features/auth/api/refreshAccessToken.js";

export async function apiFetch(url, options = {}) {
  const accessToken = Cookies.get("token");

  const sendRequest = (token) =>
    fetch(url, {
      ...options,
      credentials: "include",

      headers: {
        ...options.headers,

        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),
      },
    });

  // First request using the current access token.
  let response = await sendRequest(accessToken);

  // Return immediately when the token is still valid.
  if (response.status !== 401) {
    return response;
  }

  // Access token expired—request a new one.
  const newAccessToken = await refreshAccessToken();

  // Retry the original request once.
  response = await sendRequest(newAccessToken);

  return response;
}
