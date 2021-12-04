import { FC } from "react"

import { useSignUp } from "../../api/users/requests"
import UserForm from "../../components/users/UserForm"


const SignUp: FC = () => {
  const { mutateAsync: signUp, error } = useSignUp()

  return (
    <UserForm
      submit={signUp}
      submitError={error}
      newForm
    />
  )
}

export default SignUp
