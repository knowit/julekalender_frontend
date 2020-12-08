import React, { FC, useCallback, useRef } from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';
import { User } from '@auth0/auth0-react/dist/auth-state';

import useRequestsAndAuth from '../../hooks/useRequestsAndAuth';
import useBoolean from '../../hooks/useBoolean';
import { Comment } from '../../api/Comment';


interface SubCommentFormProps {
  showSubCommentForm: boolean;
  setShowSubCommentForm: (state: boolean) => void;
  appendSubComment: (comment: Comment) => void;
  doorNumber: number;
  parentId: string;
};

const SubCommentForm: FC<SubCommentFormProps> = ({ showSubCommentForm, setShowSubCommentForm, appendSubComment, doorNumber, parentId }) => {
  const { isAuthenticated, isAdmin, createChildComment, user } = useRequestsAndAuth();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [submitting, setSubmitting, setNotSubmitting] = useBoolean(false);

  const hideForm = useCallback(() => setShowSubCommentForm(false), [setShowSubCommentForm]);

  const postSubComment = useCallback((content) => {
    return createChildComment(doorNumber, content, parentId)
      .then((response) => {
        appendSubComment(response.data)
      })
      .catch((e) => { })
  }, [doorNumber, parentId, appendSubComment, createChildComment]);

  // This may submit weird data if submitting while debounced content is pending
  const postComment = useCallback(() => {
    if (!textareaRef.current) return;

    setSubmitting();
    postSubComment(textareaRef.current.value)
      .then(() => {
        setShowSubCommentForm(false);
        setNotSubmitting();
      })
      .catch((e) => setNotSubmitting());
  }, [postSubComment, setShowSubCommentForm, setSubmitting, setNotSubmitting]);

  // Prevent admins from accidentially submitting comments without being logged in.
  if (!showSubCommentForm || (isAdmin && !isAuthenticated)) return null;

  return (
    <div className='pt-6'>
      <div className='flex flex-row'>
        <img className='rounded-full h-16 w-16 flex items-center justify-center mr-2' loading="lazy" src={user?.picture} alt="User avatar" />
        <TextareaAutosize
          ref={textareaRef}
          className='w-full text-base border-b-2 outline-none'
          placeholder='Legg til svar'
        />
      </div>
      <div className='grid justify-items-stretch'>
        <div className='justify-self-end'>
          <button className='m-2' onClick={hideForm}>AVBRYT</button>
          <button className='m-2' disabled={submitting} onClick={postComment}>SVAR</button>
        </div>
      </div>
    </div>
  );
};

export default SubCommentForm;
