import { FC, useState } from "react"
import { find, some } from "lodash"
import clsx from "clsx"

import { ReactComponent as Favorite } from "../svg/heart.svg"
import { Post } from "../../api/Post"
import { useCreateLike, useDeleteLike, useLikes } from "../../api/requests"
import useIsOwnPost from "../../hooks/useIsOwnPost"


type LikeProps = {
  post: Post
}

const LikeButton: FC<LikeProps> = ({ post }) => {
  const { mutate: createLike } = useCreateLike()
  const { mutate: deleteLike } = useDeleteLike()
  const { data: likes } = useLikes()

  const liked = some(likes, { post_uuid: post.uuid })
  const isOwnPost = useIsOwnPost(post)

  const [hovering, setHovering] = useState(false)

  const likePost = () => {
    if (!liked && !isOwnPost)
      createLike({ postUuid: post.uuid })
  }

  const unlikePost = () => {
    const like = find(likes, { post_uuid: post.uuid })
    if (like)
      deleteLike(like)
  }

  return (
    <button
      className={clsx(
        isOwnPost ? "cursor-default" : "cursor-pointer",
        "inline-block space-x-0.5"
      )}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={liked ? unlikePost : likePost}
    >
      <Favorite
        className={clsx(
          "inline-block -mt-1 fill-current w-3 transition duration-200 ease-out-cubic",
          hovering
            ? "text-red-500 scale-[120%]"
            : post.likes > 0 ? "text-red-500" : "text-red-300"
        )}
      />
      <span className="!text-gray-700">{post.likes}</span>
    </button>
  )
}

export default LikeButton
