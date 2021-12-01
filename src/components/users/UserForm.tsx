import { Popover } from "@headlessui/react"
import { forEach, join, pickBy } from "lodash"
import { useEffect, useRef, VFC } from "react"
import { useForm } from "react-hook-form"
import { UseMutateAsyncFunction } from "react-query"
import { useHistory } from "react-router"
import { useDebounce } from "use-debounce"

import { LoggedInWhoami } from "../../api"
import { SignUpParameters, UpdateUserParameters, useDeleteUser } from "../../api/users/requests"
import { QueryError } from "../../axios"
import UserPage from "../../pages/users/UserPage"
import { squish } from "../../utils"
import FormElement from "../Admin/FormElement"
import FormElementCustom from "../Admin/FormElementCustom"
import Button from "../Button"
import CheckMark from "../checkmarks/CheckMark"
import FormError from "../FormError"


const DELETE_USER_CONFIRM = squish(`
  Er du sikker på at du vil slette brukeren din? Du vil ikke lenger være med i premietrekningen. Dette kan ikke reverseres.
`)

type UserFormProps = {
  user?: LoggedInWhoami
  submit: UseMutateAsyncFunction<any, any, any>
  submitError: QueryError<{ errors: Record<keyof SignUpParameters, string[]> }> | null
  newForm?: boolean
}

const UserForm: VFC<UserFormProps> = ({ user, submit, submitError, newForm = false }) => {
  const history = useHistory()

  const { register, handleSubmit, watch, setValue, reset, setError, clearErrors, formState: { isSubmitting, isSubmitSuccessful, errors, isDirty, dirtyFields } } = useForm<SignUpParameters>()

  useEffect(() => {
    if (newForm) return

    reset({ email: user?.email ?? "", username: user?.username ?? "" })
    clearErrors()
  }, [newForm, user, reset, clearErrors])

  useEffect(() => {
    forEach(submitError?.errors, (messages, key) => setError(key as any, { message: join(messages, ", ") }))
  }, [submitError, setError])

  const { mutate: doDeleteUser } = useDeleteUser()

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const avatar = watch("avatar")
  const avatarUrl = watch("avatar_url")
  const [debouncedAvatarUrl] = useDebounce(avatarUrl, 500)

  const onSubmit = (data: UpdateUserParameters) => {
    if (newForm || !dirtyFields.email || window.confirm("Du vil motta en e-post med instrukser for å re-aktivere din konto for en ny e-postadresse.")) {
      submit(
        newForm
          ? data

          // Submit only dirty data to avoid overwriting with null values
          : pickBy(data, (_value, key) => dirtyFields[key as keyof UpdateUserParameters] === true)
      )
    }
  }

  const deleteUser = () => {
    if (window.confirm(DELETE_USER_CONFIRM)) {
      doDeleteUser(null, { onSuccess: () => history.push("/") })
    }
  }

  return (
    <UserPage title={newForm ? "Ny bruker" : "Rediger bruker"} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <FormElement
          autoFocus={newForm}
          label="E-post"
          note="Innlogging og kontakt ved premiering."
          type="email"
          maxLength={128}
          className="w-full"
          {...register("email", { required: newForm })}
        />
        <FormError error={errors.email} />
        {newForm && (
          <Popover>
            <Popover.Button>
              <div className="text-opacity-30 text-gray-700">
                Jobber du i Knowit?
              </div>
            </Popover.Button>
            <Popover.Panel className="bg-gray-200 rounded p-2">
              Du vil ikke kunne delta i premietrekningen. Vennligst registrer deg med Knowit-adresse.
            </Popover.Panel>
          </Popover>
        )}

        <FormElement
          label="Passord"
          note={!newForm ? "La være blank for å beholde passord" : undefined}
          type="password"
          minLength={8}
          maxLength={128}
          labelClassName="mt-4"
          className="w-full"
          {...register("password", { required: newForm })}
        />
        <FormError error={errors.password} />

        <FormElement
          label="Bekreft passord"
          type="password"
          minLength={8}
          maxLength={128}
          labelClassName="mt-4"
          className="w-full"
          {...register("password_confirmation", { required: newForm })}
        />
        <FormError error={errors.password_confirmation} />
      </div>


      <div className="!mt-12">
        <div className="text-opacity-60 text-gray-700">
          <em>Dersom du vil delta i kommentarfeltet.<br />Brukernavnet vises i kommentarfeltet og på ledertavlen.{newForm && " Du kan endre dette senere."}</em>
        </div>
        <FormElement
          autoComplete="nickname"
          label="Brukernavn"
          type="text"
          maxLength={30}
          labelClassName="mt-1"
          className="w-full"
          {...register("username")}
        />
        <FormError error={errors.username} />

        <FormElementCustom label="Profilbilde" className="mt-4 w-full">
          <input
            ref={fileInputRef}
            className="hidden"
            type="file"
            accept="image/*"
            onChange={(e) => {
              clearErrors("avatar")

              const file = e.target.files?.[0]
              if (!file) return

              if (file.size > 2 * 1024 * 1024) {
                setError("avatar", { message: "for stort" })
                return
              }

              setValue("avatar", file, { shouldDirty: true })
            }}
          />
          <Button
            className="block h-12 max-w-full line-clamp-1 form-input"
            type="button"
            underline={false}
            content={avatar ? avatar.name : "Velg bilde (maks 2MB)"}
            onClick={() => fileInputRef.current?.click()}
          />
          <FormError error={errors.avatar} />
        </FormElementCustom>
        <input
          type="url"
          maxLength={256}
          placeholder="... eller oppgi URL"
          className="mt-1 form-input w-full"
          {...register("avatar_url")}
        />
        {(avatar || debouncedAvatarUrl || user?.avatar) && (
          <img className="my-2 w-avatar" src={debouncedAvatarUrl || (avatar && URL.createObjectURL(avatar)) || user?.avatar || ""} />
        )}
        <FormError error={errors.avatar_url} />
      </div>


      {!newForm && isDirty && !isSubmitting && isSubmitSuccessful && !submitError && <CheckMark wrapperClassName="mx-auto w-16" message="Lagret!" />}
      <Button type="submit" disabled={!isDirty || isSubmitting} underline={false} className="mt-8 block mx-auto" content={newForm ? "Opprett bruker" : "Lagre"} />
      {!newForm && <Button type="button" onClick={deleteUser} underline={false} className="mt-4 block mx-auto text-red-700" content="Slett bruker" />}
    </UserPage>
  )
}

export default UserForm
