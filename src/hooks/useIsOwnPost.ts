import { Post, ParentPost } from "../api/Post"

import useRequestsAndAuth from "./useRequestsAndAuth"


const useIsOwnPost = (post: Post | ParentPost) => {
  const { currentUser } = useRequestsAndAuth()
  return currentUser.uuid === post.author.uuid
}

export default useIsOwnPost
