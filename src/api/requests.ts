import Axios from 'axios';

import { CreateCommentPayload, ParentComment, Comment } from './Comment';
import Like from './Like';
import Challenge, { SolvedStatus } from './Challenge';
import { CreateLikePayload, CreateSolutionPayload, CreateSolutionResponse } from './Solution';
import Leaderboard from './Leaderboard';
import { AdminStatus } from './admin';
import { Whoami } from './User';

const apiUrl = 
  (process.env.REACT_APP_BACKEND_HOST !== undefined)
    ? process.env.REACT_APP_BACKEND_HOST
    : (window.location.hostname === 'julekalender.knowit.no'
      ? 'https://julekalender-backend.knowit.no'
      : 'https://***REMOVED***');
const requestHeaders = { "Content-Type": "application/json" };
const getHeaders = (token: Token) => (
  token ? { ...requestHeaders, "Authorization": token } : requestHeaders
);

export type Token = string | undefined;

// TODO: Type endpoint with template string type?
const baseFetch = <T>(endpoint: string, token: Token = undefined) => (
  Axios.get<T>(`${apiUrl}${endpoint}`, { headers: getHeaders(token) })
);

const baseDelete = <T>(endpoint: string, token: Token = undefined) => (
  Axios.delete<T>(`${apiUrl}${endpoint}`, { headers: getHeaders(token) })
);

type CreatePayload = CreateSolutionPayload | CreateLikePayload | CreateCommentPayload;

const baseCreate = <T>(endpoint: string, payload: CreatePayload, token: Token) => {
  return Axios.post<T>(`${apiUrl}${endpoint}`, payload, { headers: getHeaders(token) });
};

export const fetchLikes = (token: Token) => () => (
  baseFetch<Like[]>('/likes', token)
);

export const fetchChallenge = (token: Token) => (doorNumber: number | string) => (
  baseFetch<Challenge>(`/challenges/${doorNumber}`, token)
);

export const fetchSolvedStatus = (token: Token) => () => (
  baseFetch<SolvedStatus>('/challenges/solved', token)
);

export const createSolution = (token: Token) => (challenge_door: number | string, answer: string) => (
  baseCreate<CreateSolutionResponse>(`/challenges/${challenge_door}/solutions`, { "solution": { "answer": answer } }, token)
);

export const createLike = (token: Token) => (postId: number | string) => (
  baseCreate<never>(`/posts/${postId}/likes`, {}, token)
);

export const createComment = (token: Token) => (doorNumber: number, comment:string) => {
  return baseCreate<ParentComment>(`/challenges/${doorNumber}/posts`, { post: { content: comment }} , token)
};

export const createChildComment = (token: Token) => (doorNumber: number, comment:string, parentId: string,) => {
  return baseCreate<Comment>(`/challenges/${doorNumber}/posts`, { post: { content: comment, parent_uuid: parentId } } , token)
};

export const fetchComments = (token: Token) => (doorNumber: number | string) => (
  baseFetch<ParentComment[]>(`/challenges/${doorNumber}/posts`, token)
);

export const fetchSingleComment = (token: Token) => (doorNumber: number | string, commentId: string) => (
  baseFetch<ParentComment>(`/challenges/${doorNumber}/posts/${commentId}`, token)
);

export const deleteComment = (token: Token) => (commentId: string) => (
  baseDelete<never>(`/posts/${commentId}`, token)
);

export const fetchLeaderboard = () => (
  baseFetch<Leaderboard>('/leaderboard')
);

export const fetchAdminStatus = (token: Token) => () => (
  baseFetch<AdminStatus>('/users/admin', token)
);

export const fetchWhoami = (token: Token) => () => (
  baseFetch<Whoami>('/users/whoami', token)
);

