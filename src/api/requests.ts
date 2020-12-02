import { useEffect, useCallback, useState } from 'react';
import Axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

import Comment, { CreateCommentPayload } from './Comment';
import Like from './Like';
import Challenge, { SolvedStatus } from './Challenge';
import { CreateLikePayload, CreateSolutionPayload, CreateSolutionResponse } from './Solution';
import Leaderboard from './Leaderboard';

export const apiUrl = window.location.hostname === 'julekalender.knowit.no'
    ? 'https://julekalender-backend.knowit.no'
    : 'https://***REMOVED***';
const requestHeaders = { "Content-Type": "application/json" };
const getHeaders = (token: Token) => (
  token ? { ...requestHeaders, "Authorization": token } : requestHeaders
)

type Token = string | undefined;

// TODO: Type endpoint with template string type?
const baseFetch = <T>(endpoint: string, token: Token = undefined) => {
  return Axios.get<T>(`${apiUrl}${endpoint}`, { headers: getHeaders(token) })
};

type CreatePayload = CreateSolutionPayload | CreateLikePayload | CreateCommentPayload;

const baseCreate = <T>(endpoint: string, payload: CreatePayload, token: Token) => {
  return Axios.post<T>(`${apiUrl}${endpoint}`, payload, { headers: getHeaders(token) })
};

const fetchLikes = (token: Token) => () => (
  baseFetch<Like[]>('/likes', token)
);

const fetchChallenge = (token: Token) => (doorNumber: number | string) => (
  baseFetch<Challenge>(`/challenges/${doorNumber}`, token)
);

const fetchSolvedStatus = (token: Token) => () => (
  baseFetch<SolvedStatus>('/challenges/solved', token)
);

const createSolution = (token: Token) => (challenge_door: number | string, answer: string) => (
  baseCreate<CreateSolutionResponse>(`/challenges/${challenge_door}/solutions`, { "solution": { "answer": answer } }, token)
);

const createLike = (token: Token) => (postId: number | string) => (
  baseCreate<never>(`/posts/${postId}/likes`, {}, token)
);

const createComment = (token: Token) => (doorNumber: number, comment:string, parentId?: number | string,) => (
  baseCreate<Comment>(`/challenges/${doorNumber}/posts`, {post: {parent_uuid: parentId, content: comment}} , token)
)

const fetchComments = (token: Token) => (doorNumber: number | string) => (
  baseFetch<Comment[]>(`/challenges/${doorNumber}/posts`, token)
);

const fetchLeaderboard = () => (
  baseFetch<Leaderboard>('/leaderboard')
);

// The single source of truth for authentication and API behavior. All usage of
// Auth0 should go through here, to ensure that the same `isAuthenticated` (the
// one which ensures a valid token is active to prevent double-rendering when it
// is initialized) is used throughout the app.
export const useRequestsAndAuth = () => {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    getIdTokenClaims,
    user
  } = useAuth0();
  const [token, setToken] = useState<string>();

  // Get existing token in state
  useEffect(() => {
    const getExistingToken = async () => {
      const claims = await getIdTokenClaims();
      if (claims) setToken(claims.__raw);
    }
    getExistingToken();
  }, [getIdTokenClaims, token])

  useEffect(() => {
    const getToken = async () => {
      if (!isAuthenticated) return;
      if (token && token.length > 0) return; // Token already exists

      await getAccessTokenSilently();
      // getIdTokenClaims uses access token from surrounding context.
      const claims = await getIdTokenClaims();
      setToken(claims.__raw);
    };

    getToken();
  }, [isAuthenticated, getAccessTokenSilently, getIdTokenClaims, token]);

  return {
    loginWithRedirect,
    logout,
    isAuthenticated: isAuthenticated && !isLoading && token,
    user,
    fetchLikes: useCallback(fetchLikes(token), [token]),
    fetchChallenge: useCallback(fetchChallenge(token), [token]),
    fetchSolvedStatus: useCallback(fetchSolvedStatus(token), [token]),
    createSolution: useCallback(createSolution(token), [token]),
    createLike: useCallback(createLike(token), [token]),
    createComment: useCallback(createComment(token), [token]),
    fetchComments: useCallback(fetchComments(token), [token]),
    fetchLeaderboard,
  };
}
