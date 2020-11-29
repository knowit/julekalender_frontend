import React, { FC, useEffect, useState } from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';

import { useRequests } from '../../api/requests';
import './Comments.css';
import Comment from '../../api/Comment';
import TopComment from './TopComment';
import Like from '../../api/Like';

interface CommentsSectionProps {
    doorNumber: number;
};

const CommentsSection: FC<CommentsSectionProps> = ({ doorNumber }) => {
    const { isAuthenticated, fetchComments, fetchLikes } = useRequests();
    const [comments, setComments] = useState<Comment[]>();
    const [likes, setLikes] = useState<Like[]>();

    useEffect(() => {
        if (!isAuthenticated) return;

        fetchComments(doorNumber)
            .then((response) => setComments(response.data))
            .catch((e) => { /* ... something ... */ })
        fetchLikes()
            .then((response) => setLikes(response.data))
            .catch((e) => { /* ... something ... */ })
    }, [isAuthenticated, fetchComments, doorNumber, fetchLikes]);

    const appendComment = (comment: Comment) => {
        setComments([...(comments || []), comment])
    }

    if (comments === undefined || likes === undefined) return null;

    return (
        <section className="CommentSection">
            <CommentForm doorNumber={doorNumber} appendComment={appendComment} />
            {comments.map((comment) => <TopComment key={comment.uuid} comment={comment} myLikes={likes} />)}
        </section>
    )
}

interface CommentFormProps {
    doorNumber: number,
    appendComment: (comment: Comment) => void
}

const CommentForm: FC<CommentFormProps> = ({ doorNumber, appendComment }) => {
    const [comment, setComment] = useState<string>('')
    const { createComment } = useRequests();
    const postComment = () => {
        createComment(doorNumber, comment)
            .then(response => {
                appendComment(response.data)
                setComment('')
            });
    }


    return (
        <form className="CommentForm">
            <TextareaAutosize name="comment" value={comment} onChange={e => setComment(e.currentTarget.value)} id="comment" placeholder="Legg igjen en kommentar, gjerne i Markdown :)" />
            <div>
                <button className="SubmitButton" onClick={(e) => { e.preventDefault(); postComment() }} value="Lagre">KOMMENTER</button>
            </div>
        </form>
    )
}


export default CommentsSection;
