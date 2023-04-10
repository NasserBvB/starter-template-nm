export default async function fetchApi<T>(url: string, options?: RequestInit) {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!response.ok) {
      const errorMessage = (await response.text()) || response.statusText;
      throw new Error(errorMessage);
    }

    const responseType = response.headers.get("Content-Type");

    let data;

    if (responseType && responseType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    return {
      error: null,
      response: data,
    };
  } catch (error: any) {
    return {
      error: error.message,
      response: null,
    };
  }
}
