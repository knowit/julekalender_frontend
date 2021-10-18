import { useAuth0 } from "@auth0/auth0-react"

import Button from "./Button"


const LoginButton = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0()

  const [onClick, content] = isAuthenticated
    ? [() => logout({ returnTo: window.location.origin }), "Logg ut"]
    : [() => loginWithRedirect(), "Logg inn"]

  return <Button tabIndex={3} onClick={onClick}>{content}</Button>
}

export default LoginButton
