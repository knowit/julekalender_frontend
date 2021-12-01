import { FC, memo } from "react"
import { map } from "lodash"

import { ParentPost } from "../../api/Post"
import useBooleanToggle from "../../hooks/useBooleanToggle"
import { squish } from "../../utils"
import AddChildPostButton from "../AddChildPostButton"
import SubscribeButton from "../SubscribeButton"

import LikeButton from "./LikeButton"
import ChildPostForm from "./ChildPostForm"
import ToggleChildPostsButton from "./ToggleChildPostsButton"
import PostWrapper from "./PostWrapper"
import ChildPost from "./ChildPost"


const DELETE_CONFIRM = squish(`
  Er du sikker på at du vil slette innlegget ditt? Dersom noen har svart
  på innlegget vil det fortsatt være synlig at det har vært et innlegg
  her, men forfatter og innhold blir fjernet.
`)

type PostProps = {
  post: ParentPost
  door: number
}

const Post: FC<PostProps> = ({ post, door }) => {
  const [showForm, toggleShowForm] = useBooleanToggle(false)
  const [showChildPosts, toggleShowChildPosts] = useBooleanToggle(true)


  return (
    <PostWrapper
      post={post}
      deleteConfirmText={DELETE_CONFIRM}
      className="grid gap-2"
    >
      {post.deleted && (
        <div className="text-gray-600 font-light text-center p-2 sm:p-6">
          <em>Slettet innlegg</em>
        </div>
      )}
      <footer className="grid grid-cols-2">
        <div className="justify-self-start space-x-2 pl-2">
          {!post.deleted && (<>
            <LikeButton post={post} />
            <SubscribeButton post={post} className="text-sm align-middle -mt-1" />
          </>)}
        </div>
        <div className="justify-self-end space-x-4">
          <AddChildPostButton toggleShowForm={toggleShowForm} />
          <ToggleChildPostsButton
            showChildPosts={showChildPosts}
            toggleShowChildPosts={toggleShowChildPosts}
            numChildPosts={post.children.length}
          />
        </div>
      </footer>

      {
        /*
        * TODO: This looks pretty bad on mobile. Figure out way to fix.
        * useBreakPoint hook and show different elements entirely on different
        * media sizes?
        */
      }
      {showForm && (
        <ChildPostForm
          toggleShowForm={toggleShowForm}
          door={door}
          parent={post}
          className="my-4"
        />
      )}

      {showChildPosts && (<div className="space-y-2 min-w-0">
        {map(post.children, (child) => (
          <ChildPost key={child.uuid} post={child} />
        ))}
      </div>)}
    </PostWrapper>
  )
}

export default memo(Post)
