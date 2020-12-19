import React, { FC, useCallback, useState } from 'react';

import ParentComment from '../../api/Comment';
import Like from '../../api/Like';
import { getTimeStamp } from '../../utils';
import { Comment } from '../../api/Comment';
import SubCommentForm from './SubCommentForm';
import ToggleSubCommentsButton from './ToggleSubCommentsButton';
import SubCommentsSection from './SubCommentsSection';


interface CommentProps {
  comment: ParentComment;
  myLikes: Like[];
  doorNumber: number;
  deleteComment: (comment: Comment, confirm: string) => void;
  refreshParentComment: () => void;
};

const TopComment: FC<CommentProps> = ({ comment, myLikes, doorNumber, deleteComment, refreshParentComment }) => {
  const [showSubCommentForm, setShowSubcommentForm] = useState<boolean>(false)
  const [showSubComments, setShowSubComments] = useState<boolean>(true)

  const timestamp = getTimeStamp(comment.created_at);

  const toggleShowSubComments = useCallback(() => setShowSubComments((state) => !state), [setShowSubComments]);

  return (
    <article className="flex rounded-md bg-gray-100 p-2 sm:p-4 mb-4">
      <div className="w-5/6 pr-4 pl-4 mx-auto">
        <header>
          <time className="float-right">{timestamp}</time>
        </header>
        <div className="mt-8 mb-6 text-gray-500 font-light text-center">
          <em>Slettet innlegg</em>
        </div>
        <footer>
          <ToggleSubCommentsButton className="block ml-auto" showSubComments={showSubComments} toggleShowSubComments={toggleShowSubComments} numSubComments={comment.children.length}/>
        </footer>
        <SubCommentForm
          showSubCommentForm={showSubCommentForm}
          setShowSubCommentForm={setShowSubcommentForm}
          doorNumber={doorNumber}
          parentId={comment.uuid}
          refreshParentComment={refreshParentComment}
        />
        {showSubComments && <SubCommentsSection subComments={comment.children} myLikes={myLikes} deleteComment={deleteComment} />}
      </div>
    </article>
  )
}

export default TopComment
