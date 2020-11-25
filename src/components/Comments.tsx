import React, { FC, useState } from 'react';
import './Comments.css';
import Comment from '../api/Comment';
import TextareaAutosize from 'react-autosize-textarea/lib';
import { ReactComponent as Favorite } from './svg/favorite.svg';
import { ReactComponent as Chevron } from './svg/expand_more.svg';

const Comments = () => {
    const dummyData: Comment[] = [{ content: "Foo bar baz", likes: 3 }, { content: "Foo bar baz", likes: 3 }, { content: "Foo bar baz", likes: 3 }]
    return <section className="CommentSection">
        {dummyData.map(comment => <CommentView comment={comment} />)}
        <CommentForm />
    </section>
}

interface CommentProps {
    comment: Comment;
}

const CommentView: FC<CommentProps> = ({ comment }) => {
    const [replies, setReplies] = useState(false) // Hide/Show replies

    // Dummy Data
    const data = {
        liked: false,
        likes: 12,
        repliesNumber: 2
    }
    const liked: boolean = true

    const toggleReplies = () => {
        setReplies(!replies)
    }

    const subComments: Comment[] = [{ content: "Foo bar baz", likes: 3 }, { content: "Foo bar baz", likes: 3 }, { content: "Foo bar baz", likes: 3 }]

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
                    <Favorite className={data.liked ? 'favoriteSvgLiked' : 'favoriteSvg'}/>
                    <p>{data.likes}</p>
                </div>
                <h4 className='CommentFooterItem'>SVAR</h4>
                <button className='CommentFooterItem btnReplies' onClick={toggleReplies}>
                    <p>vis {data.repliesNumber} svar </p>
                    <Chevron className={replies ? 'Chevron Rotate' : 'Chevron'}/>
                </button>
            </div>
            { replies && 
                <div className="SubComments">
                    {subComments.map(comment => <SubComment comment={comment} />)}
                </div>
            }
        </div>
    )
}  


const SubComment: FC<CommentProps> = ({ comment }) => {
    return <div className="SubComment">
        <img className="ProfileImage" src="https://placekitten.com/100/100" alt="User avatar" />
        <div className="CommentData">
            <span className="CommentName">Name</span><time>12. des 14:27</time>
            <p>{comment.content}</p>
        </div>
    </div>
}

const CommentForm = () => {
    return <form className="CommentForm">
        <TextareaAutosize name="comment" id="comment" placeholder="Legg igjen en kommentar, gjerne i Markdown :)" />
        <button className="SubmitButton" onClick={(e) => { e.preventDefault(); alert("click") }} value="Lagre">Skriv kommentar!</button>
    </form>
}


export default Comments;