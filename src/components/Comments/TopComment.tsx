import React, { FC, useState } from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';
import { ReactComponent as Chevron } from './../svg/expand_more.svg';
import { ReactComponent as Favorite } from './../svg/favorite.svg';
import SubComment from './SubComment';
import ParentComment from '../../api/Comment';



interface CommentProps {
    comment: ParentComment;
}

const TopComment: FC<CommentProps> = ({ comment }) => {
    const [showReplyInput, toggleShowReplyInput] = useState<boolean>(false);
    const [showSubComments, toggleSubComments] = useState<boolean>(true)
    const [replyContent, setReplyContent] = useState<string>()

    return (
        <div className="Comment">
            <div className="CommentView">
                <img className="ProfileImage" src="https://placekitten.com/100/100" alt="User avatar" />
                <div className="CommentData">
                    <span className="CommentName">Name</span><time>12. des 14:27</time>
                    <p>{comment.content}</p>
                </div>
            </div>
            <div className='CommentFooter'>
                <Favorite className={true ? 'favoriteSvgLiked' : 'favoriteSvg'} />
                <span>{comment.likes}</span>
                <button className='CommentFooterItem btnReply' onClick={() => toggleShowReplyInput(!showReplyInput)}>KOMMENTER INNLEGG</button>

                <button className='CommentFooterItem btnReplies' onClick={() => toggleSubComments(!showSubComments)}>
                    <span>{`${showSubComments ? "Skjul" : "Vis"} ${comment.children?.length} svar`}</span>
                    <Chevron className={`Chevron ${showSubComments ? 'Rotate' : ''}`} />
                </button>

            </div>

            {showReplyInput ? <div className='ReplyBox'>
                <div className='ReplyBoxInput'>
                    <img className="ProfileImage" src="https://placekitten.com/100/100" alt="User avatar" />
                    <TextareaAutosize value={replyContent} onChange={event => setReplyContent(event.currentTarget.value)} className='ReplyText' placeholder='Legg til svar' />
                </div>
                <div className='ReplyBoxButtons'>
                    <button className='ReplyBoxBtn' onClick={() => {setReplyContent(""); toggleShowReplyInput(false) }}>AVBRYT</button>
                    <button className='ReplyBoxBtn'>SVAR</button>
                </div>
            </div> : null}

            {showSubComments ?
                <div className="SubComments">
                    {comment.children?.map(comment => <SubComment comment={comment} />)}
                </div> : null}

        </div>
    )
}

export default TopComment;