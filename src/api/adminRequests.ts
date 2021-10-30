import { useMutation, useQuery, useQueryClient } from "react-query"
import axios from "axios"

import { QueryError } from "../axios"

import { AdminChallenge, ChallengePreview } from "."


const getChallenge = (door: number) => axios.get(`/admin/challenges/${door}`).then(({ data }) => data)
export const useChallenge = (door: number) => (
  useQuery<AdminChallenge, QueryError>(["adminChallenge", door], () => getChallenge(door))
)

export const getChallengePreview = (markdownContent: string) => axios.post("/admin/challenge_markdown", { markdown_content: markdownContent }).then(({ data }) => data)
export const useChallengePreview = (markdownContent: string) => (
  useQuery<ChallengePreview, QueryError>(["challengePreview", markdownContent], () => getChallengePreview(markdownContent), { staleTime: Infinity })
)

export type UpdateChallengeParameters = { challenge: AdminChallenge }
export const useUpdateChallenge = () => {
  const queryClient = useQueryClient()

  return useMutation<never, QueryError, UpdateChallengeParameters>(
    ["admin", "challenges", "updateChallenge"],
    ({ challenge }) => axios.patch(`/admin/challenges/${challenge.door}`, { challenge }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["admin", "challenges"])
      }
    }
  )
}
