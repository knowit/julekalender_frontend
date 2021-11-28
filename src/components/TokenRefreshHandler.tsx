import axios from "axios"
import { useEffect } from "react"
import { useQuery } from "react-query"

import { setCsrfToken } from "../axios"


// Keeps CSRF token up to date
const TokenRefreshHandler = () => {
  const { data } = useQuery<{ csrf_token: string }>(
    ["csrfToken"],
    () => axios.get("/csrf_tokens").then(({ data }) => data),
    {
      staleTime: 60_000,
      refetchInterval: 60_000
    }
  )

  useEffect(() => {
    if (data)
      setCsrfToken(data.csrf_token)
  }, [data])

  return null
}

export default TokenRefreshHandler
