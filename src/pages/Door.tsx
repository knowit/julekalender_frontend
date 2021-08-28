import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import Light from '../components/Light';
import CommentsSection from '../components/Comments/CommentsSection';
import useRequestsAndAuth from '../hooks/useRequestsAndAuth';
import DoorBorder from '../components/Door/DoorBorder';
import BackToDoorsButton from '../components/BackToDoorsButton';
import Challenge from '../components/Door/Challenge';


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

  if (fubar !== undefined) {
    return (<><h1>Ooops...</h1><span>{fubar.message}</span></>);
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
          {isAuthenticated && isDoorSolved && <CommentsSection doorNumber={doorNumber} />}
      </main>
  )
}


export default Door;
