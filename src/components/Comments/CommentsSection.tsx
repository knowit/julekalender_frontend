import React, { FC, useEffect, useState } from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';

import useRequestsAndAuth from '../../hooks/useRequestsAndAuth';
import './Comments.css';
import Comment from '../../api/Comment';
import TopComment from './TopComment';
import Like from '../../api/Like';

interface CommentsSectionProps {
    doorNumber: number;
};

const CommentsSection: FC<CommentsSectionProps> = ({ doorNumber }) => {
    const { isAuthenticated, fetchComments, fetchLikes } = useRequestsAndAuth();
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
            {comments.filter(m => m.children).filter(m => m.content).map((comment) => <TopComment key={comment.uuid} doorNumber={doorNumber} comment={comment} myLikes={likes} />)}
        </section>
    )
}

interface CommentFormProps {
    doorNumber: number,
    appendComment: (comment: Comment) => void
}

const CommentForm: FC<CommentFormProps> = ({ doorNumber, appendComment }) => {
    const [comment, setComment] = useState<string>('')
    // this is kind of a lame hack to avoid double submits if the user presses the button fast.
    const [disableButton, setDisableButton] = useState<boolean>(false)

    const { createComment } = useRequestsAndAuth();
    const postComment = () => {
        setDisableButton(true)
        createComment(doorNumber, comment)
            .then(response => {
                appendComment(response.data)
                setComment('')
                setDisableButton(false)
            })
            .catch(e => { });

    }


    return (
        <form className="CommentForm">
            <TextareaAutosize
                name="comment"
                value={comment}
                onChange={e => setComment(e.currentTarget.value)}
                id="comment"
                placeholder={
                    "Legg igjen en kommentar! Vi har støtte for markdown med " +
                    "syntax highlighting. Alle blokk-elementer (kode, lister, " +
                    "tabeller, etc.) krever en hel linje whitespace rundt seg."
                }
            />
            <div>
                <button className="SubmitButton" disabled={!comment || disableButton} onClick={(e) => { e.preventDefault(); postComment() }} value="Lagre">KOMMENTER</button>
            </div>
        </form>
    )
}


export default CommentsSection;
