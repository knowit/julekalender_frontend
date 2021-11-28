import { useContext } from "react"
import { FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"

import { useWhoami } from "../api/users/requests"
import { AuthContext } from "../AuthContext"

import Button from "./Button"


const SignInButton = () => {
  const { isAuthenticated } = useContext(AuthContext)
  const { data: whoami } = useWhoami()

  const to = isAuthenticated && whoami ? "/users/edit" : "/users/sign_in"
  const content = isAuthenticated && whoami ? <span><FaUser className="inline-block mr-2 -mt-1" />{whoami.username ?? "Min bruker"}</span>: "Logg inn"

  return (
    <Link to={to}>
      <Button tabIndex={3} content={content} />
    </Link>
  )
}

export default SignInButton
