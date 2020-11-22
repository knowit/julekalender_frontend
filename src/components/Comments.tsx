import React, { FC } from 'react';
import './Comments.css';
import Comment from '../api/Comment';
import TextareaAutosize from 'react-autosize-textarea/lib';



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
    return <div className="CommentView">
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