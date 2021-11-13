import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "react-query"
import axios, { AxiosRequestConfig } from "axios"
import { isEmpty, isNumber, keyBy, pick, property } from "lodash"

import { QueryError } from "../../axios"
import { ParentPost } from "../Post"
import { ServiceMessage } from "../ServiceMessage"

import { AdminChallengeDict, AdminChallengePayload, ChallengePreview } from "./Challenge"
import { AdminServiceMessagePayload } from "./ServiceMessage"


const getChallenges = async () => await axios.get("/admin/challenges").then(({ data }) => keyBy(data, "door"))
export const useChallenges = <TSelected = AdminChallengeDict>(options?: UseQueryOptions<AdminChallengeDict, QueryError, TSelected>) => (
  useQuery<AdminChallengeDict, QueryError, TSelected>(["admin", "challenges"], getChallenges, { ...options, staleTime: 600_000 })
)
export const useChallenge = (door: number | null | undefined) => (
  useQuery<AdminChallengeDict, QueryError, AdminChallengeDict[number]>(
    ["admin", "challenges"],
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


export type CreateServiceMessageParameters = { service_message: AdminServiceMessagePayload }
export const useCreateServiceMessage = () => {
  const queryClient = useQueryClient()

  return useMutation<ServiceMessage, QueryError, CreateServiceMessageParameters>(
    ["admin", "serviceMessages", "create"],
    (data) => axios.post("/admin/service_messages", data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("serviceMessages")
      }
    }
  )
}

export type UpdateServiceMessageParameters = { uuid: string, service_message: AdminServiceMessagePayload }
export const useUpdateServiceMessage = () => {
  const queryClient = useQueryClient()

  return useMutation<ServiceMessage, QueryError, UpdateServiceMessageParameters>(
    ["admin", "serviceMessages", "update"],
    ({ uuid, ...data }) => axios.patch(`/admin/service_messages/${uuid}`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("serviceMessages")
      }
    }
  )
}

export type DeleteServiceMessageParameters = { uuid: string }
export const useDeleteServiceMessage = () => {
  const queryClient = useQueryClient()

  return useMutation<never, QueryError, DeleteServiceMessageParameters>(
    ["admin", "serviceMessages", "delete"],
    ({ uuid }) => axios.delete(`/admin/service_messages/${uuid}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("serviceMessages")
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
  useMutation<CreateBlobResponse, unknown, { blob: CreateBlobPayload,  config?: AxiosRequestConfig }>(
    ["admin", "activeStorage", "createBlob"],
    ({ blob, config }) =>
      axios.post("/rails/active_storage/direct_uploads", { blob }, config).then(({ data }) => data)
  )
)

type UploadFilePayload = {
  file: File
  directUpload: CreateBlobResponse["direct_upload"]
}

export const useUploadFile = () => (
  useMutation<never, unknown, { upload: UploadFilePayload, config?: AxiosRequestConfig }>(
    ["admin", "activeStorage", "uploadFile"],
    ({ upload: { file, directUpload }, config }) => axios.put(directUpload.url, file, { ...config, headers: directUpload.headers })
  )
)
