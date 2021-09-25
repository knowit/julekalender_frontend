import { FC, useCallback } from "react"
import { map } from "lodash"

import { ParentPost } from "../../api/Post"
import Button from "../Button"
import useBooleanToggle from "../../hooks/useBooleanToggle"
import { squish } from "../../utils"
import { useDeletePost } from "../../api/requests"

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
  const { mutate: doDeletePost } = useDeletePost()

  const [showForm, toggleShowForm] = useBooleanToggle(false)
  const [showChildPosts, toggleShowChildPosts] = useBooleanToggle(true)

  const deletePost = useCallback(async () => {
    if (!window.confirm(DELETE_CONFIRM)) return

    doDeletePost({ uuid: post.uuid })
  }, [doDeletePost, post])

  return (
    <PostWrapper
      post={post}
      deletePost={deletePost}
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
            <Button
              className="font-semibold"
              underline={false}
              onClick={toggleShowForm}
              content="Kommenter innlegg"
            />
          </>)}
        </div>
        <div className="justify-self-end">
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
      <ChildPostForm
        showChildPostForm={showForm}
        toggleShowForm={toggleShowForm}
        door={door}
        parentUuid={post.uuid}
        className="my-4"
      />
      {
        /*
        * Having min-w-0 (min-width: 0) prevents the content of the grid cells from growing outside of their cell:
        * https://stackoverflow.com/questions/43311943/prevent-content-from-expanding-grid-items
        */
      }
      {showChildPosts && (<div className="space-y-2 min-w-0">
        {map(post.children, (child) => (
          <ChildPost
            key={child.uuid}
            post={child}
          />
        ))}
      </div>)}
    </PostWrapper>
  )
}

export default Post
