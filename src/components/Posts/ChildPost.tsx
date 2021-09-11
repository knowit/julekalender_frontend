import { FC, useCallback } from "react"
import clsx from "clsx"

import { Post } from "../../api/Post"
import Like from "../../api/Like"
import useRequestsAndAuth from "../../hooks/useRequestsAndAuth"
import { squish } from "../../utils"

import LikeButton from "./LikeButton"
import PostWrapper from "./PostWrapper"


const DELETE_CONFIRM = squish(`
  Er du sikker på at du vil slette innlegget ditt? Andre brukere kan se
  at det har vært et innlegg her, men forfatter og innhold blir slettet.
`)

type ChildPostProps = {
  post: Post
  myLikes: Like[]
  refreshParent: () => void
}

const ChildPost: FC<ChildPostProps> = ({ post, myLikes, refreshParent }) => {
  const { deletePost: deletePostRequest } = useRequestsAndAuth()
  const deletePost = useCallback(async () => {
    if (!window.confirm(DELETE_CONFIRM)) return

    const { status } = await deletePostRequest(post.uuid)

    if (status === 200)
      refreshParent()
  }, [post, deletePostRequest, refreshParent])

  return (
    <PostWrapper
      post={post}
      deletePost={deletePost}

      // Imagine using some kind of Cascading Style Sheet to avoid
      // having to pass these variables around...
      wrapperClassName="bg-gray-200 sm:p-2"
      contentClassName={clsx("!mr-0", post.deleted && "!ml-0")}
    >
      {post.deleted
        ? <div className="text-gray-600 font-light text-center p-2 sm:p-4">
          <em>Slettet innlegg</em>
        </div>
        : <footer>
          <div>
            <LikeButton post={post} myLikes={myLikes} />
          </div>
        </footer>
      }
    </PostWrapper>
  )
}

export default ChildPost
