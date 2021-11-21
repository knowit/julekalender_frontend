import { VFC } from "react"

import { UpdateUserParameters, useUpdateUser, useWhoami } from "../../api/users/requests"
import UserForm from "../../components/users/UserForm"


const EditUser: VFC = () => {
  const { data: whoami, isLoading } = useWhoami()
  const { mutate: updateUser, error } = useUpdateUser()

  const submit = (data: UpdateUserParameters) => {
    updateUser(data)
  }

  if (isLoading || !whoami || whoami.is_guest) return null

  return (
    <UserForm
      user={whoami}
      submit={submit}
      submitError={error}
    />
  )
}

export default EditUser
