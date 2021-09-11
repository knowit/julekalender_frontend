import Axios from "axios"

import { CreatePostPayload, ParentPost, Post } from "./Post"
import Like from "./Like"
import Challenge, { SolvedStatus } from "./Challenge"
import { CreateLikePayload, CreateSolutionPayload, CreateSolutionResponse } from "./Solution"
import Leaderboard from "./Leaderboard"
import AdminStatus from "./admin"
import { Whoami } from "./User"


const apiUrl = import.meta.env.VITE_BACKEND_HOST
const requestHeaders = { "Content-Type": "application/json" }
const getHeaders = (token: Token) => (
  token ? { ...requestHeaders, "Authorization": token } : requestHeaders
)

export type Token = string | undefined

// TODO: Type endpoint with template string type?
const baseFetch = <T>(endpoint: string, token: Token = undefined) => (
  Axios.get<T>(`${apiUrl}${endpoint}`, { headers: getHeaders(token) })
)

const baseDelete = <T>(endpoint: string, token: Token = undefined) => (
  Axios.delete<T>(`${apiUrl}${endpoint}`, { headers: getHeaders(token) })
)

type CreatePayload = CreateSolutionPayload | CreateLikePayload | CreatePostPayload

const baseCreate = <T>(endpoint: string, payload: CreatePayload, token: Token) => (
  Axios.post<T>(`${apiUrl}${endpoint}`, payload, { headers: getHeaders(token) })
)

export const fetchLikes = (token: Token) => () => (
  baseFetch<Like[]>("/likes", token)
)

export const fetchChallenge = (token: Token) => (doorNumber: number | string) => (
  baseFetch<Challenge>(`/challenges/${doorNumber}`, token)
)

export const fetchSolvedStatus = (token: Token) => () => (
  baseFetch<SolvedStatus>("/challenges/solved", token)
)

export const createSolution = (token: Token) => (challenge_door: number | string, answer: string) => (
  baseCreate<CreateSolutionResponse>(`/challenges/${challenge_door}/solutions`, { "solution": { "answer": answer } }, token)
)

export const createLike = (token: Token) => (postId: number | string) => (
  baseCreate<never>(`/posts/${postId}/likes`, {}, token)
)

export const createPost = (token: Token) => (doorNumber: string | number, post: string) => (
  baseCreate<ParentPost>(`/challenges/${doorNumber}/posts`, { post: { content: post } }, token)
)

export const createChildPost = (token: Token) => (doorNumber: string | number, post: string, parentId: string) => (
  baseCreate<Post>(`/challenges/${doorNumber}/posts`, { post: { content: post, parent_uuid: parentId } }, token)
)

export const fetchPosts = (token: Token) => (doorNumber: number | string) => (
  baseFetch<ParentPost[]>(`/challenges/${doorNumber}/posts`, token)
)

export const fetchSinglePost = (token: Token) => (doorNumber: number | string, postId: string) => (
  baseFetch<ParentPost>(`/challenges/${doorNumber}/posts/${postId}`, token)
)

export const deletePost = (token: Token) => (postId: string) => (
  baseDelete<never>(`/posts/${postId}`, token)
)

export const fetchLeaderboard = () => (
  baseFetch<Leaderboard>("/leaderboard")
)

export const fetchAdminStatus = (token: Token) => () => (
  baseFetch<AdminStatus>("/users/admin", token)
)

export const fetchWhoami = (token: Token) => () => (
  baseFetch<Whoami>("/users/whoami", token)
)

