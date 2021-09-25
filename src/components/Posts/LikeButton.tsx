import { FC } from "react"
import { includes } from "lodash"
import clsx from "clsx"

import { ReactComponent as Favorite } from "../svg/heart.svg"
import { Post } from "../../api/Post"
import { useCreateLike, useLikes } from "../../api/requests"


type LikeProps = {
  post: Post
}

const LikeButton: FC<LikeProps> = ({ post }) => {
  const { mutate: createLike } = useCreateLike()
  const { data: likes } = useLikes()

  const likePost = () => {
    if (!includes(likes, { post_uuid: post.uuid }))
      createLike({ postUuid: post.uuid })
  }

  return (
    <div className="inline-block space-x-0.5">
      <button onClick={likePost}>
        <Favorite
          className={clsx(
            post.likes ? "text-red-500" : "text-red-300",
            "hover:text-red-500 cursor-pointer fill-current w-3"
          )}
        />
      </button>
      <span>{post.likes}</span>
    </div>
  )
}

export default LikeButton
