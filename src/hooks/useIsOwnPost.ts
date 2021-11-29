import { Post, ParentPost } from "../api/Post"
import { useWhoami } from "../api/users/requests"


const useIsOwnPost = (post: Post | ParentPost) => {
  const { data: whoami } = useWhoami()

  return whoami?.uuid === post.author.uuid
}

export default useIsOwnPost
