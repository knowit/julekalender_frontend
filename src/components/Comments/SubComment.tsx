import React, { FC } from 'react';
import { ReactComponent as Favorite } from './../svg/favorite.svg';
import { Comment } from '../../api/Comment';
import Like from '../../api/Like';


interface SubCommentProps {
    comment: Comment;
    likes: Like[];
}

const SubComment: FC<SubCommentProps> = ({ comment, likes }) => {
    const isCommentLiked = likes.some((like) => like.post_uuid === comment.uuid)

    return (
        <div className="SubComment">
            <img className="ProfileImage" src={comment.author.picture} alt="User avatar" />
            <div className="CommentData">
                <span className="CommentName">{comment.author.nickname}</span><time>{comment.created_at}</time>
                <p>{comment.content}</p>
                <div className='LikeWrapper'>
                    <Favorite className={isCommentLiked ? 'favoriteSvgLiked' : 'favoriteSvg'} />
                    <p>{comment.likes}</p>
                </div>
            </div>
        </div>
    )
}

export default SubComment;