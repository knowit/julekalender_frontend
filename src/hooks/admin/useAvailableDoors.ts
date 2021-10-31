import { reject, range, has } from "lodash"

import { useChallenges } from "../../api/admin/requests"


const useAvailableDoors = () => {
  const { data: challenges } = useChallenges()

  return reject(range(1, 25), (door) => has(challenges, door))
}

export default useAvailableDoors
