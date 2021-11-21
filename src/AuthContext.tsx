import { createContext, FC } from "react"

import { useWhoami } from "./api/users/requests"


type AuthContextType = {
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false
})

const AuthContextProvider: FC = ({ children }) => {
  const { data: whoami } = useWhoami()

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!whoami && !whoami.is_guest }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
