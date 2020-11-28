import React, { FC } from 'react';
import { ReactComponent as Favorite } from './../svg/favorite.svg';
import { Comment } from '../../api/Comment';


interface SubCommentProps {
    comment: Comment,
}

const SubComment: FC<SubCommentProps> = ({ comment }) => {

    // Placeholder data
    const data = {
        liked: false,
        likes: 2
    }

    return (
        <div className="SubComment">
            <img className="ProfileImage" src="https://placekitten.com/100/100" alt="User avatar" />
            <div className="CommentData">
                <span className="CommentName">Name</span><time>12. des 14:27</time>
                <p>{comment.content}</p>
                <div className='LikeWrapper'>
                    <Favorite className={data.liked ? 'favoriteSvgLiked' : 'favoriteSvg'} />
                    <p>{data.likes}</p>
                </div>
            </div>
        </div>
    )
}

export default SubComment;