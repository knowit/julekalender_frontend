import { useContext } from "react"
import { useHistory } from "react-router"

import { useSignOut } from "../api/users/requests"
import { AuthContext } from "../AuthContext"

import Button from "./Button"


const SignOutButton = () => {
  const history = useHistory()

  const { isAuthenticated } = useContext(AuthContext)
  const { mutate: signOut } = useSignOut()

  if (!isAuthenticated) return null

  return (
    <Button
      tabIndex={4}
      onClick={() => signOut(null, { onSuccess: () => history.push("/") })}
      content="Logg ut"
    />
  )
}

export default SignOutButton
