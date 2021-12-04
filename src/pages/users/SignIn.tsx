import { FC } from "react"
import { useForm } from "react-hook-form"
import { Link, useHistory } from "react-router-dom"

import { SignInParameters, useSignIn } from "../../api/users/requests"
import FormElement from "../../components/form/FormElement"
import Button from "../../components/Button"

import UserPage from "./UserPage"


const SignIn: FC = () => {
  const history = useHistory()

  const { register, handleSubmit, watch } = useForm<SignInParameters>()
  const { mutate: signIn, error } = useSignIn()

  const onSubmit = (data: SignInParameters) => {
    signIn(data, { onSuccess: () => history.push("/") })
  }

  const email = watch("email")

  return (
    <UserPage title="Logg inn" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <FormElement
          autoFocus
          label="E-post"
          type="email"
          className="w-full"
          {...register("email")}
        />
        <FormElement
          label="Passord"
          type="password"
          labelClassName="mt-4"
          className="w-full"
          {...register("password")}
        />

        {error && <div><em className="text-red-700">{error.error}</em></div>}

        <Button type="submit" className="mt-6 block mx-auto" content="Logg inn" />

        <Link to="/users/sign_up" className="mt-6 block text-center">
          <Button type="button" sm content="Ny bruker?" />
        </Link>
        <Link to={`/users/lost_password?email=${encodeURIComponent(email ?? "")}`} className="mt-2 block text-center">
          <Button type="button" sm content="Glemt passord?" />
        </Link>
      </div>
    </UserPage>
  )
}

export default SignIn
