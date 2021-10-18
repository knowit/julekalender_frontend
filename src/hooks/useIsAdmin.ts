import { useWhoami } from "../api/requests"


export const useIsAdmin = () => {
  const { data: whoami } = useWhoami()

  return !!whoami?.is_admin
}
