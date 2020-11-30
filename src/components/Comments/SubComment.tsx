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
            <div className='w-1/6'>
                <img className='rounded-full h-14 w-14 flex items-center justify-center' src={comment.author.picture} alt="User avatar" />
            </div>
            <div className='w-5/6'>
                <span className='font-semibold'>{comment.author.nickname}</span><time className='float-right'>{getTimeStamp(comment.created_at)}</time>
                <div className='prose prose-sm md:prose max-w-none mt-2' dangerouslySetInnerHTML={{ __html: comment.content }} />
                <div className='mb-2'>
                    <LikeButton comment={comment} myLikes={myLikes} />
                </div>
            </div>
        </div>
    )
}

export default SubComment;
