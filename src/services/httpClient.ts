export const httpClient = {
  get(input: RequestInfo | URL, options?: RequestInit) {
    return window.fetch(input, { method: "GET", ...options });
  },
};
