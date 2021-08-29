import { createContext, Dispatch, FC, ReactChild, SetStateAction, useEffect, useMemo, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { constant, noop } from "lodash"

import {
  Token,
  createComment,
  createChildComment,
  createLike,
  createSolution,
  fetchChallenge,
  fetchComments,
  fetchSingleComment,
  fetchLikes,
  fetchSolvedStatus,
  fetchLeaderboard,
  fetchAdminStatus,
  fetchWhoami,
  deleteComment
} from "./api/requests"
import { CurrentUser } from "./api/User"


// While these can take an undefined token, what's returned from the API with an
// undefined token might be complete garbage.
const createRequests = (token: Token) => ({
  fetchLikes: fetchLikes(token),
  fetchChallenge: fetchChallenge(token),
  fetchSolvedStatus: fetchSolvedStatus(token),
  createSolution: createSolution(token),
  createLike: createLike(token),
  createComment: createComment(token),
  createChildComment: createChildComment(token),
  fetchComments: fetchComments(token),
  fetchSingleComment: fetchSingleComment(token),
  deleteComment: deleteComment(token),
  fetchAdminStatus: fetchAdminStatus(token),
  fetchWhoami: fetchWhoami(token),
  fetchLeaderboard
})

type IRequestsContext = {
  isAdmin: boolean
  setIsAdmin: Dispatch<SetStateAction<boolean>>
  currentUser: CurrentUser
  isFullyAuthenticated: boolean
} & ReturnType<typeof createRequests>

export const Context = createContext<IRequestsContext>({
  isAdmin: false,
  setIsAdmin: constant(true),
  currentUser: { uuid: "" },
  isFullyAuthenticated: false,
  ...createRequests(undefined)
})

type RequestsContextProps = {
  children: ReactChild
}

const RequestsContext: FC<RequestsContextProps> = ({ children }) => {
  const {
    isAuthenticated,
    getAccessTokenSilently,
    getIdTokenClaims
  } = useAuth0()
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<CurrentUser>({ uuid: "" })
  const [token, setToken] = useState<string>()

  const isFullyAuthenticated = useMemo(
    () => isAuthenticated && token !== undefined && token.length > 1,
    [isAuthenticated, token]
  )

  useEffect(() => {
    const getToken = async () => {
      if (!isAuthenticated) return

      await getAccessTokenSilently()
      // getIdTokenClaims uses access token from surrounding context.
      const claims = await getIdTokenClaims()
      setToken(claims.__raw)
    }

    getToken()
  }, [isAuthenticated, getAccessTokenSilently, getIdTokenClaims, setToken])

  const requests = useMemo(() => createRequests(token), [token])

  useEffect(() => {
    if (!isFullyAuthenticated) return

    requests.fetchAdminStatus()
      .then((response) => setIsAdmin(response.data.admin))
      .catch(() => setIsAdmin(false))

    requests.fetchWhoami()
      .then((response) => setCurrentUser(response.data.user))
      .catch(noop)
  }, [isFullyAuthenticated, requests, setIsAdmin, setCurrentUser])


  return (
    <Context.Provider value={{ isAdmin, setIsAdmin, currentUser, isFullyAuthenticated, ...requests }}>
      {children}
    </Context.Provider>
  )
}

export default RequestsContext
