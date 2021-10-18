import axios from "axios"
import { isEmpty, set } from "lodash"
import { useContext, useEffect, useState } from "react"
import { useQueryClient } from "react-query"

import { AuthContext } from "../AuthContext"


// Handles react-query reset on token refresh
const TokenRefreshHandler = () => {
  const queryClient = useQueryClient()
  const { token: contextToken } = useContext(AuthContext)

  const [[lastToken, token], setToken] = useState<[string | undefined, string | undefined]>([undefined, undefined])

  useEffect(() => {
    setToken(([_, lastToken]) => [lastToken, contextToken])
  }, [contextToken])

  // Wipe all query data when token is first set (goes from undefined or "" to
  // an actual token). Token refreshes and rotations should not cause re-fetch
  // of all data.
  useEffect(() => {
    if (isEmpty(lastToken) && !isEmpty(token)) {
      // Set authorization header globally for all axios requests
      axios.interceptors.request.use((config) => (
        set(config, "headers.Authorization", token)
      ))

      queryClient.cancelQueries(["solvedStatus"])
      queryClient.cancelQueries(["likes"])
      queryClient.cancelQueries(["posts"])
      queryClient.cancelQueries(["whoami"])
      queryClient.invalidateQueries(["solvedStatus"])
      queryClient.invalidateQueries(["likes"])
      queryClient.invalidateQueries(["posts"])
      queryClient.invalidateQueries(["whoami"])
    }
  }, [queryClient, lastToken, token])

  return null
}

export default TokenRefreshHandler
