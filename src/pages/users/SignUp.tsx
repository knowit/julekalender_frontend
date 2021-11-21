import { FC } from "react"
import { useHistory } from "react-router"

import { SignUpParameters, useSignUp } from "../../api/users/requests"
import UserForm from "../../components/users/UserForm"


const SignUp: FC = () => {
  const history = useHistory()

  const { mutate: signUp, error } = useSignUp()

  const submit = (data: SignUpParameters) => {
    signUp(data, { onSuccess: () => history.push("/") })
  }

  return (
    <UserForm
      submit={submit}
      submitError={error}
      newForm
    />
  )
}

export default SignUp
