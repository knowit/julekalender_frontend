import { FC, useCallback } from "react"
import { map } from "lodash"

import { ParentPost } from "../../api/Post"
import Like from "../../api/Like"
import Button from "../Button"
import useBooleanToggle from "../../hooks/useBooleanToggle"
import useRequestsAndAuth from "../../hooks/useRequestsAndAuth"
import { squish } from "../../utils"

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
  myLikes: Like[]
  doorNumber: string
  refreshPost: (post: ParentPost) => void
}

const Post: FC<PostProps> = ({ post, myLikes, doorNumber, refreshPost }) => {
  const { deletePost: deletePostRequest } = useRequestsAndAuth()
  const [showForm, toggleShowForm] = useBooleanToggle(false)
  const [showChildPosts, toggleShowChildPosts] = useBooleanToggle(true)

  const refreshSelf = useCallback(() => refreshPost(post), [post, refreshPost])
  const deletePost = useCallback(async () => {
    if (!window.confirm(DELETE_CONFIRM)) return

    const { status } = await deletePostRequest(post.uuid)

    if (status === 200)
      refreshSelf()
  }, [post, deletePostRequest, refreshSelf])

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
            <LikeButton post={post} myLikes={myLikes} />
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
        refreshParentPost={refreshSelf}
        doorNumber={doorNumber}
        parentId={post.uuid}
        className="my-4"
      />
      {showChildPosts && (<div className="space-y-2">
        {map(post.children, (child) => (
          <ChildPost
            key={child.uuid}
            post={child}
            myLikes={myLikes}
            refreshParent={refreshSelf}
          />
        ))}
      </div>)}
    </PostWrapper>
  )
}

export default Post
