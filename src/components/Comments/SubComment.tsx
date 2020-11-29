import React, { FC } from 'react';
import { Comment } from '../../api/Comment';
import Like from '../../api/Like';
import { getTimeStamp } from '../../utils';
import LikeButton from './LikeButton';


interface SubCommentProps {
    comment: Comment;
    myLikes: Like[];
}

const SubComment: FC<SubCommentProps> = ({ comment, myLikes }) => {
    return (
        <div className="SubComment">
            <img className="ProfileImage" src={comment.author.picture} alt="User avatar" />
            <div className="CommentData">
                <span className="CommentName">{comment.author.nickname}</span><time>{getTimeStamp(comment.created_at)}</time>
                <div className="prose" dangerouslySetInnerHTML={{ __html: comment.content }} />
                <LikeButton comment={comment} myLikes={myLikes} />
            </div>
        </div>
    )
}

export default SubComment;
