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
export type TOptions = {
  timeout?: number;
  headers?: Record<string, string>;
  data?: Record<string, any>;
};

type TRequestOptions = TOptions & {
  method: METHODS;
};

export type TMethod = (
  url: string,
  options: TOptions
) => Promise<XMLHttpRequest>;
interface IHTTPTransport {
  get: TMethod;
  post: TMethod;
  put: TMethod;
  delete: TMethod;
  patch: TMethod;
}
export class HTTPTransport implements IHTTPTransport {
  get: TMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.GET }, options.timeout);

  post: TMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.POST }, options.timeout);

  put: TMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

  delete: TMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

  patch: TMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.PATCH }, options.timeout);

  request = (
    url: string,
    options: TRequestOptions,
    timeout: number = 5000
  ): Promise<XMLHttpRequest> => {
    const { method, data, headers = {} } = options;
    return new Promise<XMLHttpRequest>((resolve, reject) => {
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
      // eslint-disable-next-line func-names
      xhr.onload = function () {
        resolve(xhr);
      };
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

type TRetryOptions = TOptions & {
  retries: number;
};
export function fetchWithRetry(
  url: string,
  options: TRetryOptions = { retries: 2 }
) {
  let { retries } = options;
  const http = new HTTPTransport();
  function retry(err?: Error): Promise<any> {
    if (retries === 0) {
      throw err;
    }
    retries--;
    return http.get(url, options).catch(retry);
  }
  return retry();
}
