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

    const [showReplyInput, setShowReplyInput] = useState<boolean>(false);

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
                <div className='CommentFooterItem LikeWrapper'>
                    <Favorite className={true ? 'favoriteSvgLiked' : 'favoriteSvg'} />
                    <p>{comment.likes}</p>
                </div>
                <button className='CommentFooterItem btnReply' onClick={() => setShowReplyInput(true)}>SKRIV SVAR</button>

                <button className='CommentFooterItem btnReplies' onClick={() => alert("asdasd")}>
                    <p>Vis {comment.children?.length} svar</p>
                    <Chevron className={true ? 'Chevron Rotate' : 'Chevron'} />
                </button>

            </div>

            {showReplyInput ? <div className='ReplyBox'>
                <div className='ReplyBoxInput'>
                    <img className="ProfileImage" src="https://placekitten.com/100/100" alt="User avatar" />
                    <TextareaAutosize id='ReplyText' placeholder='Legg til svar' />
                </div>
                <div className='ReplyBoxButtons'>
                    <button className='ReplyBoxBtn' onClick={() => alert("woolp")}>AVBRYT</button>
                    <button className='ReplyBoxBtn'>SVAR</button>
                </div>
            </div> : null}


            <div className="SubComments">
                {comment.children?.map(comment => <SubComment comment={comment} />)}
            </div>

        </div>
    )
}

export default TopComment;