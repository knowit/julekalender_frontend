import React, { FC, useState } from 'react';
import { ReactComponent as Favorite } from './../svg/favorite.svg';
import { Comment } from '../../api/Comment';
import Like from '../../api/Like';
import { getTimeStamp } from '../../utils';
import { useRequests } from '../../api/requests';


interface SubCommentProps {
    comment: Comment;
    myLikes: Like[];
}

const SubComment: FC<SubCommentProps> = ({ comment, myLikes }) => {
    var [numberOfLikes, setLikes] = useState<number>(comment.likes)
    var [isCommentLiked, setIsCommentLiked] = useState<boolean>(myLikes.some((like) => like.post_uuid === comment.uuid))
    const { createLike } = useRequests()


    const likePost = () => {
        createLike(comment.uuid)
            .then(_ => {
                setLikes(numberOfLikes + 1);
                setIsCommentLiked(true);
            })
            .catch(e => {})
    }

    return (
        <div className="SubComment">
            <img className="ProfileImage" src={comment.author.picture} alt="User avatar" />
            <div className="CommentData">
                <span className="CommentName">{comment.author.nickname}</span><time>{getTimeStamp(comment.created_at)}</time>
                <div dangerouslySetInnerHTML={{ __html: comment.content }} />
                <button className='LikeWrapper' onClick={() => likePost()}>
                    <Favorite className={isCommentLiked ? 'favoriteSvgLiked' : 'favoriteSvg'} />
                    <p>{comment.likes}</p>
                </button>
            </div>
        </div>
    )
}

export default SubComment;
