import { some } from "lodash"

import { useServiceMessages } from "../api/requests"


const useHasUnresolvedServiceMessage = () => {
  const { data: serviceMessages } = useServiceMessages()

  return some(serviceMessages, { resolved_at: null })
}

export default useHasUnresolvedServiceMessage
