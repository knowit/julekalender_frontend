import React, { useEffect, useState } from 'react';
import './Door.css';
import { Link, Redirect, useParams } from "react-router-dom";
import Light from './Light';
import { ReactComponent as Border } from './svg/mistletoeborder.svg';
import Axios, { AxiosError } from 'axios';
import Challenge from '../api/Challange';
import { useAuth0 } from '@auth0/auth0-react';
import Comments from './Comments';



const Door = () => {
    let { doorNumber } = useParams<Record<string, string>>();
    const { isAuthenticated, getAccessTokenSilently, getIdTokenClaims } = useAuth0();
    const [token, setToken] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [challange, setChallange] = useState<Challenge>({} as Challenge);
    const [fubar, setError] = useState<Error>();

    useEffect(() => {
        Axios.get<Challenge>(`http://10.205.4.110:3000/challenges/${doorNumber}`, { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } })
            .then(response => {
                if (response.status === 202) {
                    alert("Hei, ingen juksing!")
                }
                setChallange(response.data);
                setIsLoading(false)
            })
            .catch((e: AxiosError) => setError(e))
    }, [doorNumber])

    useEffect(() => {
        const getTokenData = async () => {
            try {
                // For some reason getAccessTokenSilently must be run, or else getIdTokenClaims will return nothing.
                const accessToken = await getAccessTokenSilently({
                    user_audience: '6TmycgoSWgFT8EU6COixHKne9JmLx5F4',
                    scope: "read:current_user",
                })
                const claims = await getIdTokenClaims()
                const IdToken = claims.__raw
                setToken(IdToken)
            } catch (e) {
                console.log(e.message)
            }
            }
      
        getTokenData()
      }, [])

    useEffect(() => {
        const payload = {
            answer: 'pinsir',
        }
    
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `${token}`
            }
        }

        Axios.post('http://10.205.4.110:3000/challenges/1/solutions', payload, axiosConfig)
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }, [token])

    if (isLoading) {
        return null
    }


    // If opened door is in the future, redirect to root.
    // this is sort of hacky, and can probably be done better.
    if (new Date().getDate() < parseInt(doorNumber)) {
        return <Redirect to="/" />
    }

    if (challange === undefined) {
        return null
    }

    if (fubar !== undefined) {
    return <><h1>Ooops...</h1><pre>{fubar.message}</pre></>
    }

    return <>
        <main className="DoorWrapper">
            <Link className="BackButton" tabIndex={4} to="/">&larr; Tilbake til lukene</Link>

            <Light nr={parseInt(doorNumber)} />
            <div className="BorderWrapper">
                <Border className="Border" />
            </div>
            <div className="Door">
                <div dangerouslySetInnerHTML={{ __html: challange.content }} />

                <div className="input">
                    {isAuthenticated ? <form>
                        <input placeholder="Ditt svar:" />
                        <input type="submit" value="Send inn svar" />
                    </form> : <p>Logg inn for å delta!</p>}
                </div>

            </div>
            {isAuthenticated && <Comments />}
        </main>
    </>
}


export default Door;