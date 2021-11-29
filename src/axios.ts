import axios, { AxiosError, AxiosResponse } from "axios"
import { includes, merge } from "lodash"


export let authorizationToken: string | undefined = undefined
export let csrfToken: string | undefined = undefined

export const setAuthorizationToken = (newToken: string) => authorizationToken = newToken
export const setCsrfToken = (newToken: string) => csrfToken = newToken

const activeStorageRegexp = new RegExp("/rails/active_storage/")
const csrfMethods = ["post", "patch", "put", "delete", "POST", "PATCH", "PUT", "DELETE"]

axios.interceptors.request.use((config) => {
  const headers: Record<string, string> = {}

  if (authorizationToken)
    headers["Authorization"] = authorizationToken
  if (includes(csrfMethods, config.method) && csrfToken)
    headers["X-CSRF-Token"] = csrfToken

  return merge(config, {
    // Default to .json format for all normal endpoints. Active Storage attachments are not served as JSON.
    url: activeStorageRegexp.test(config.url ?? "") ? config.url : `${config.url}.json`,

    baseURL: import.meta.env.VITE_BACKEND_HOST,
    headers,
    withCredentials: true
  })
})

axios.interceptors.response.use(
  (response) => {
    // Fetch new CSRF token from headers
    const csrfToken = response.headers["x-kodekalender-csrf-token"]
    if (csrfToken)
      setCsrfToken(csrfToken)

    return response
  },
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
