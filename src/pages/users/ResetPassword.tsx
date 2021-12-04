import { forEach, join } from "lodash"
import { useEffect, VFC } from "react"
import { useForm } from "react-hook-form"
import { useLocation } from "react-router"

import { ResetPasswordParameters, useResetPassword } from "../../api/users/requests"
import FormElement from "../../components/form/FormElement"
import Button from "../../components/Button"
import FormError from "../../components/form/FormError"

import UserPage from "./UserPage"


const ResetPassword: VFC = () => {
  const { search } = useLocation()
  const paramMatch = search.match(/reset_password_token=(?<resetPasswordToken>\S+)/)?.groups

  const { register, handleSubmit, setValue, setError, formState: { errors, isSubmitSuccessful } } = useForm<ResetPasswordParameters>()
  const { mutate: resetPassword, error, isLoading } = useResetPassword()
  useEffect(() => {
    forEach(error?.errors, (messages, key) => setError(key as any, { message: join(messages, ", ") }))
  }, [error, setError])

  useEffect(() => {
    setValue("reset_password_token", paramMatch?.resetPasswordToken ?? "")
  }, [setValue, paramMatch])

  const onSubmit = (data: ResetPasswordParameters) => {
    resetPassword(data)
  }

  if (isSubmitSuccessful && !isLoading &&!error) {
    return (
      <UserPage title="Passord tilbakestilt">
        <div className="text-center">Du kan nå logge inn med ditt nye passord.</div>
      </UserPage>
    )
  }

  return (
    <UserPage title="Tilbakestill passord" onSubmit={handleSubmit(onSubmit)}>
      <FormElement
        label="Passord"
        type="password"
        labelClassName="mt-4"
        className="w-full"
        {...register("password", { required: true })}
      />
      <FormError error={errors.password} />

      <FormElement
        label="Bekreft passord"
        type="password"
        labelClassName="mt-4"
        className="w-full"
        {...register("password_confirmation", { required: true })}
      />
      <FormError error={errors.password_confirmation} />

      <Button type="submit" className="block mx-auto" content="Tilbakestill passord" />
    </UserPage>
  )
}

export default ResetPassword
