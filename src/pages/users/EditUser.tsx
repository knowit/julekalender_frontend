import { VFC } from "react"

import { useUpdateUser, useWhoami } from "../../api/users/requests"
import UserForm from "../../components/users/UserForm"


const EditUser: VFC = () => {
  const { data: whoami, isLoading } = useWhoami()
  const { mutateAsync: updateUser, error } = useUpdateUser()

  if (isLoading || !whoami || whoami.is_guest) return null

  return (
    <UserForm
      user={whoami}
      submit={updateUser}
      submitError={error}
    />
  )
}

export default EditUser
