import React, { useEffect, useState } from 'react';
import './Door.css';
import { Link, Redirect, useParams } from "react-router-dom";
import Light from './Light';
import { ReactComponent as Border } from './svg/mistletoeborder.svg';
import Axios, { AxiosError } from 'axios';
import { Challenge } from '../api/Challenge';
import { useAuth0 } from '@auth0/auth0-react';
import Comments from './Comments';
import { apiUrl, requestHeaders } from '../api/ApiConfig';



const Door = () => {
    let { doorNumber } = useParams<Record<string, string>>();
    const { isAuthenticated } = useAuth0();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [challange, setChallange] = useState<Challenge>({} as Challenge);
    const [fubar, setError] = useState<Error>();

    useEffect(() => {
        Axios.get<Challenge>(`${apiUrl}/challenges/${doorNumber}`, {headers : requestHeaders})
            .then(response => {
                if (response.status === 202) {
                    alert("Hei, ingen juksing!")
                }
                setChallange(response.data);
                setIsLoading(false)
            })
            .catch((e: AxiosError) => setError(e))
    }, [doorNumber])

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
