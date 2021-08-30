import { FC, useCallback, useState } from "react"

import ParentComment, { Comment } from "../../api/Comment"
import Like from "../../api/Like"
import { getTimeStamp } from "../../utils"
import useHighlightJs from "../../hooks/useHighlightJs"
import Button from "../Button"
import useOwnComment from "../../hooks/useOwnComment"

import LikeButton from "./LikeButton"
import SubCommentForm from "./SubCommentForm"
import ToggleSubCommentsButton from "./ToggleSubCommentsButton"
import DeletedComment from "./DeletedComment"
import SubCommentsSection from "./SubCommentsSection"



type CommentProps = {
  comment: ParentComment
  myLikes: Like[]
  doorNumber: string
  refreshComment: (comment: ParentComment) => void
  deleteComment: (comment: ParentComment | Comment, confirm: string) => void
}

const TopComment: FC<CommentProps> = ({ comment, myLikes, doorNumber, refreshComment, deleteComment }) => {
  // const { deleteComment: deleteCommentRequest } = useRequestsAndAuth();
  const [showSubCommentForm, setShowSubcommentForm] = useState<boolean>(false)
  const [showSubComments, setShowSubComments] = useState<boolean>(true)
  const highlightRef = useHighlightJs<HTMLDivElement>()

  const isOwnPost = useOwnComment(comment)
  const timestamp = getTimeStamp(comment.created_at)

  const setShowSubcommentFormVisible = useCallback(() => setShowSubcommentForm(true), [setShowSubcommentForm])
  const toggleShowSubComments = useCallback(() => setShowSubComments((state) => !state), [setShowSubComments])

  const deleteCommentOnClick = useCallback(() => deleteComment(
    comment,
    "Er du sikker på at du vil slette innlegget ditt? Dersom noen har svart " +
    "på innlegget vil det fortsatt være synlig at det har vært et innlegg " +
    "her, men forfatter og innhold blir fjernet."
  ), [comment, deleteComment])
  const refreshSelf = useCallback(() => refreshComment(comment), [comment, refreshComment])

  if (comment.deleted) {
    return <DeletedComment comment={comment} myLikes={myLikes} doorNumber={doorNumber} deleteComment={deleteComment} refreshParentComment={refreshSelf}/>
  }

  return (
    <article className="flex rounded-md bg-gray-100 p-2 sm:p-4 mb-4">
      <div className="w-1/12">
        <img className="rounded-full w-full flex items-center justify-center" src={comment.author.picture} alt="User avatar" />
      </div>
      <div className="w-5/6 pr-4 pl-4">
        <header className="space-x-4">
          <span className="font-semibold text-xl">{comment.author.nickname}</span>
          <time className="float-right">{timestamp}</time>
          {isOwnPost && <Button className="float-right font-semibold" underline={false} onClick={deleteCommentOnClick}>Slett innlegg</Button>}
        </header>
        <div
          className="prose prose-sm md:prose max-w-none md:max-w-none mt-2 break-words my-4 md:my-8"
          ref={highlightRef}
          dangerouslySetInnerHTML={{ __html: comment.content }}
        />
        <footer className="grid grid-cols-2 justify-items-stretch mt-4">
          <div className="justify-self-start space-x-2 pl-2">
            <LikeButton comment={comment} myLikes={myLikes} />
            <Button className="font-semibold" underline={false} onClick={setShowSubcommentFormVisible}>Kommenter innlegg</Button>
          </div>
          <div className="justify-self-end">
            <ToggleSubCommentsButton showSubComments={showSubComments} toggleShowSubComments={toggleShowSubComments} numSubComments={comment.children.length}/>
          </div>
        </footer>
        <SubCommentForm
          showSubCommentForm={showSubCommentForm}
          setShowSubCommentForm={setShowSubcommentForm}
          refreshParentComment={refreshSelf}
          doorNumber={doorNumber}
          parentId={comment.uuid}
        />
        {showSubComments && <SubCommentsSection subComments={comment.children} myLikes={myLikes} deleteComment={deleteComment} />}
      </div>
    </article>
  )
}

export default TopComment
