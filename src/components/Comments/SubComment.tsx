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
        <div className='flex p-2 mb-4 bg-gray-200'>
            <div className='w-1/12'>
                <img className='rounded-full w-full flex items-center justify-center' src={comment.author.picture} alt="User avatar" />
            </div>
            <div className='w-11/12 ml-2'>
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
