import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "react-query"
import axios from "axios"

import { QueryError } from "../../axios"

import { AdminChallenge, AdminChallengePayload, ChallengePreview } from "./Challenge"


const getChallenge = (door: number) => axios.get(`/admin/challenges/${door}`).then(({ data }) => data)
export const useChallenge = (door: number) => (
  useQuery<AdminChallenge, QueryError>(["admin", "challenges", door], () => getChallenge(door))
)

export const getChallengePreview = async (markdownContent: string | undefined | null) => {
  if (!markdownContent) return

  return await axios.post("/admin/challenge_markdown", { markdown_content: markdownContent }).then(({ data }) => data)
}
export const useChallengePreview = (markdownContent: string | undefined | null, opts?: UseQueryOptions<ChallengePreview, QueryError>) => (
  useQuery<ChallengePreview, QueryError>(["admin", "challenges", "preview", markdownContent], () => getChallengePreview(markdownContent), { staleTime: Infinity, ...opts })
)

export type UpdateChallengeParameters = { door: number, challenge: AdminChallengePayload }
export const useUpdateChallenge = () => {
  const queryClient = useQueryClient()

  return useMutation<never, QueryError, UpdateChallengeParameters>(
    ["admin", "challenges", "updateChallenge"],
    ({ door, challenge }) => axios.patch(`/admin/challenges/${door}`, { challenge }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["challenges"])
      }
    }
  )
}
