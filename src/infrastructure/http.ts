enum METHODS {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
  PATCH = "PATCH"
}
function queryStringify(data: Record<string, string | string[]> = {}): string {
  const query = Object.entries(data)
    .reduce((acc, [key, value]) => {
      if (Array.isArray(value)) {
        acc.push(`${key}=${value.join(",")}`);
      } else {
        acc.push(`${key}=${value}`);
      }
      return acc;
    }, [] as string[])
    .join("&");

  return `?${query}`;
}

export class HTTPTransport {
  get = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.GET }, options.timeout);

  post = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.POST }, options.timeout);

  put = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

  delete = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

  request = (url, options, timeout = 5000) => {
    const { method, data, headers = {} } = options;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      if (method === METHODS.GET && data) {
        url += queryStringify(data);
      }
      xhr.open(method, url);
      xhr.timeout = timeout;
      if (Object.keys(headers).length > 0) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }
      xhr.onload = function () {
        resolve(xhr);
      };
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}

function fetchWithRetry(url: string, options = { retries: 2 }) {
  let { retries } = options;
  const http = new HTTPTransport();
  function retry(err) {
    if (retries === 0) {
      throw err;
    }
    retries--;
    return http.get(url, options).catch(retry);
  }
  return retry();
}
