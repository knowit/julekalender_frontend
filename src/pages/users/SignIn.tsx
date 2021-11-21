import { FC } from "react"
import { useForm } from "react-hook-form"
import { FaApple, FaGithub, FaGoogle } from "react-icons/fa"
import { Link, useHistory } from "react-router-dom"

import { SignInParameters, useSignIn } from "../../api/users/requests"
import FormElement from "../../components/Admin/FormElement"
import Button from "../../components/Button"
import Divider from "../../components/Divider"

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

      <Divider content="Eller" />

      <div className="space-y-4 children:block text-center">
        <Link to="/">
          <Button sm><FaGithub className="inline-block mr-2" />Logg inn med GitHub</Button>
        </Link>
        <Link to="/">
          <Button sm><FaGoogle className="inline-block mr-2" />Logg inn med Google</Button>
        </Link>
        <Link to="/">
          <Button sm><FaApple className="inline-block mr-2" />Logg inn med Apple</Button>
        </Link>
      </div>
    </UserPage>
  )
}

export default SignIn
