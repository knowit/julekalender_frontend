import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from "react-router-dom";

import './Door.css';
import Light from '../Light';
import CommentsSection from '../Comments/CommentsSection';
import { useRequestsAndAuth } from '../../api/requests';
import DoorBorder from './DoorBorder';
import BackToDoorsButton from '../BackToDoorsButton';
import Challenge from './Challenge';


const Door = () => {
  let { doorNumber } = useParams<Record<string, string>>();
  const { isAuthenticated, fetchSolvedStatus } = useRequestsAndAuth();
  const [isDoorSolved, setIsDoorSolved] = useState(false);
  const [fubar, setError] = useState<Error>();

  useEffect(() => {
    if (!isAuthenticated) return;

    fetchSolvedStatus()
      .then((response) => setIsDoorSolved(response.data[doorNumber]))
      .catch((e) => setError(e))
  }, [isAuthenticated, fetchSolvedStatus, setIsDoorSolved, doorNumber])

  // If opened door is in the future, redirect to root.
  // this is sort of hacky, and can probably be done better.
  if (new Date().getDate() < parseInt(doorNumber)) {
    return <Redirect to="/" />
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
              <Challenge
                doorNumber={doorNumber}
                isDoorSolved={isDoorSolved}
                setIsDoorSolved={setIsDoorSolved}
              />
          </div>
          {isAuthenticated && isDoorSolved && <CommentsSection doorNumber={parseInt(doorNumber)} />}
      </main>
  )
}


export default Door;
