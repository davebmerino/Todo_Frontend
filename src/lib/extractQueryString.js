export function extractQueryString(url) {
  if (!url || typeof url !== "string") {
    return new URLSearchParams();
  }

  try {
    const parsedUrl = new URL(url, window.location.origin);

    return parsedUrl.searchParams;
  } catch (error) {
    console.error("Invalid pagination URL:", url);
    return new URLSearchParams();
  }
}
