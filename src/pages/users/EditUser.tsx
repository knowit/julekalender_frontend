import { VFC } from "react"

import { UpdateUserParameters, useUpdateUser, useWhoami } from "../../api/users/requests"
import UserForm from "../../components/users/UserForm"


const EditUser: VFC = () => {
  const { data: whoami, isLoading } = useWhoami()
  const { mutate: updateUser, isLoading: isSubmitting, isSuccess, error } = useUpdateUser()

  const submit = (data: UpdateUserParameters) => {
    updateUser(data)
  }

  if (isLoading || !whoami || whoami.is_guest) return null

  return (
    <UserForm
      user={whoami}
      submit={submit}
      submitError={error}
      isSubmitting={isSubmitting}
      isSuccess={isSuccess}
    />
  )
}

export default EditUser
