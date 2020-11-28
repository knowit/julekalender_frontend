import React, { useEffect, useState } from 'react';
import './Door.css';
import { Link, Redirect, useParams } from "react-router-dom";
import Light from './Light';
import { ReactComponent as Border } from './svg/mistletoeborder.svg';
import Axios, { AxiosError } from 'axios';
import { Challenge, SolvedStatus } from '../api/Challenge';
import { useAuth0 } from '@auth0/auth0-react';
import CommentsSection from './Comments/CommentsSection';
import { apiUrl, requestHeaders } from '../api/ApiConfig';



const Door = () => {
    let { doorNumber } = useParams<Record<string, string>>();
    const { isAuthenticated, getAccessTokenSilently, getIdTokenClaims } = useAuth0();
    const [token, setToken] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');
    const [doorSolvedStatus, setDoorSolvedStatus] = useState(false);
    const [attempt, setAttempt] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [challenge, setChallenge] = useState<Challenge>({} as Challenge);
    const [fubar, setError] = useState<Error>();

    useEffect(() => {
        Axios.get<Challenge>(`${apiUrl}/challenges/${doorNumber}`, {headers : requestHeaders})
            .then(response => {
                if (response.status === 202) {
                    alert("Hei, ingen juksing!")
                }
                setChallenge(response.data);
                setIsLoading(false)
            })
            .catch((e: AxiosError) => setError(e))
    }, [doorNumber])

    useEffect(() => {
        const getTokenData = async () => {
            try {
                // For some reason getAccessTokenSilently must be run, or else getIdTokenClaims will return nothing.
                await getAccessTokenSilently({
                    user_audience: '6TmycgoSWgFT8EU6COixHKne9JmLx5F4',
                    scope: 'read:current_user',
                })
                const claims = await getIdTokenClaims()
                const IdToken = claims.__raw
                setToken(IdToken)
            } catch (e) {
                    setError(e.message)
                }
            }
        getTokenData()
      }, [getAccessTokenSilently, getIdTokenClaims])

      useEffect(() => {
		if (isAuthenticated) {
			const getUserSolvedStatus = async () => {
				await getAccessTokenSilently({
					audience: 'https://knowit-konkurranser.eu.auth0.com/api/v2/',
					scope: 'read:current_user update:current_user_metadata'
				});
				const claims = await getIdTokenClaims()
				Axios.get<SolvedStatus>(`${apiUrl}/challenges/solved`, { headers: { ...requestHeaders, Authorization: `Bearer ${claims.__raw}` } })
					.then(response => {
                        setDoorSolvedStatus(response.data[`${doorNumber}`])
					})
					.catch((e: AxiosError) => setError(e))
			}
			getUserSolvedStatus()
		}
    }, [isAuthenticated, getAccessTokenSilently, getIdTokenClaims, setDoorSolvedStatus])
    
    const sendAnswer = () => {
        const payload = {
            solution: {
                answer: answer
            }
        }
    
        const axiosConfig = {
            headers: {
                'Content-Type': requestHeaders["Content-Type"],
                'Access-Control-Allow-Origin': requestHeaders["Access-Control-Allow-Origin"],
                'Authorization': `${token}`
            }
        }

        // TODO: Handle rate limiting
        Axios.post(`${apiUrl}/challenges/${doorNumber}/solutions`, payload, axiosConfig)
            .then(response => {
                console.log(response)
                setDoorSolvedStatus(response.data.solved)
                setAttempt(!response.data.solved)
            })
            .catch((error: AxiosError) => setError(error))
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
