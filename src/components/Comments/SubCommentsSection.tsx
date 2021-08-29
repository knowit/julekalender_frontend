import { FC } from "react"
import { map } from "lodash"

import { Comment } from "../../api/Comment"
import Like from "../../api/Like"

import SubComment from "./SubComment"


type SubCommentsSectionProps = {
  subComments: Comment[]
  myLikes: Like[]
  deleteComment: (comment: Comment, confirm: string) => void
}

const SubCommentsSection: FC<SubCommentsSectionProps> = ({ subComments, myLikes, deleteComment }) => (
  <div className="flex flex-col content-end mt-2">
    {map(subComments, (subComment) => <SubComment key={subComment.uuid} comment={subComment} myLikes={myLikes} deleteComment={deleteComment} />)}
  </div>
)

export default SubCommentsSection
