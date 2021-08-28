import { FC, useCallback } from 'react';

import { Comment } from '../../api/Comment';
import Like from '../../api/Like';
import useHighlightJs from '../../hooks/useHighlightJs';
import useOwnComment from '../../hooks/useOwnComment';
import { getTimeStamp } from '../../utils';
import Button from '../Button';
import DeletedSubComment from './DeletedSubComment';
import LikeButton from './LikeButton';


interface SubCommentProps {
    comment: Comment;
    myLikes: Like[];
    deleteComment: (comment: Comment, confirm: string) => void;
}

const SubComment: FC<SubCommentProps> = ({ comment, myLikes, deleteComment }) => {
    const commentContentRef = useHighlightJs<HTMLDivElement>();
    const isOwnPost = useOwnComment(comment);
    const timestamp = getTimeStamp(comment.created_at);

    const deleteSubCommentOnClick = useCallback(() => deleteComment(
        comment,
        "Er du sikker på at du vil slette innlegget ditt? Andre brukere kan se " +
        "at det har vært et innlegg her, men forfatter og innhold blir slettet."
    ) , [comment, deleteComment]);

    if (comment.deleted) return <DeletedSubComment comment={comment} />;

    return (
        <div className='flex p-2 mb-4 bg-gray-200 rounded-sm'>
            <div className='w-1/12'>
                <img className='rounded-full w-full flex items-center justify-center' loading="lazy" src={comment.author.picture} alt="User avatar" />
            </div>
            <div className='w-11/12 ml-2'>
                <header className="space-x-4">
                    <span className='font-semibold'>{comment.author.nickname}</span>
                    <time className='float-right'>{timestamp}</time>
                    {isOwnPost && <Button className="float-right font-semibold" underline={false} onClick={deleteSubCommentOnClick}>Slett innlegg</Button>}
                </header>
                <div className='prose prose-sm md:prose max-w-none md:max-w-none mt-2 break-words' ref={commentContentRef} dangerouslySetInnerHTML={{ __html: comment.content }} />
                <footer>
                    <div className='mb-2'>
                        <LikeButton comment={comment} myLikes={myLikes} />
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default SubComment;
