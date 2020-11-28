import React, { useEffect, useState } from 'react';
import { Link, Redirect, useParams } from "react-router-dom";
import _ from 'lodash';

import './Door.css';
import Light from './Light';
import { ReactComponent as Border } from './svg/mistletoeborder.svg';
import { Challenge } from '../api/Challenge';
import CommentsSection from './Comments/CommentsSection';
import { useRequests } from '../api/requests';


const Door = () => {
    let { doorNumber } = useParams<Record<string, string>>();
    const { isAuthenticated, fetchChallenge, fetchSolvedStatus, createSolution } = useRequests();
    const [answer, setAnswer] = useState<string>('');
    const [doorSolvedStatus, setDoorSolvedStatus] = useState(false);
    const [attempt, setAttempt] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [challenge, setChallenge] = useState<Challenge>({} as Challenge);
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
        .then((response) => setDoorSolvedStatus(response.data[`${doorNumber}`]))
        .catch((e) => setError(e))
    }, [isAuthenticated, fetchSolvedStatus, setDoorSolvedStatus, doorNumber])
    
    const sendAnswer = () => {
      if (_.isNil(doorNumber)) return;

      // TODO: Handle rate limiting
      createSolution(doorNumber, answer)
        .then((response) => {
            setDoorSolvedStatus(response.data.solved)
            setAttempt(!response.data.solved)
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

    // TODO: Lightbulb overlays title
    return <>
        <main className="DoorWrapper">
            <Link className="BackButton" tabIndex={4} to="/">&larr; Tilbake til lukene</Link>
            <Light nr={parseInt(doorNumber)} solved={doorSolvedStatus}/>
            <div className="BorderWrapper">
                <Border className="Border" />
            </div>
            <div className="Door">
                <div dangerouslySetInnerHTML={{ __html: challenge.content }} />
                {!doorSolvedStatus &&
                    <div className="input">
                        {
                            isAuthenticated ?
                                <div>
                                    {!doorSolvedStatus && attempt &&
                                        <p className='WrongAnswer'>Feil svar!</p>
                                    }
                                    <input placeholder='Ditt svar:' value={answer} onChange={e => setAnswer(e.target.value)}/>
                                    <button onClick={sendAnswer}>Send inn svar</button>
                                </div>
                            :   
                                <p>Logg inn for å delta!</p>
                        }
                    </div>
                }
            </div>
            {isAuthenticated && <CommentsSection doorNumber={parseInt(doorNumber)}/>}
        </main>
    </>
}


export default Door;
