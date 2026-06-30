const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "";

function resolveAPIUrl(url: string) {
  if (/^https?:\/\//.test(url)) {
    return url;
  }

  if (API_BASE_URL.endsWith("/api") && url.startsWith("/api/")) {
    return `${API_BASE_URL}${url.slice(4)}`;
  }

  return `${API_BASE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

export async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(resolveAPIUrl(url), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
