import React, { FC } from 'react';
import { ReactComponent as Favorite } from './../svg/favorite.svg';
import { Comment } from '../../api/Comment';


interface SubCommentProps {
    comment: Comment,
}

const SubComment: FC<SubCommentProps> = ({ comment }) => {

    return (
        <div className="SubComment">
            <img className="ProfileImage" src="https://placekitten.com/100/100" alt="User avatar" />
            <div className="CommentData">
                <span className="CommentName">Name</span><time>12. des 14:27</time>
                <p>{comment.content}</p>
                <div className='LikeWrapper'>
                    <Favorite className={comment.liked_by_me ? 'favoriteSvgLiked' : 'favoriteSvg'} />
                    <p>{comment.likes}</p>
                </div>
            </div>
        </div>
    )
}

export default SubComment;