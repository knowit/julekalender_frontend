import React, { FC, useState } from 'react';
import './Comments.css';
import Comment from '../api/Comment';
import TextareaAutosize from 'react-autosize-textarea/lib';
import { ReactComponent as Favorite } from './svg/favorite.svg';
import { ReactComponent as Chevron } from './svg/expand_more.svg';

const Comments = () => {
    const dummyData: Comment[] = [{ content: "Foo bar baz", likes: 3 }, { content: "Foo bar baz", likes: 3 }, { content: "Foo bar baz", likes: 3 }]
    return <section className="CommentSection">
        {dummyData.map(comment => <CommentView comment={comment} />)}
        <CommentForm />
    </section>
}

interface CommentProps {
    comment: Comment;
}

const CommentView: FC<CommentProps> = ({ comment }) => {
    const [replies, setReplies] = useState(false) // Hide/Show replies
    const [answer, setAnswer] = useState(false) // Hide/Show answer
    const [displayReplies, setDisplayReplies] = useState(true) // Hide/Show the show replies button when the reply section is open

    // Placeholder data
    const data = {
        liked: false,
        likes: 12,
        repliesNumber: 2
    }

    const toggleReplies = () => {
        setReplies(!replies)
    }

    const toggleAnswer = () => {
        setAnswer(!answer)
        setDisplayReplies(answer ? true : false)
        setReplies(answer && replies ? true : false)
    }

    const subComments: Comment[] = [{ content: "Foo bar baz", likes: 3 }, { content: "Foo bar baz", likes: 3 }, { content: "Foo bar baz", likes: 3 }]

    return (
        <div className="Comment">
            <div className="CommentView">
                <img className="ProfileImage" src="https://placekitten.com/100/100" alt="User avatar" />
                <div className="CommentData">
                    <span className="CommentName">Name</span><time>12. des 14:27</time>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mattis gravida est id dapibus. Quisque at massa lacinia, ultrices metus et, efficitur orci. Nam lacinia porta congue. Pellentesque purus massa, tempus a semper sit amet, blandit vitae massa. Curabitur sed velit elit. In sem nisi, convallis id maximus sed, laoreet ut turpis. Maecenas mattis lorem id lacus vulputate rhoncus. Proin ornare finibus commodo. Nam maximus quis massa at molestie. Aenean rutrum est sit amet pretium dapibus. Vivamus eget posuere mi. Quisque quis turpis vulputate nisl condimentum ornare sed vel magna. Maecenas ultricies pretium lacus. Pellentesque sodales dignissim felis. Vestibulum ipsum nibh, molestie eu rhoncus eu, vestibulum non odio.</p>
                </div>
            </div>
            <div className='CommentFooter'>
                <div className='CommentFooterItem LikeWrapper'>
                    <Favorite className={data.liked ? 'favoriteSvgLiked' : 'favoriteSvg'}/>
                    <p>{data.likes}</p>
                </div>
                <button className='CommentFooterItem btnAnswer' onClick={toggleAnswer}>SVAR</button>
                {   displayReplies &&
                        <button className='CommentFooterItem btnReplies' onClick={toggleReplies}>
                            <p>vis {data.repliesNumber} svar </p>
                            <Chevron className={replies ? 'Chevron Rotate' : 'Chevron'}/>
                        </button>
                }
            </div>
            { answer &&
                <div className='AnswerBox'>
                    <div className='AnswerBoxInput'>
                        <img className="ProfileImage" src="https://placekitten.com/100/100" alt="User avatar"/>
                        <TextareaAutosize id='AnswerText' placeholder='Legg til svar'/>
                    </div>
                    <div className='AnswerBoxButtons'>
                        <button className='AnswerBoxBtn' onClick={toggleAnswer}>AVBRYT</button>
                        <button className='AnswerBoxBtn'>SVAR</button>
                    </div>
                </div>
            }
            { replies && 
                <div className="SubComments">
                    {subComments.map(comment => <SubComment comment={comment} />)}
                </div>
            }
        </div>
    )
}  


const SubComment: FC<CommentProps> = ({ comment }) => {
    return <div className="SubComment">
        <img className="ProfileImage" src="https://placekitten.com/100/100" alt="User avatar" />
        <div className="CommentData">
            <span className="CommentName">Name</span><time>12. des 14:27</time>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mattis gravida est id dapibus. Quisque at massa lacinia, ultrices metus et, efficitur orci. Nam lacinia porta congue. Pellentesque purus massa, tempus a semper sit amet, blandit vitae massa. Curabitur sed velit elit. In sem nisi, convallis id maximus sed, laoreet ut turpis. Maecenas mattis lorem id lacus vulputate rhoncus. Proin ornare finibus commodo. Nam maximus quis massa at molestie. Aenean rutrum est sit amet pretium dapibus. Vivamus eget posuere mi. Quisque quis turpis vulputate nisl condimentum ornare sed vel magna. Maecenas ultricies pretium lacus. Pellentesque sodales dignissim felis. Vestibulum ipsum nibh, molestie eu rhoncus eu, vestibulum non odio.</p>
        </div>
    </div>
}

const CommentForm = () => {
    return <form className="CommentForm">
        <TextareaAutosize name="comment" id="comment" placeholder="Legg igjen en kommentar, gjerne i Markdown :)" />
        <button className="SubmitButton" onClick={(e) => { e.preventDefault(); alert("click") }} value="Lagre">Skriv kommentar!</button>
    </form>
}


export default Comments;