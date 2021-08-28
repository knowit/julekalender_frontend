import { FC, useEffect, useState } from 'react';
import _ from 'lodash';

import useHighlightJs from '../../hooks/useHighlightJs';
import useRequestsAndAuth from '../../hooks/useRequestsAndAuth';
import Input from './Input';
import { Challenge as ChallengeType } from '../../api/Challenge';


interface ChallengeProps {
    doorNumber: string;
    isDoorSolved: boolean;
    setIsDoorSolved: (value: boolean) => void;
};

const Challenge: FC<ChallengeProps> = ({ doorNumber, isDoorSolved, setIsDoorSolved }) => {
  const { fetchChallenge, createSolution } = useRequestsAndAuth();
  const [challenge, setChallenge] = useState<ChallengeType>();
  const challengeContentRef = useHighlightJs<HTMLDivElement>();
  const [attemptCount, setAttemptCount] = useState(0);
  const [isWaitingForSolutionResponse, setIsWaitingForSolutionResponse] = useState(false);
  const [fubar, setError] = useState<Error>();

  useEffect(() => {
    fetchChallenge(doorNumber)
      .then((response) => {
        setError(undefined);
        setChallenge(response.data);
      })
      .catch((e) => setError(e))
  }, [fetchChallenge, doorNumber])

  const submitAnswer = (answer: string) => {
    if (_.isNil(doorNumber)) return;

    setIsWaitingForSolutionResponse(true);

    // TODO: Handle rate limiting
    createSolution(doorNumber, answer)
      .then((response) => {
        setIsWaitingForSolutionResponse(false);
        setIsDoorSolved(response.data.solved)
        setAttemptCount((count) => count + 1)
      })
      .catch((error) => setError(error))
  }

  if (fubar !== undefined) {
    return <><h1>Ooops...</h1><pre>{fubar.message}</pre></>
  }

  if (!challenge) return null;

  return (
    <>
      <div className="mt-6 text-center pb-4 md:pb-6 border-b-2">
        <h1 className="text-4xl font-semibold">{challenge.title}</h1>
        <p className="mt-1"><em>Av {challenge.author}</em></p>
      </div>
      <div
        className="my-4 md:my-6 lg:my-12 mx-auto prose prose-sm md:prose max-w-none md:max-w-none break-words"
        ref={challengeContentRef}
        dangerouslySetInnerHTML={{ __html: challenge.content }}
      />
      <Input
        doorNumber={doorNumber}
        isDoorSolved={isDoorSolved}
        isFirstSubmit={attemptCount === 0}
        isWaitingForSolutionResponse={isWaitingForSolutionResponse}
        onSubmit={submitAnswer}
      />
    </>
  );
}

export default Challenge;
