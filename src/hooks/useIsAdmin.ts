import { useWhoami } from "../api/users/requests"


export const useIsAdmin = () => {
  const { data: whoami } = useWhoami()

  return !!whoami?.is_admin
}
