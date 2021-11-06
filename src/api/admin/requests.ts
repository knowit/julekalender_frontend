import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "react-query"
import axios from "axios"
import { isEmpty, isNumber, keyBy, pick, property } from "lodash"

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

export const getChallengePreview = async (challenge: AdminChallengePayload | undefined) => {
  challenge = pick(challenge, ["markdown_content", "files"])
  if (isEmpty(challenge)) return

  return await axios.post("/admin/challenge_markdown", { challenge }).then(({ data }) => data)
}
export const useChallengePreview = (challenge: AdminChallengePayload | undefined, opts?: UseQueryOptions<ChallengePreview, QueryError>) => (
  useQuery<ChallengePreview, QueryError>(["admin", "challenges", "preview", challenge], () => getChallengePreview(challenge), { staleTime: Infinity, cacheTime: 0, ...opts })
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
        queryClient.invalidateQueries(["admin", "challenges"])
      }
    }
  )
}


// File upload procedure copied from https://github.com/rails/rails/issues/32208#issuecomment-383737803
type CreateBlobPayload = {
  filename: string
  content_type: string
  byte_size: number
  checksum: string
}

type CreateBlobResponse = {
  // Signed ID of the blob stored in ActiveStorage. We need this to submit with the challenge data.
  signed_id: string

  // URL and headers for direct upload of file
  direct_upload: {
    url: string
    headers: any
  }
}

export const useCreateBlob = () => (
  useMutation<CreateBlobResponse, unknown, CreateBlobPayload>(
    ["admin", "activeStorage", "createBlob"],
    (blob) =>
      axios.post("/rails/active_storage/direct_uploads", { blob }).then(({ data }) => data)
  )
)

type UploadFilePayload = {
  file: File
  directUpload: CreateBlobResponse["direct_upload"]
}

export const useUploadFile = () => (
  useMutation<never, unknown, UploadFilePayload>(
    ["admin", "activeStorage", "uploadFile"],
    ({ file, directUpload }) => axios.put(directUpload.url, file, { headers: directUpload.headers })
  )
)
