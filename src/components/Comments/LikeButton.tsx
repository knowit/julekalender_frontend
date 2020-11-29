import React, { FC, useState } from 'react';
import { ReactComponent as Favorite } from '../svg/favorite.svg';
import Like from '../../api/Like';
import Comment from '../../api/Comment';
import { useRequests } from '../../api/requests';


interface LikeProps {
    comment: Comment;
    myLikes: Like[]
}

const LikeButton: FC<LikeProps> = ({ comment, myLikes }) => {
    var [isCommentLiked, setIsCommentLiked] = useState<boolean>(myLikes.some((like) => like.post_uuid === comment.uuid))
    var [likes, setLikes] = useState<number>(comment.likes)
    const { createLike } = useRequests()
    const likePost = () => {
        if (!isCommentLiked) {
            createLike(comment.uuid)
                .then(_ => {
                    setLikes(likes + 1);
                    setIsCommentLiked(true);
                })
                .catch(e => { })
        }
    }

    return <>
        <button onClick={() => likePost()}>
            <Favorite className={isCommentLiked ? 'favoriteSvgLiked' : 'favoriteSvg'} />
        </button>
        <span>{likes}</span>
    </>
}

export default LikeButton