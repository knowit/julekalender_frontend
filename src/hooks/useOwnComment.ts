import useRequestsAndAuth from "./useRequestsAndAuth";
import { Comment, ParentComment } from "../api/Comment";

const useOwnComment = (comment: Comment | ParentComment) => {
  const { currentUser } = useRequestsAndAuth();
  return currentUser.uuid === comment.author.uuid;
};

export default useOwnComment;
