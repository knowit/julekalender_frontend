import axios from "axios"
import { useCallback, useContext } from "react"
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "react-query"
import { find, fromPairs, isEmpty, keyBy, property } from "lodash"

import { QueryError } from "../axios"
import { AuthContext } from "../AuthContext"

import { ServiceMessage } from "./ServiceMessage"

import { ChallengeDict, Leaderboard, Like, ParentPost, Post, PostPreview, SolvedStatus, Subscriptions, Whoami } from "."



// QUERIES ---------------------------------------------------------------------

const getLikes = () => axios.get("/likes").then(({ data }) => data)
export const useLikes = () => {
  const { isFullyAuthenticated } = useContext(AuthContext)

  return useQuery<Like[], QueryError>(["likes"], getLikes, { staleTime: 60_000, enabled: isFullyAuthenticated })
}
export const usePrefetchLikes = () => {
  const { isFullyAuthenticated } = useContext(AuthContext)
  const queryClient = useQueryClient()

  return useCallback(
    () => isFullyAuthenticated && queryClient.prefetchQuery(["likes"], getLikes),
    [queryClient, isFullyAuthenticated]
  )
}

const getChallenges = () => axios.get("/challenges").then(({ data }) => keyBy(data, "door"))
export const useChallenges = () => (
  useQuery<ChallengeDict, QueryError>(["challenges"], getChallenges, { staleTime: 600_000 })
)
export const useChallenge = (door: number) => (
  useQuery<ChallengeDict, QueryError, ChallengeDict[number]>(
    ["challenges"],
    getChallenges,
    { staleTime: 600_000, select: property(door) }
  )
)

const getSolvedStatus = (): Promise<SolvedStatus> => axios.get("/users/solved").then(({ data: { solved_status } }) => fromPairs(solved_status))
export const useSolvedStatus = (opts?: UseQueryOptions<SolvedStatus, QueryError>) => {
  const { isFullyAuthenticated } = useContext(AuthContext)

  return useQuery<SolvedStatus, QueryError>(["users", "solved"], getSolvedStatus, { staleTime: 300_000, enabled: isFullyAuthenticated, ...opts })
}

const getPosts = (door: number) => axios.get(`/challenges/${door}/posts`).then(({ data }) => data)
export const usePosts = (door: number) => {
  const { isFullyAuthenticated } = useContext(AuthContext)

  return useQuery<ParentPost[], QueryError>(["posts", door], () => getPosts(door), { staleTime: 300_000, enabled: isFullyAuthenticated })
}
export const usePrefetchPosts = () => {
  const { isFullyAuthenticated } = useContext(AuthContext)
  const queryClient = useQueryClient()

  return useCallback(
    (door: number) => isFullyAuthenticated && queryClient.prefetchQuery(["posts", door], () => getPosts(door)),
    [queryClient, isFullyAuthenticated]
  )
}

const getLeaderboard = () => axios.get("/leaderboard").then(({ data }) => data)
export const useLeaderboard = () => (
  useQuery<Leaderboard, QueryError>(["leaderboard"], getLeaderboard, { staleTime: 300_000, refetchInterval: 300_000 })
)
export const usePrefetchLeaderboard = () => {
  const queryClient = useQueryClient()
  return useCallback(() => queryClient.prefetchQuery(["leaderboard"], getLeaderboard), [queryClient])
}

const getWhoami = () => axios.get("/users/whoami").then(({ data }) => data)
export const useWhoami = () => (
  useQuery<Whoami, QueryError>(["users", "whoami"], getWhoami, { staleTime: Infinity })
)

const getSubscriptions = () => axios.get("/subscriptions").then(({ data }) => data)
export const useSubscriptions = () => {
  const { isFullyAuthenticated } = useContext(AuthContext)

  return useQuery<Subscriptions, QueryError>(["subscriptions"], getSubscriptions, { enabled: isFullyAuthenticated })
}

const getServiceMessages = () => axios.get("/service_messages").then(({ data }) => data)
export const useServiceMessages = <TSelected = ServiceMessage[]>(options?: UseQueryOptions<ServiceMessage[], QueryError, TSelected>) => (
  useQuery<ServiceMessage[], QueryError, TSelected>(["serviceMessages"], getServiceMessages, { ...options, staleTime: 300_000, refetchInterval: 300_000 })
)

export const getPostPreview = async (markdownContent: string | undefined | null) => {
  if (isEmpty(markdownContent)) return

  return await axios.post("/markdown", { markdown_content: markdownContent }).then(({ data }) => data)
}
export const usePostPreview = (markdownContent: string | null | undefined) => (
  useQuery<PostPreview, QueryError>(["postPreview", markdownContent], () => getPostPreview(markdownContent), { staleTime: Infinity, cacheTime: 0 })
)



// MUTATIONS -------------------------------------------------------------------

