import { FC, useCallback, useEffect, useState } from "react"
import { find, map, reject, sortBy } from "lodash"

import useRequestsAndAuth from "../../hooks/useRequestsAndAuth"
import { Comment, ParentComment } from "../../api/Comment"
import Like from "../../api/Like"
import Button from "../Button"

import TopComment from "./TopComment"
import CommentForm from "./CommentForm"


type CommentsSectionProps = {
  doorNumber: string
}

const CommentsSection: FC<CommentsSectionProps> = ({ doorNumber }) => {
  const { isAuthenticated, isAdmin, fetchComments, fetchSingleComment, fetchLikes, deleteComment: deleteCommentRequest } = useRequestsAndAuth()
  const [comments, setComments] = useState<ParentComment[]>([])
  const [likes, setLikes] = useState<Like[]>([])
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(true)
  const hideCommentForm = useCallback(() => setIsCommentFormVisible(false), [])
  const showCommentForm = useCallback(() => setIsCommentFormVisible(true), [])

  useEffect(() => {
    if (!isAuthenticated && !isAdmin) return

    fetchComments(doorNumber)
      .then((response) => setComments(response.data))
      .catch(() => { /* ... something ... */ })
    fetchLikes()
      .then((response) => setLikes(response.data))
      .catch(() => { /* ... something ... */ })
  }, [isAdmin, isAuthenticated, fetchComments, doorNumber, fetchLikes])

  // Refresh an entire comment chain from the backend. Use this when updating a
  // comment to easily get the comment tree into the correct state.
  // This is much easier than wrangling all of that state on the client.
  const refreshComment = useCallback((comment: ParentComment) => {
    fetchSingleComment(doorNumber, comment.uuid)
      .then((response) => {
        if (response.status === 204) {
          // Comment has been fully deleted or is otherwise nonexistent. Remove it from list.
          setComments((comments) => reject(comments, { uuid: comment.uuid }))
        } else {
          // Comment has been successfully refreshed. Replace it in the comments list.
          setComments((comments) => {
            const filteredComments = reject(comments, { uuid: comment.uuid })
            return sortBy([...filteredComments, response.data], "created_at")
          })
        }
      })
      .catch(() => { /* ... something ... */ })
  }, [doorNumber, fetchSingleComment, setComments])

  const deleteComment = useCallback((comment: Comment, confirm: string) => {
    if (!window.confirm(confirm)) return

    deleteCommentRequest(comment.uuid)
      .then(() => {
        // Find top-level parent of given comment
        const staleComment = comment.parent_uuid ? find(comments, { uuid: comment.parent_uuid }) : comment as ParentComment
        if (!staleComment) return

        refreshComment(staleComment)
      })
      .catch(() => { /* ... something ... */ })
  }, [comments, deleteCommentRequest, refreshComment])

  return (
    <section className="my-16 mx-8 lg:w-4/5 lg:mx-auto">
      {isCommentFormVisible
        ? <CommentForm doorNumber={doorNumber} setComments={setComments} hideCommentForm={hideCommentForm} />
        : <div className="bg-gray-100 rounded-md mx-auto mb-16 px-8 py-4 w-96 space-y-4 flex flex-col justify-center">
          <div className="text-center">Du finner kommentaren din nederst!</div>
          <Button onClick={showCommentForm}>Legg igjen ny kommentar?</Button>
        </div>
      }
      {map(comments, (comment) =>
        <TopComment
          key={comment.uuid}
          doorNumber={doorNumber}
          comment={comment}
          myLikes={likes}
          deleteComment={deleteComment}
          refreshComment={refreshComment}
        />
      )}
    </section>
  )
}

export default CommentsSection
