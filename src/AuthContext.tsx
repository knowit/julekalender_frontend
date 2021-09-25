import { createContext, FC, ReactChild, useEffect, useMemo, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { isEmpty } from "lodash"


type AuthContextType = {
  isFullyAuthenticated: boolean
  token: string | undefined
}

export const AuthContext = createContext<AuthContextType>({
  isFullyAuthenticated: false,
  token: undefined
})

type RequestsContextProps = {
  children: ReactChild
}

const AuthContextProvider: FC<RequestsContextProps> = ({ children }) => {
  const {
    isAuthenticated,
    getAccessTokenSilently,
    getIdTokenClaims
  } = useAuth0()
  const [token, setToken] = useState<string>()

  const isFullyAuthenticated = useMemo(
    () => isAuthenticated && !isEmpty(token),
    [isAuthenticated, token]
  )

  useEffect(() => {
    const getToken = async () => {
      if (!isAuthenticated) return

      await getAccessTokenSilently()
      // getIdTokenClaims uses access token from surrounding context.
      const claims = await getIdTokenClaims()

      // TODO: Probably shouldn't use raw token value
      setToken(claims.__raw)
    }

    getToken()
  }, [isAuthenticated, getAccessTokenSilently, getIdTokenClaims, setToken])

  return (
    <AuthContext.Provider value={{ isFullyAuthenticated, token }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
