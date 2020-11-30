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
        <div className='flex p-2'>
            <img className='rounded-full h-16 w-16 flex items-center justify-center mr-2' src={comment.author.picture} alt="User avatar" />
            <div>
                <span className='font-semibold'>{comment.author.nickname}</span><time className='float-right'>{getTimeStamp(comment.created_at)}</time>
                <div className='prose prose-sm md:prose max-w-none' dangerouslySetInnerHTML={{ __html: comment.content }} />
                <LikeButton comment={comment} myLikes={myLikes} />
            </div>
        </div>
    )
}

export default SubComment;
