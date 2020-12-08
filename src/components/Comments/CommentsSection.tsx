import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';

import useRequestsAndAuth from '../../hooks/useRequestsAndAuth';
import './Comments.css';
import { ParentComment } from '../../api/Comment';
import TopComment from './TopComment';
import Like from '../../api/Like';
import Button from '../Button';
import useBoolean from '../../hooks/useBoolean';

interface CommentsSectionProps {
    doorNumber: number;
};

const CommentsSection: FC<CommentsSectionProps> = ({ doorNumber }) => {
    const { isAuthenticated, isAdmin, fetchComments, fetchLikes } = useRequestsAndAuth();
    const [comments, setComments] = useState<ParentComment[]>([]);
    const [likes, setLikes] = useState<Like[]>([]);
    const [isCommentFormVisible, setIsCommentFormVisible] = useState(true);
    const hideCommentForm = useCallback(() => setIsCommentFormVisible(false), []);
    const showCommentForm = useCallback(() => setIsCommentFormVisible(true), []);

    useEffect(() => {
        if (!isAuthenticated && !isAdmin) return;

        fetchComments(doorNumber)
            .then((response) => setComments(response.data))
            .catch((e) => { /* ... something ... */ })
        fetchLikes()
            .then((response) => setLikes(response.data))
            .catch((e) => { /* ... something ... */ })
    }, [isAdmin, isAuthenticated, fetchComments, doorNumber, fetchLikes]);

    const appendComment = (comment: ParentComment) => {
        setComments([...comments, comment])
    };

    return (
        <section className="CommentSection">
            {isCommentFormVisible
              ? <CommentForm doorNumber={doorNumber} appendComment={appendComment} hideCommentForm={hideCommentForm} />
              : (<div className="bg-gray-100 rounded-md mx-auto mb-16 px-8 py-4 w-96 space-y-4 flex flex-col justify-center">
                  <div className="text-center">Du finner kommentaren din nederst!</div>
                  <Button onClick={showCommentForm}>Legg igjen ny kommentar?</Button>
                </div>)
            }
            {
              comments.filter(m => m.children && m.content)
                      .map((comment) => <TopComment key={comment.uuid} doorNumber={doorNumber} comment={comment} myLikes={likes} />)
            }
        </section>
    )
}

interface CommentFormProps {
    doorNumber: number;
    appendComment: (comment: ParentComment) => void;
    hideCommentForm: () => void;
};

const CommentForm: FC<CommentFormProps> = ({ doorNumber, appendComment, hideCommentForm }) => {
    const { isAuthenticated, isAdmin, createComment } = useRequestsAndAuth();
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [submitting, setSubmitting, setNotSubmitting] = useBoolean(false);

    const postComment = useCallback(() => {
      if (!textareaRef.current) return;

      setSubmitting();
      createComment(doorNumber, textareaRef.current.value)
        .then((response) => {
          appendComment(response.data);
          setNotSubmitting();
          hideCommentForm();
        })
        .catch((e) => setNotSubmitting())
    }, [doorNumber, appendComment, createComment, hideCommentForm, setSubmitting, setNotSubmitting]);

    // Prevent admins from accidentially submitting comments without being logged in.
    if (isAdmin && !isAuthenticated) return null;

    return (
        <div className="CommentForm bg-gray-100 rounded-md my-8 px-4 pt-4 pb-2 flex flex-col items-end">
            <TextareaAutosize
                ref={textareaRef}
                placeholder={
                    "Legg igjen en kommentar! Vi har støtte for markdown med " +
                    "syntax highlighting. Alle blokk-elementer (kode, lister, " +
                    "tabeller, etc.) krever en hel linje whitespace rundt seg."
                }
            />
            <div>
                <button className="SubmitButton" disabled={submitting} onClick={postComment} value="Lagre">KOMMENTER</button>
            </div>
        </div>
    )
}


export default CommentsSection;
