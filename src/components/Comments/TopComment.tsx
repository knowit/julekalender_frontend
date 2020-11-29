import React, { FC, useState } from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';
import { ReactComponent as Chevron } from '../svg/expand_more.svg';
import { ReactComponent as Favorite } from '../svg/favorite.svg';
import SubComment from './SubComment';
import ParentComment from '../../api/Comment';
import Like from '../../api/Like';
import { useAuth0 } from '@auth0/auth0-react';
import { getTimeStamp } from '../../utils';
import { useRequests } from '../../api/requests';


interface CommentProps {
    comment: ParentComment;
    myLikes: Like[];
}
const TopComment: FC<CommentProps> = ({ comment, myLikes }) => {
    const [showReplyInput, toggleShowReplyInput] = useState<boolean>(false)
    const [showSubComments, toggleSubComments] = useState<boolean>(true)
    const [replyContent, setReplyContent] = useState<string>()
    const { createLike } = useRequests()
    const { user } = useAuth0();
    const { picture: userAvatar } = user;
    const timestamp = getTimeStamp(comment.created_at)
    var [likes, setLikes] = useState<number>(comment.likes)
    var [isCommentLiked, setIsCommentLiked] = useState<boolean>(myLikes.some((like) => like.post_uuid === comment.uuid))
    const [fubar, setError] = useState<Error>();


    const likePost = () => {
        createLike(comment.uuid)
            .then(_ => {
                setLikes(likes + 1);
                setIsCommentLiked(true);
            })
            .catch(e => setError(e))
    }

    if (fubar !== undefined) {
        return <><h1>Ooops...</h1><pre>{fubar.message}</pre></>
    }

    return (
        <div className="Comment">
            <div className="CommentView">
                <img className="ProfileImage" src={comment.author.picture} alt="User avatar" />
                <div className="CommentData">
                    <span className="CommentName">{comment.author.nickname}</span><time>{timestamp}</time>
                    <div dangerouslySetInnerHTML={{ __html: comment.content }} />
                </div>
            </div>
            <div className='CommentFooter'>
                <button onClick={() => likePost()}>
                    <Favorite className={isCommentLiked ? 'favoriteSvgLiked' : 'favoriteSvg'} />
                </button>
                <span>{likes}</span>
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
                    <button className='ReplyBoxBtn'>SVAR</button>
                </div>
            </div> : null}

            {showSubComments ?
                <div className="SubComments">
                    {comment.children?.map(comment => <SubComment key={comment.uuid} comment={comment} likes={myLikes} />)}
                </div> : null}

        </div>
    )
}

export default TopComment;
