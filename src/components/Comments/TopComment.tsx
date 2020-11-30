import React, { FC, useState } from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';
import { ReactComponent as Chevron } from '../svg/expand_more.svg';
import SubComment from './SubComment';
import ParentComment from '../../api/Comment';
import Like from '../../api/Like';
import { useAuth0 } from '@auth0/auth0-react';
import { getTimeStamp } from '../../utils';
import LikeButton from './LikeButton';
import { useRequests } from '../../api/requests';


interface CommentProps {
    comment: ParentComment
    myLikes: Like[]
    doorNumber: number
}
const TopComment: FC<CommentProps> = ({ comment, myLikes, doorNumber }) => {
    const [showReplyInput, toggleShowReplyInput] = useState<boolean>(false)
    const [showSubComments, toggleSubComments] = useState<boolean>(true)
    const [replyContent, setReplyContent] = useState<string>('')
    const { user } = useAuth0();
    const { picture: userAvatar } = user;
    const timestamp = getTimeStamp(comment.created_at)
    const { createComment } = useRequests()

    const postSubComment = () => {
        console.log('subcomment...')
        console.log('doornumber: ' + doorNumber)
        console.log('subcomment: ' + replyContent)
        console.log('comment: ' + comment.content)
        console.log('uuid: ' + comment.uuid)
        /*createComment(doorNumber, replyContent, comment.uuid)
            .then(response => {
                console.log(response)
            })
            .catch(e => {})*/
    }

    return (
        <div className='flex bg-white mb-4'>
            <div className='w-1/5 pt-4 pl-4 pb-4'>
                <img className='rounded-full h-20 w-20 flex items-center justify-center' src={comment.author.picture} alt="User avatar" />
            </div>
            <div className='w-4/5 pt-4 pr-4 pb-4'>
                <span className='font-semibold'>{comment.author.nickname}</span><time className='float-right'>{timestamp}</time>
                <div className='prose prose-sm md:prose max-w-none' dangerouslySetInnerHTML={{ __html: comment.content }} />
                <div className='grid grid-cols-2 justify-items-stretch'>
                    <div className='justify-self-start'>
                        <LikeButton comment={comment} myLikes={myLikes}/>
                        <button className='bg-white font-bold' onClick={() => toggleShowReplyInput(!showReplyInput)}>KOMMENTER INNLEGG</button>
                    </div>
                    <div className='justify-self-end'>
                        { comment.children?.length ? 
                            <button className='flex' onClick={() => toggleSubComments(!showSubComments)}>
                            <span className='w-4/5'>{`${showSubComments ? "Skjul" : "Vis"} ${comment.children?.length} svar`}</span>
                            <div className='w-1/5 mt-3'>
                                <Chevron className={`w-4 transition-all duration-500 ${showSubComments ? 'transform -rotate-180' : ''}`} />
                            </div>
                            </button>: null
                        }
                    </div>
                </div>
                {showReplyInput ? <div className='pt-4'>
                <div className='flex flex-row'>
                    <img className='rounded-full h-16 w-16 flex items-center justify-center mr-2' src={userAvatar} alt="User avatar" />
                    <TextareaAutosize 
                        value={replyContent} 
                        onChange={event => setReplyContent(event.currentTarget.value)} 
                        className='w-full text-base border-b-2 border-black outline-none' 
                        placeholder='Legg til svar' 
                    />
                </div>
                <div className='grid justify-items-stretch'>
                    <div className='justify-self-end'>
                        <button className='m-2' onClick={() => { setReplyContent(""); toggleShowReplyInput(false) }}>AVBRYT</button>
                        <button className='m-2' onClick={(e) => { e.preventDefault(); postSubComment() }}>SVAR</button>
                    </div>
                </div>
                </div> : null}

                {showSubComments ?
                    <div className='flex flex-col content-end'>
                        {comment.children?.map(subcomment => <SubComment key={subcomment.uuid} comment={subcomment} myLikes={myLikes} />)}
                    </div> : null}
                </div>
        </div>
    )
}

export default TopComment
