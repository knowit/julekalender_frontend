import axios, { AxiosError, AxiosResponse } from "axios"
import { identity, merge } from "lodash"


axios.interceptors.request.use((config) => (
  merge(config, {
    url: `${config.url}.json`, // Default to .json format for all endpoints
    baseURL: import.meta.env.VITE_BACKEND_HOST
  })
))

axios.interceptors.response.use(
  identity,
  (error: AxiosError<{ message: string }>) => {
    let err: QueryError

    if (error.response) {
      // Normal error response from server

      console.log({ headers: error.response.headers })

      const { data, headers, status, statusText } = error.response
      err = { ...data, headers, status, statusText }
    } else if (error.request) {
      // No response

      const { message } = error
      err = { message }
    } else {
      //Unknown error

      const { message } = error
      err = { message }
    }

    return Promise.reject(err)
  }
)

export type QueryAxiosError = Partial<Pick<AxiosResponse, "headers" | "status" | "statusText">>
export type QueryError<T extends Record<string, unknown> = { message: string }> = T & QueryAxiosError