export type CreateSolutionResponse = { solved: boolean }
export type CreateSolutionParameters = { door: number, answer: string }
export const useCreateSolution = () => {
  const queryClient = useQueryClient()

  return useMutation<CreateSolutionResponse, QueryError, CreateSolutionParameters>(
    ["solutions", "createSolution"],
    ({ door, answer }) => axios.post( `/challenges/${door}/solutions`, { solution: { answer } }).then(({ data }) => data),
    {
      onSuccess: async ({ solved }, { door }) => {
        if (solved) {
          queryClient.setQueryData(["users", "solved"], (solvedStatus: SolvedStatus | undefined) => ({ ...solvedStatus, [door]: true }))
          queryClient.invalidateQueries(["users", "solved"])
        }
      }
    }
  )
}

export type CreateLikeParameters = { postUuid: string }
export const useCreateLike = () => {
  const queryClient = useQueryClient()

  return useMutation<never, QueryError, CreateLikeParameters>(
    ["likes", "createLike"],
    ({ postUuid }) => axios.post(`/posts/${postUuid}/likes`, {}),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"])
        queryClient.invalidateQueries(["posts"])
      }
    }
  )
}

export type DeleteLikeParameters = { uuid: string }
export const useDeleteLike = () => {
  const queryClient = useQueryClient()

  return useMutation<never, QueryError, DeleteLikeParameters>(
    ["likes", "deleteLike"],
    ({ uuid }) => axios.delete(`/likes/${uuid}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"])
        queryClient.invalidateQueries(["posts"])
      }
    }
  )
}

export type CreatePostParameters = { door: number, content: string }
export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation<ParentPost, QueryError, CreatePostParameters>(
    ["posts", "createPost"],
    ({ door, content }) => axios.post(`/challenges/${door}/posts`, { post: { content } }).then(({ data }) => data),
    {
      onSuccess: (post) => {
        // Insert created post back into posts list, then refetch to ensure up-to-date data
        queryClient.setQueryData(["posts"], (posts: ParentPost[] | undefined) => [...posts ?? [], post])
      },
      onSettled: () => {
        queryClient.invalidateQueries(["posts"])
      }
    }
  )
}

export type CreateChildPostParameters = { door: number, parentUuid: string, content: string }
export const useCreateChildPost = () => {
  const queryClient = useQueryClient()

  return useMutation<Post, QueryError, CreateChildPostParameters>(
    ["posts", "createChild"],
    ({ door, parentUuid, content }) => axios.post(`/challenges/${door}/posts`, { post: { content, parent_uuid: parentUuid } }).then(({ data }) => data),
    {
      onSuccess: (post, { parentUuid }) => {
        // Insert created child post back into posts list, then refetch to ensure up-to-date data
        queryClient.setQueryData(["posts"], (posts: ParentPost[] | undefined) => {
          const parent = find(posts, { uuid: parentUuid })
          if (!parent) return posts ?? []

          const newParent: ParentPost = { ...parent, children: [...parent.children, post] }

          return [...posts ?? [], newParent]
        })
      },
      onSettled: () => {
        queryClient.invalidateQueries(["posts"])
      }
    }
  )
}

export type DeletePostParameters = { uuid: string }
export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation<never, QueryError, DeletePostParameters>(
    ["posts", "deletePost"],
    ({ uuid }) => axios.delete(`/posts/${uuid}`),
    {
      onSettled: () => queryClient.invalidateQueries(["posts"])
    }
  )
}

export type CreateSubscriptionParameters = { door: number } | { postUuid: string }
export const useCreateSubscription = () => {
  const queryClient = useQueryClient()

  return useMutation<never, QueryError, CreateSubscriptionParameters, Subscriptions>(
    ["subscriptions", "createSubscription"],
    (data) => axios.post("/subscriptions", data),
    {
      onMutate: async (subscription) => {
        await queryClient.cancelQueries(["subscriptions"])
        const subscriptions = queryClient.getQueryData<Subscriptions>(["subscriptions"])

        queryClient.setQueryData<Subscriptions>(["subscriptions"], () => [...subscriptions ?? [], { ...subscription, uuid: "" }])

        return subscriptions
      },
      onError: (_err, _vars, subscriptions) => {
        if (subscriptions)
          queryClient.setQueryData(["subscriptions"], subscriptions)
      },
      onSettled: () => {
        queryClient.invalidateQueries(["subscriptions"])
      }
    }
  )
}

export type DeleteSubscriptionParameters = { uuid: string }
export const useDeleteSubscription = () => {
  const queryClient = useQueryClient()

  return useMutation<never, QueryError, DeleteSubscriptionParameters, Subscriptions>(
    ["subscriptions", "deleteSubscription"],
    ({ uuid }) => axios.delete(`/subscriptions/${uuid}`),
    {
      onSettled: () => {
        queryClient.invalidateQueries(["subscriptions"])
      }
    }
  )
}



