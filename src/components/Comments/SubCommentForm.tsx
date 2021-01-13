import React, { FC, useCallback, useEffect, useRef } from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';

import useRequestsAndAuth from '../../hooks/useRequestsAndAuth';
import useBoolean from '../../hooks/useBoolean';


interface SubCommentFormProps {
  showSubCommentForm: boolean;
  setShowSubCommentForm: (state: boolean) => void;
  refreshParentComment: () => void;
  doorNumber: string;
  parentId: string;
};

const SubCommentForm: FC<SubCommentFormProps> = ({ showSubCommentForm, setShowSubCommentForm, refreshParentComment, doorNumber, parentId }) => {
  const { isAuthenticated, isAdmin, createChildComment, user } = useRequestsAndAuth();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [submitting, setSubmitting, setNotSubmitting] = useBoolean(false);

  const hideForm = useCallback(() => setShowSubCommentForm(false), [setShowSubCommentForm]);

  // Focus textarea on every render. Should in practice only happen once, when
  // the form is first shown.
  useEffect(() => {
    textareaRef.current?.focus();
  });

  const postSubComment = useCallback(() => {
    if (!textareaRef.current) return;

    setSubmitting();
    createChildComment(doorNumber, textareaRef.current.value, parentId)
      .then(() => {
        setNotSubmitting();
        refreshParentComment();
        hideForm();
      })
      .catch(setNotSubmitting)
  }, [createChildComment, doorNumber, hideForm, parentId, refreshParentComment, setNotSubmitting, setSubmitting]);

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
          <button className='m-2' disabled={submitting} onClick={postSubComment}>SVAR</button>
        </div>
      </div>
    </div>
  );
};

export default SubCommentForm;
