import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from "react-router-dom";
import _ from 'lodash';

import './Door.css';
import Light from '../Light';
import { Challenge } from '../../api/Challenge';
import CommentsSection from '../Comments/CommentsSection';
import { useRequests } from '../../api/requests';
import Input from './Input';
import DoorBorder from './DoorBorder';
import BackToDoorsButton from '../BackToDoorsButton';


const Door = () => {
  let { doorNumber } = useParams<Record<string, string>>();
  const { isAuthenticated, fetchChallenge, fetchSolvedStatus, createSolution } = useRequests();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [challenge, setChallenge] = useState<Challenge>({} as Challenge);
  const [isDoorSolved, setIsDoorSolved] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [isWaitingForSolutionResponse, setIsWaitingForSolutionResponse] = useState(false);
  const [fubar, setError] = useState<Error>();

  useEffect(() => {
    fetchChallenge(doorNumber)
      .then((response) => {
        setChallenge(response.data);
        setIsLoading(false)
      })
      .catch((e) => setError(e))
  }, [fetchChallenge, doorNumber])

  useEffect(() => {
    if (!isAuthenticated) return;

    fetchSolvedStatus()
      .then((response) => setIsDoorSolved(response.data[doorNumber]))
      .catch((e) => setError(e))
  }, [isAuthenticated, fetchSolvedStatus, setIsDoorSolved, doorNumber])

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

  if (isLoading) {
    return null
  }

  // If opened door is in the future, redirect to root.
  // this is sort of hacky, and can probably be done better.
  if (new Date().getDate() < parseInt(doorNumber)) {
    return <Redirect to="/" />
  }

  if (challenge === undefined) {
    return null
  }

  if (fubar !== undefined) {
    return <><h1>Ooops...</h1><pre>{fubar.message}</pre></>
  }

  return (
      <main className="max-w-kodekalender mx-auto mt-10 relative text-gray-700">
          <BackToDoorsButton />
          <Light nr={parseInt(doorNumber)} solved={isDoorSolved} />
          <DoorBorder />
          <div className="py-8 px-8 md:px-12 mx-4 md:mx-8 bg-gray-100 rounded-md">
              <div className="mt-4">
                  <h1 className="text-4xl">{challenge.title}</h1>
                  <p className="mt-1"><em>Av {challenge.author}</em></p>
              </div>
              <div className="mt-6 prose" dangerouslySetInnerHTML={{ __html: challenge.content }} />
              <Input
            isDoorSolved={isDoorSolved}
            isFirstSubmit={attemptCount === 0}
            isWaitingForSolutionResponse={isWaitingForSolutionResponse}
            onSubmit={submitAnswer}
          />
          </div>
          {isAuthenticated && isDoorSolved && <CommentsSection doorNumber={parseInt(doorNumber)} />}
      </main>
  )
}


export default Door;
