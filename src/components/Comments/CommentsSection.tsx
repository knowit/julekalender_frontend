import React, { FC, useState } from 'react';
import './Comments.css';
import ParentComment, { Comment } from '../../api/Comment';
import TextareaAutosize from 'react-autosize-textarea/lib';
import { ReactComponent as Favorite } from './../svg/favorite.svg';
import { ReactComponent as Chevron } from './../svg/expand_more.svg';
import TopComment from './TopComment';

const CommentsSection = () => {
    const dummyData: ParentComment[] = [{ content: "Foo bar baz", likes: 3, uuid: "loldas", user_id: 1231341, created_at: new Date(), edited_at: null, liked_by_me: false, children: [{ content: "Godt poeng!", likes: 4, uuid: "sadasds", user_id: 1241, created_at: new Date(), edited_at: null, liked_by_me: false }]   }]
    return (
        <section className="CommentSection">
            <CommentForm />
            {dummyData.map(comment => <TopComment comment={comment} />)}
        </section>
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


export default CommentsSection;