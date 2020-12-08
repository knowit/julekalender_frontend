import React, { FC, useCallback, useState } from 'react';

import { ReactComponent as Chevron } from '../svg/expand_more.svg';
import SubComment from './SubComment';
import ParentComment from '../../api/Comment';
import Like from '../../api/Like';
import { getTimeStamp } from '../../utils';
import LikeButton from './LikeButton';
import { Comment } from '../../api/Comment';
import useHighlightJs from '../../hooks/useHighlightJs';
import SubCommentForm from './SubCommentForm';


interface CommentProps {
    comment: ParentComment
    myLikes: Like[]
    doorNumber: number
}

const TopComment: FC<CommentProps> = ({ comment, myLikes, doorNumber }) => {
    const [showSubCommentForm, setShowSubcommentForm] = useState<boolean>(false)
    const [showSubComments, setShowSubComments] = useState<boolean>(true)
    const [subComments, setSubComments] = useState<Comment[]>(comment.children)
    const commentContentRef = useHighlightJs<HTMLDivElement>();

    const timestamp = getTimeStamp(comment.created_at);

    const appendSubComment = useCallback((comment) => {
        setSubComments((subComments) => [...subComments, comment])
    }, [setSubComments]);

    const setShowSubcommentFormVisible = useCallback(() => setShowSubcommentForm(true), [setShowSubcommentForm]);
    const toggleShowSubComments = useCallback(() => setShowSubComments((state) => !state), [setShowSubComments]);

    return (
        <div className='flex rounded-md bg-gray-100 p-2 sm:p-4 mb-4'>
            <div className='w-1/12'>
                <img className='rounded-full w-full flex items-center justify-center' src={comment.author.picture} alt="User avatar" />
            </div>
            <div className='w-5/6 pr-4 pl-4'>
                <span className='font-semibold text-xl'>{comment.author.nickname}</span><time className='float-right'>{timestamp}</time>
                <div className='prose prose-sm md:prose max-w-none md:max-w-none mt-2 break-words' ref={commentContentRef} dangerouslySetInnerHTML={{ __html: comment.content }} />
                <div className='grid grid-cols-2 justify-items-stretch mt-4'>
                    <div className='justify-self-start'>
                        <LikeButton comment={comment} myLikes={myLikes} />
                        <button className='bg-gray-100 font-bold' onClick={setShowSubcommentFormVisible}>KOMMENTER INNLEGG</button>
                    </div>
                    <div className='justify-self-end'>
                        {subComments.length > 0 &&
                            <button className='' onClick={toggleShowSubComments}>
                                <span className='w-4/5'>{`${showSubComments ? "Skjul" : "Vis"} ${subComments.length} svar`}</span>
                                <Chevron className={`ml-1 inline w-4 transition-all duration-500 ${showSubComments ? 'transform -rotate-180' : ''}`} />
                            </button>
                        }
                    </div>
                </div>
                <SubCommentForm
                  showSubCommentForm={showSubCommentForm}
                  setShowSubCommentForm={setShowSubcommentForm}
                  appendSubComment={appendSubComment}
                  doorNumber={doorNumber}
                  parentId={comment.uuid}
                />
                {showSubComments ?
                    <div className='flex flex-col content-end mt-2'>
                        {subComments?.filter(comment => comment.content).map(subcomment => <SubComment key={subcomment.uuid} comment={subcomment} myLikes={myLikes} />)}
                    </div> : null}
            </div>
        </div>
    )
}

export default TopComment
