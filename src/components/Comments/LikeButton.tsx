import { FC, useState } from 'react';
import { ReactComponent as Favorite } from '../svg/heart.svg';
import Like from '../../api/Like';
import { Comment } from '../../api/Comment';
import useRequestsAndAuth from '../../hooks/useRequestsAndAuth';


interface LikeProps {
    comment: Comment;
    myLikes: Like[]
}

const LikeButton: FC<LikeProps> = ({ comment, myLikes }) => {
    var [isCommentLiked, setIsCommentLiked] = useState<boolean>(myLikes.some((like) => like.post_uuid === comment.uuid))
    var [likes, setLikes] = useState<number>(comment.likes)
    const { createLike } = useRequestsAndAuth()
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

    return (
        <div className="inline-block">
            <button onClick={() => likePost()}>
                <Favorite className={`${isCommentLiked ? 'text-red-500' : 'text-red-300'} hover:text-red-500 cursor-pointer fill-current w-3 mr-0.5`} />
            </button>
            <span className='mr-2'>{likes}</span>
        </div>
    );
};

export default LikeButton
