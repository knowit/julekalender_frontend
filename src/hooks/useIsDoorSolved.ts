import { useSolvedStatus } from "../api/requests"


const useIsDoorSolved = (door: number) => {
  const { data } = useSolvedStatus()

  return !!data && data[door]
}

export default useIsDoorSolved
