import axios, { AxiosResponse } from "axios"
import { useCallback, useMemo } from "react"
import { MutationKey, QueryKey, useMutation, UseMutationOptions, useQuery, useQueryClient, UseQueryOptions, UseQueryResult } from "react-query"
import { find } from "lodash"

import { QueryError } from "../axios"

import { Challenge, Leaderboard, Like, ParentPost, Post, SolvedStatus, Subscriptions, Whoami } from "."


// Easy interface for creating request and prefetch functions with token injected into options
const createKalenderQueryHooks = <
  TResult,
  TArgs extends unknown[] = unknown[],
  TError = QueryError
>(
  queryKeyGen: (...args: TArgs) => QueryKey,
  requestGen: (...args: TArgs) => Promise<AxiosResponse<TResult>>,
  opts?: UseQueryOptions<TResult, TError>
): [
  (...args: TArgs) => UseQueryResult<TResult, TError>,
  () => (...args: TArgs) => void
] => {
  const request = (...args: TArgs) => () => requestGen(...args).then(({ data }) => data)

  return [
    /*
     * Gets query key and request according to given generator functions and
     * calls to useQuery for simple usage in components without having to write
     * request handling and options every time, and no need to ensure correct
     * query key is used. If same request is used in multiple components, will
     * reuse data from cache because the query keys will be the same.
     *
     * e.g.
     * const fc = () => {
     *   const { data: whoami } = useWhoami()
     *   return <span>{whoami.nickname}</span>
     * }
     */
    (...args: TArgs) => {
      const queryKey = useMemo(() => queryKeyGen(...args), [...args])

      return useQuery<TResult, TError>(queryKey, request(...args), opts)
    },

    /*
     * Same as above, but returns a prefetcher-function. App feels very smooth
     * in use if links to use a given resource has the data prefetched already
     * on `onMouseEnter`.
     */
    () => {
      const queryClient = useQueryClient()

      return useCallback((...args: TArgs) => {
        queryClient.prefetchQuery(queryKeyGen(...args), request(...args))
      }, [queryClient])
    }
  ]
}

/* eslint-disable array-bracket-spacing */
export const [useLikes,         usePrefetchLikes        ] = createKalenderQueryHooks<Like[]>(() => ["likes"], () => axios.get("/likes"), { staleTime: 60_000 })
export const [useChallenge,     usePrefetchChallenge    ] = createKalenderQueryHooks<Challenge, [number]>((door) => ["challenges", door], (door) => axios.get(`/challenges/${door}`), { staleTime: 600_000 })
export const [useSolvedStatus,  usePrefetchSolvedStatus ] = createKalenderQueryHooks<SolvedStatus>(() => ["solvedStatus"], () => axios.get("/challenges/solved"))
export const [usePosts,         usePrefetchPosts        ] = createKalenderQueryHooks<ParentPost[], [number]>((door) => ["posts", door], (door) => axios.get(`/challenges/${door}/posts`), { staleTime: 300_000 })
export const [useLeaderboard,   usePrefetchLeaderboard  ] = createKalenderQueryHooks<Leaderboard>(() => ["leaderboard"], () => axios.get("/leaderboard"), { staleTime: 300_000 })
export const [useWhoami,        usePrefetchWhoami       ] = createKalenderQueryHooks<Whoami>(() => ["whoami"], () => axios.get("/users/whoami"))
export const [useSubscriptions, usePrefetchSubscriptions] = createKalenderQueryHooks<Subscriptions>(() => ["subscriptions"], () => axios.get("/subscriptions"))


// Passes through arguments to useMutation, but sets some sensible default types
// and unwraps data from response.
const useKalenderMutation = <
  TResult = never,
  TVariables = unknown,
  TContext = TResult,
  TError = QueryError
>(
  mutationKey: MutationKey,
  request: (data: TVariables) => Promise<AxiosResponse<TResult>>,
  opts?: UseMutationOptions<TResult, TError, TVariables, TContext>
) => (
  useMutation<TResult, TError, TVariables, TContext>(mutationKey, (data) => request(data).then(({ data }) => data), opts)
)

export type CreateSolutionResponse = { solved: boolean }
export type CreateSolutionParameters = { door: number, answer: string }
export const useCreateSolution = () => {
  const queryClient = useQueryClient()

  return useKalenderMutation<CreateSolutionResponse, CreateSolutionParameters>(
    ["solutions", "createSolution"],
    ({ door, answer }) => axios.post( `/challenges/${door}/solutions`, { solution: { answer } }),
    {
      onSuccess: async ({ solved }, { door }) => {
        if (solved) {
          queryClient.setQueryData(["solvedStatus"], (solvedStatus: SolvedStatus | undefined) => ({ ...solvedStatus, [door]: true }))
          queryClient.invalidateQueries(["solvedStatus"])
        }
      }
    }
  )
}

export type CreateLikeParameters = { postUuid: string }
export const useCreateLike = () => {
  const queryClient = useQueryClient()

  return useKalenderMutation<never, CreateLikeParameters, Like[]>(
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

  return useKalenderMutation<never, DeleteLikeParameters, Like[]>(
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

  return useKalenderMutation<ParentPost, CreatePostParameters>(
    ["posts", "createPost"],
    ({ door, content }) => axios.post(`/challenges/${door}/posts`, { post: { content } }),
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

  return useKalenderMutation<Post, CreateChildPostParameters>(
    ["posts", "createChild"],
    ({ door, parentUuid, content }) => axios.post(`/challenges/${door}/posts`, { post: { content, parent_uuid: parentUuid } }),
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

  return useKalenderMutation<never, DeletePostParameters>(
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

  return useKalenderMutation<never, CreateSubscriptionParameters, Subscriptions>(
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

  return useKalenderMutation<never, DeleteSubscriptionParameters, Subscriptions>(
    ["subscriptions", "deleteSubscription"],
    ({ uuid }) => axios.delete(`/subscriptions/${uuid}`),
    {
      onSettled: () => {
        queryClient.invalidateQueries(["subscriptions"])
      }
    }
  )
}
