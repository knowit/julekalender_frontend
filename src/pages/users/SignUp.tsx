import { FC } from "react"
import { useHistory } from "react-router"

import { SignUpParameters, useSignUp } from "../../api/users/requests"
import Button from "../../components/Button"
import UserForm from "../../components/users/UserForm"

import UserPage from "./UserPage"


const SignUp: FC = () => {
  const history = useHistory()

  const { mutate: signUp, isLoading, isSuccess, error } = useSignUp()

  const submit = (data: SignUpParameters) => {
    signUp(data)
  }

  if (isSuccess) {
    return (
      <UserPage title="Bruker opprettet">
        <p className="text-center">
          Du vil snart motta en e-post med instrukser for å aktivere din konto.
        </p>
        <p className="text-center">
          Du vil kunne delta i kalenderen allerede nå, men du vil ikke være med
          i premietrekningen og du synes ikke på ledertavlen dersom du ikke
          aktiverer din konto.
        </p>
        <Button className="block mx-auto" onClick={() => history.push("/")} content="Gå til lukene" />
      </UserPage>
    )
  }


  return (
    <UserForm
      submit={submit}
      submitError={error}
      newForm
      isSubmitting={isLoading}
    />
  )
}

export default SignUp
