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
        <div className="Comment">
            <div className="CommentView">
                <img className="ProfileImage" src={comment.author.picture} alt="User avatar" />
                <div className="CommentData">
                    <span className="CommentName">{comment.author.nickname}</span><time>{timestamp}</time>
                    <div className="prose" dangerouslySetInnerHTML={{ __html: comment.content }} />
                </div>
            </div>

            <div className='CommentFooter'>
                <LikeButton comment={comment} myLikes={myLikes}/>
                <button className='CommentFooterItem btnReply' onClick={() => toggleShowReplyInput(!showReplyInput)}>KOMMENTER INNLEGG</button>
                {comment.children?.length ? <button className='CommentFooterItem btnReplies' onClick={() => toggleSubComments(!showSubComments)}>
                    <span>{`${showSubComments ? "Skjul" : "Vis"} ${comment.children?.length} svar`}</span>
                    <Chevron className={`Chevron ${showSubComments ? 'Rotate' : ''}`} />
                </button> : null}

            </div>

            {showReplyInput ? <div className='ReplyBox'>
                <div className='ReplyBoxInput'>
                    <img className="ProfileImage" src={userAvatar} alt="User avatar" />
                    <TextareaAutosize value={replyContent} onChange={event => setReplyContent(event.currentTarget.value)} className='ReplyText' placeholder='Legg til svar' />
                </div>
                <div className='ReplyBoxButtons'>
                    <button className='ReplyBoxBtn' onClick={() => { setReplyContent(""); toggleShowReplyInput(false) }}>AVBRYT</button>
                    <button className='ReplyBoxBtn' onClick={(e) => { e.preventDefault(); postSubComment() }}>SVAR</button>
                </div>
            </div> : null}

            {showSubComments ?
                <div className="SubComments">
                    {comment.children?.map(subcomment => <SubComment key={subcomment.uuid} comment={subcomment} myLikes={myLikes} />)}
                </div> : null}

        </div>
    )
}

export default TopComment
