import { FC, useState } from "react"
import { noop, some } from "lodash"
import clsx from "clsx"

import { ReactComponent as Favorite } from "../svg/heart.svg"
import Like from "../../api/Like"
import { Comment } from "../../api/Comment"
import useRequestsAndAuth from "../../hooks/useRequestsAndAuth"


type LikeProps = {
  comment: Comment
  myLikes: Like[]
}

const LikeButton: FC<LikeProps> = ({ comment, myLikes }) => {
  const [isCommentLiked, setIsCommentLiked] = useState<boolean>(some(myLikes, { post_uuid: comment.uuid }))
  const [likes, setLikes] = useState<number>(comment.likes)
  const { createLike } = useRequestsAndAuth()
  const likePost = () => {
    if (!isCommentLiked) {
      createLike(comment.uuid)
        .then((_) => {
          setLikes(likes + 1)
          setIsCommentLiked(true)
        })
        .catch(noop)
    }
  }

  return (
    <div className="inline-block">
      <button onClick={() => likePost()}>
        <Favorite className={clsx(isCommentLiked ? "text-red-500" : "text-red-300", "hover:text-red-500 cursor-pointer fill-current w-3 mr-0.5")} />
      </button>
      <span className="mr-2">{likes}</span>
    </div>
  )
}

export default LikeButton
