import { FC, memo } from "react"
import clsx from "clsx"

import { squish } from "../../utils"
import { ChildPost as ChildPostType } from "../../api"

import LikeButton from "./LikeButton"
import PostWrapper from "./PostWrapper"


const DELETE_CONFIRM = squish(`
  Er du sikker på at du vil slette innlegget ditt? Andre brukere kan se
  at det har vært et innlegg her, men forfatter og innhold blir slettet.
`)

type ChildPostProps = {
  post: ChildPostType
}

const ChildPost: FC<ChildPostProps> = ({ post }) => (
  <PostWrapper
      post={post}
      deleteConfirmText={DELETE_CONFIRM}

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
            <LikeButton post={post} />
          </div>
        </footer>
      }
  </PostWrapper>
)

export default memo(ChildPost)
