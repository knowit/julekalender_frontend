import React, { Dispatch, FC, SetStateAction, useCallback, useRef } from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';

import useRequestsAndAuth from '../../hooks/useRequestsAndAuth';
import { ParentComment } from '../../api/Comment';
import useBoolean from '../../hooks/useBoolean';

type CommentFormProps = {
  doorNumber: string;
  setComments: Dispatch<SetStateAction<ParentComment[]>>;
  hideCommentForm: () => void;
};

const CommentForm: FC<CommentFormProps> = ({ doorNumber, setComments, hideCommentForm }) => {
  const { isAuthenticated, isAdmin, createComment } = useRequestsAndAuth();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [submitting, setSubmitting, setNotSubmitting] = useBoolean(false);

  const postComment = useCallback(() => {
    if (!textareaRef.current) return;

    setSubmitting();
    createComment(doorNumber, textareaRef.current.value)
      .then((response) => {
        setComments((comments) => [...comments, response.data]);
        setNotSubmitting();
        hideCommentForm();
      })
      .catch((e) => setNotSubmitting())
  }, [setSubmitting, createComment, doorNumber, setComments, setNotSubmitting, hideCommentForm]);

  // Prevent admins from accidentially submitting comments without being logged in.
  if (isAdmin && !isAuthenticated) return null;

  return (
    <div className="bg-gray-100 rounded-md my-8 px-4 pt-4 pb-2 flex flex-col items-end">
      <TextareaAutosize
        className="block w-full h-16 p-0 border-0 bg-transparent border-b-2 border-gray-700"
        ref={textareaRef}
        placeholder={
          "Legg igjen en kommentar! Vi har støtte for markdown med " +
          "syntax highlighting. Alle blokk-elementer (kode, lister, " +
          "tabeller, etc.) krever en hel linje whitespace rundt seg."
        }
      />
      <div>
        <button className="bg-none border-none cursor-pointer ml-4 p-4 font-medium" disabled={submitting} onClick={postComment} value="Lagre">KOMMENTER</button>
      </div>
    </div>
  )
}


export default CommentForm;
