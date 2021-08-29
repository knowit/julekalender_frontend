import { FC } from "react"

import { Comment } from "../../api/Comment"
import { getTimeStamp } from "../../utils"


type DeletedSubCommentProps = {
  comment: Comment
}

const DeletedSubComment: FC<DeletedSubCommentProps> = ({ comment }) => {
  const timestamp = getTimeStamp(comment.created_at)

  return (
    <div className="flex p-2 mb-4 bg-gray-200 rounded-sm">
      <div className="w-11/12 mx-auto">
        <header>
          <time className="float-right">{timestamp}</time>
        </header>
        <div className="my-2 text-gray-600 font-light text-center">
          <em>Slettet innlegg</em>
        </div>
      </div>
    </div>
  )
}

export default DeletedSubComment
