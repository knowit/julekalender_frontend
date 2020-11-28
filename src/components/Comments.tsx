import React, { FC, useState } from 'react';
import './Comments.css';
import ParentComment, { Comment } from '../api/Comment';
import TextareaAutosize from 'react-autosize-textarea/lib';
import { ReactComponent as Favorite } from './svg/favorite.svg';
import { ReactComponent as Chevron } from './svg/expand_more.svg';

const Comments = () => {
    const dummyData: ParentComment[] = [{ content: "Foo bar baz", likes: 3, uuid: "loldas", user_id: 1231341, created_at: new Date(), edited_at: null, liked_by_me: false, children: [{ content: "Godt poeng!", likes: 4, uuid: "sadasds", user_id: 1241, created_at: new Date(), edited_at: null, liked_by_me: false }]   }]
    return (
        <section className="CommentSection">
            <CommentForm />
            {dummyData.map(comment => <CommentView comment={comment} />)}
        </section>
    )
}

interface CommentProps {
    comment: ParentComment;
}

const CommentView: FC<CommentProps> = ({ comment }) => {
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

const CommentForm = () => {
    return (
        <form className="CommentForm">
            <TextareaAutosize name="comment" id="comment" placeholder="Legg igjen en kommentar, gjerne i Markdown :)" />
            <div>
                <button className="SubmitButton" onClick={(e) => { e.preventDefault(); alert("click") }} value="Lagre">KOMMENTER</button>
            </div>
        </form>
    )
}


export default Comments;