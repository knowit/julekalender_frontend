import { Comment, ParentComment } from "../api/Comment"

import useRequestsAndAuth from "./useRequestsAndAuth"


const useOwnComment = (comment: Comment | ParentComment) => {
  const { currentUser } = useRequestsAndAuth()
  return currentUser.uuid === comment.author.uuid
}

export default useOwnComment
