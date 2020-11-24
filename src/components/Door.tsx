import React, { useEffect, useState } from 'react';
import './Door.css';
import { Link, Redirect, useParams } from "react-router-dom";
import Light from './Light';
import { ReactComponent as Border } from './svg/mistletoeborder.svg';
import Axios from 'axios';
import Challenge from '../api/Challange';
import { useAuth0 } from '@auth0/auth0-react';
import Comments from './Comments';



const Door = () => {
    let { doorNumber } : any = useParams();
    const { isAuthenticated } = useAuth0();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [challange, setChallange] = useState<Challenge>({} as Challenge);

    useEffect(() => {
        Axios.get<Challenge>(`http://***REMOVED***/challenges/${doorNumber}`, { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } })
            .then(response => {
                if (response.status === 202) {
                    alert("Hei, ingen juksing!")
                }
                setChallange(response.data);
                setIsLoading(false)
            })
    }, [])

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

    return <>
        <main className="DoorWrapper">
            <Link className="BackButton" to="/">&larr; Tilbake til lukene</Link>

            <Light nr={doorNumber} />
            <div className="BorderWrapper">
                <Border className="Border" />
            </div>
            <div className="Door">
                <div dangerouslySetInnerHTML={{__html: challange.content}}/>

                <div className="input">
                    {isAuthenticated && <form>
                        <input placeholder="Ditt svar:" />
                        <input type="submit" value="Send inn svar" />
                    </form>}
                    {!isAuthenticated && <p>Logg inn for å delta!</p>}
                </div>

            </div>
            {isAuthenticated && <Comments />}
        </main>
    </>
}


export default Door;