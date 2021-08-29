import { useAuth0 } from "@auth0/auth0-react"
import { useContext } from "react"

import { Context as RequestsContext } from "../RequestsContext"


// The single source of truth for authentication and API behavior. All usage of
// Auth0 should go through here, to ensure that the same `isAuthenticated` (the
// one which ensures a valid token is active to prevent double-rendering when it
// is initialized) is used throughout the app.
const useRequestsAndAuth = () => {
  const { loginWithRedirect, logout, user } = useAuth0()
  const { isAdmin, setIsAdmin, currentUser, isFullyAuthenticated, ...requests } = useContext(RequestsContext)

  const isLocalhost = window.location.hostname === "localhost"

  return {
    loginWithRedirect,
    logout,
    isAuthenticated: isFullyAuthenticated,
    isAdmin,
    setIsAdmin,
    currentUser,
    isLocalhost,
    user,
    ...requests
  }
}

export default useRequestsAndAuth
