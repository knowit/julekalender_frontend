import { FC, useState } from "react"
import { noop, some } from "lodash"
import clsx from "clsx"

import { ReactComponent as Favorite } from "../svg/heart.svg"
import Like from "../../api/Like"
import { Post } from "../../api/Post"
import useRequestsAndAuth from "../../hooks/useRequestsAndAuth"


type LikeProps = {
  post: Post
  myLikes: Like[]
}

const LikeButton: FC<LikeProps> = ({ post, myLikes }) => {
  const [numLikes, setNumLikes] = useState<number>(post.likes)
  const { createLike } = useRequestsAndAuth()

  // Local override for having liked a post.
  // Otherwise would require re-rendering entire posts section.
  const [isPostLiked, setIsPostLiked] = useState<boolean>(some(myLikes, { post_uuid: post.uuid }))

  const likePost = () => {
    if (!isPostLiked) {
      createLike(post.uuid)
        .then((_) => {
          setNumLikes(numLikes + 1)
          setIsPostLiked(true)
        })
        .catch(noop)
    }
  }

  return (
    <div className="inline-block space-x-0.5">
      <button onClick={likePost}>
        <Favorite
          className={clsx(
            isPostLiked ? "text-red-500" : "text-red-300",
            "hover:text-red-500 cursor-pointer fill-current w-3"
          )}
        />
      </button>
      <span>{numLikes}</span>
    </div>
  )
}

export default LikeButton
