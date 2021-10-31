import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "react-query"
import axios from "axios"
import { isEmpty, isNumber, keyBy, property } from "lodash"

import { QueryError } from "../../axios"
import { ChallengeDict } from "../Challenge"
import { ParentPost } from "../Post"

import { AdminChallengeDict, AdminChallengePayload, ChallengePreview } from "./Challenge"


const getChallenges = async () => await axios.get("/admin/challenges").then(({ data }) => keyBy(data, "door"))
export const useChallenges = () => (
  useQuery<ChallengeDict, QueryError>(["admin", "challenges"], getChallenges, { staleTime: 600_000 })
)
export const useChallenge = (door: number | null | undefined) => (
  useQuery<AdminChallengeDict, QueryError, AdminChallengeDict[number]>(
    ["challenges", door],
    getChallenges,
    { staleTime: 600_000, select: door ? property(door) : undefined }
  )
)

const getPosts = (door: number) => axios.get(`/admin/challenges/${door}/posts`).then(({ data }) => data)
export const usePosts = (door: number) => useQuery<ParentPost[], QueryError>(["admin", "posts", door], () => getPosts(door), { staleTime: 300_000 })

export const getChallengePreview = async (markdownContent: string | undefined | null) => {
  if (isEmpty(markdownContent)) return

  return await axios.post("/admin/challenge_markdown", { markdown_content: markdownContent }).then(({ data }) => data)
}
export const useChallengePreview = (markdownContent: string | undefined | null, opts?: UseQueryOptions<ChallengePreview, QueryError>) => (
  useQuery<ChallengePreview, QueryError>(["admin", "challenges", "preview", markdownContent], () => getChallengePreview(markdownContent), { staleTime: Infinity, cacheTime: 0, ...opts })
)

export type CreateChallengeParameters = { challenge: AdminChallengePayload }
export const useCreateChallenge = () => {
  const queryClient = useQueryClient()

  return useMutation<never, QueryError, CreateChallengeParameters>(
    ["admin", "challenges", "create"],
    ({ challenge }) => axios.post("/admin/challenges", { challenge }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("challenges")
        queryClient.invalidateQueries(["admin", "challenges"])
      }
    }
  )
}

export type UpdateChallengeParameters = { challenge: AdminChallengePayload }
export const useUpdateChallenge = () => {
  const queryClient = useQueryClient()

  return useMutation<never, QueryError, UpdateChallengeParameters>(
    ["admin", "challenges", "update"],
    ({ challenge }) => axios.patch(`/admin/challenges/${challenge.door}`, { challenge }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("challenges")
        queryClient.invalidateQueries(["admin", "challenges"])
      }
    }
  )
}

export type DeleteChallengeParameters = { door: number | undefined }
export const useDeleteChallenge = () => {
  const queryClient = useQueryClient()

  return useMutation<unknown, QueryError, DeleteChallengeParameters>(
    ["admin", "challenges", "destroy"],
    async ({ door }) => isNumber(door) && axios.delete(`/admin/challenges/${door}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("challenges")
        // Don't invalidate admin challenges. This will trigger a re-fetch of the just deleted resource. Some race condition somewhere.
      }
    }
  )
}
