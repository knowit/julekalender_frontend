import React, { FC, useState } from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';
import { ReactComponent as Chevron } from './../svg/expand_more.svg';
import { ReactComponent as Favorite } from './../svg/favorite.svg';
import SubComment from './SubComment';
import ParentComment from '../../api/Comment';




interface CommentProps {
    comment: ParentComment;
}

const TopComment: FC<CommentProps> = ({ comment }) => {
    const [replies, setReplies] = useState(false) // Hide/Show replies
    const [reply, setReply] = useState(false) // Hide/Show reply
    const [displayReplies, setDisplayReplies] = useState(true) // Hide/Show the show replies button when the reply section is open

    // Placeholder data
    const data = {
        liked: false,
        likes: 12,
        repliesNumber: 2
    }

    const toggleReplies = () => {
        setReplies(replies)
    }

    const toggleReply = () => {
        setReply(!reply)
        setDisplayReplies(reply ? true : false)
        setReplies(reply && replies ? true : false)
    }

    return (
        <div className="Comment">
            <div className="CommentView">
                <img className="ProfileImage" src="https://placekitten.com/100/100" alt="User avatar" />
                <div className="CommentData">
                    <span className="CommentName">Name</span><time>12. des 14:27</time>
                    <p>{comment.content}</p>
                </div>
            </div>
            <div className='CommentFooter'>
                <div className='CommentFooterItem LikeWrapper'>
                    <Favorite className={data.liked ? 'favoriteSvgLiked' : 'favoriteSvg'} />
                    <p>{data.likes}</p>
                </div>
                <button className='CommentFooterItem btnReply' onClick={toggleReply}>SVAR</button>
                {displayReplies &&
                    <button className='CommentFooterItem btnReplies' onClick={toggleReplies}>
                        <p>vis {data.repliesNumber} svar </p>
                        <Chevron className={replies ? 'Chevron Rotate' : 'Chevron'} />
                    </button>
                }
            </div>
            { reply &&
                <div className='ReplyBox'>
                    <div className='ReplyBoxInput'>
                        <img className="ProfileImage" src="https://placekitten.com/100/100" alt="User avatar" />
                        <TextareaAutosize id='ReplyText' placeholder='Legg til svar' />
                    </div>
                    <div className='ReplyBoxButtons'>
                        <button className='ReplyBoxBtn' onClick={toggleReply}>AVBRYT</button>
                        <button className='ReplyBoxBtn'>SVAR</button>
                    </div>
                </div>
            }
            { replies &&
                <div className="SubComments">
                    {comment.children?.map(comment => <SubComment comment={comment} />)}
                </div>
            }
        </div>
    )
}

export default TopComment;