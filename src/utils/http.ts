import { isArrayOrObject, isPlainObject, PlainObject } from "./object";

enum METHODS {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
  PATCH = "PATCH"
}
type StringIndexed = Record<string, any>;

function getKey(key: string, parentKey?: string) {
  return parentKey ? `${parentKey}[${key}]` : key;
}

function getParams(data: PlainObject | [], parentKey?: string) {
  const result: [string, string][] = [];

  for (const [key, value] of Object.entries(data)) {
    if (isArrayOrObject(value)) {
      // @ts-ignore
      result.push(...getParams(value, getKey(key, parentKey)));
    } else {
      result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
    }
  }

  return result;
}

export function queryString2(data: PlainObject) {
  if (!isPlainObject(data)) {
    throw new Error("input must be an object");
  }

  return getParams(data)
    .map(arr => arr.join("="))
    .join("&");
}

function queryStringify(data: StringIndexed): string | never {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    const value = data[key];
    const endLine = index < keys.length - 1 ? "&" : "";

    if (Array.isArray(value)) {
      const arrayValue = value.reduce<StringIndexed>(
        (result, arrData, index) => ({
          ...result,
          [`${key}[${index}]`]: arrData
        }),
        {}
      );

      return `${result}${queryStringify(arrayValue)}${endLine}`;
    }

    if (typeof value === "object") {
      const objValue = Object.keys(value || {}).reduce<StringIndexed>(
        (result, objKey) => ({
          ...result,
          [`${key}[${objKey}]`]: value[objKey]
        }),
        {}
      );

      return `${result}${queryStringify(objValue)}${endLine}`;
    }

    return `${result}${key}=${value}${endLine}`;
  }, "");
}

export type TOptions = {
  timeout?: number;
  headers?: Record<string, string>;
  data?: Record<string, any>;
};

type TRequestOptions = TOptions & {
  method: METHODS;
};

export type TMethod = <T>(url: string, options?: TOptions) => Promise<T>;
interface IHTTPTransport {
  get: TMethod;
  post: TMethod;
  put: TMethod;
  delete: TMethod;
  patch: TMethod;
}
export class HTTPTransport implements IHTTPTransport {
  static API_URL = "https://ya-praktikum.tech/api/v2";

  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

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

  request = <T>(
    url: string,
    options: TRequestOptions,
    timeout: number = 5000
  ): Promise<T> => {
    const { method, data, headers = {} } = options;
    return new Promise<T>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      if (method === METHODS.GET && data) {
        url += queryStringify(data);
      }
      xhr.open(method, this.endpoint + url);
      xhr.withCredentials = true;
      xhr.responseType = "json";
      xhr.timeout = timeout;

      if (Object.keys(headers).length > 0) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject({
              status: xhr.status,
              response: xhr.response
            });
          }
        }
      };
      xhr.onabort = () => reject({ reason: "abort" });
      xhr.onerror = () => reject({ reason: "network error" });
      xhr.ontimeout = () => reject({ reason: "timeout" });

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        const d = data instanceof FormData ? data : JSON.stringify(data);
        xhr.send(d);
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
  const http = new HTTPTransport(url);
  function retry(err?: Error): Promise<any> {
    if (retries === 0) {
      throw err;
    }
    retries--;
    return http.get(url, options).catch(retry);
  }
  return retry();
}
