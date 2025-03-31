import type { ResponseType } from "axios";

// move to env
const BASE_URL = "http://localhost:3000";

import type { AxiosResponse, CancelToken } from "axios";
import axios from "axios";

type ApiCallParams = {
  path: string;
  options?: HeadersInit;
  params?: Record<string, any>;
  cancelToken?: CancelToken;
  body?: Record<string, any>;
  headers?: Record<string, string>;
  responseType?: ResponseType;
};

type NoBodyApiCallParams = Omit<ApiCallParams, "body">;

type ApiCall<T extends ApiCallParams> = (params: T) => Promise<AxiosResponse>;

const apiCallWrapper =
  <T extends ApiCallParams>(fn: ApiCall<T>) =>
  async (params: T) => {
    try {
      const result = await fn({ ...params });
      return result;
    } catch (err: Error | any) {
      if (err.response?.status === 401) {
        return { data: undefined } as AxiosResponse<any>;
      }

      throw err;
    }
  };

const get = apiCallWrapper<NoBodyApiCallParams>(
  ({ headers, path, params, cancelToken, responseType }) =>
    axios.get(path, {
      withCredentials: true,
      params,
      cancelToken,
      headers,
      responseType,
    })
);

const post = apiCallWrapper<ApiCallParams>(({ headers, path, body, params }) =>
  axios.post(path, body, { params, headers, withCredentials: true })
);

const put = apiCallWrapper<ApiCallParams>(({ headers, path, body }) =>
  axios.put(path, body, { headers, withCredentials: true })
);

const del = apiCallWrapper<ApiCallParams>(({ headers, path, body }) =>
  axios.delete(path, { data: body, headers, withCredentials: true })
);

export const fetcher = async <
  T extends Record<string, boolean | number | string | string[] | undefined>
>(
  url: string,
  { params, responseType }: { params: T; responseType?: ResponseType }
) => {
  return get({ path: `${BASE_URL}/${url}`, params, responseType }).then(
    (res) => res.data
  );
};

export const poster = async (
  url: string,
  { arg }: { arg: any },
  type: "post" | "put" | "delete" = "post"
) => {
  switch (type) {
    case "put":
      return put({ path: `${BASE_URL}/${url}`, body: arg }).then(
        (res) => res.data
      );
    case "delete":
      return del({ path: `${BASE_URL}/${url}`, body: arg }).then(
        (res) => res.data
      );
    case "post":
    default:
      return post({ path: `${BASE_URL}/${url}`, body: arg }).then(
        (res) => res.data
      );
  }
};
