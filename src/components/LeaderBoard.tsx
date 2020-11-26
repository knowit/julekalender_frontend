import Axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import './LeaderBoard.css';
import { ReactComponent as Flourish } from './svg/pointsdecor.svg';
import Leaderboard, { DoorKey } from '../api/Leaderboard';

type LeaderBoardProps = {
    closeHandler: () => void,
    open: boolean
};

const LeaderBoard: FC<LeaderBoardProps> = ({ closeHandler, open }) => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [lb, setLB] = useState<Leaderboard>();

    useEffect(() => {
        Axios.get<Leaderboard>(`http://***REMOVED***/leaderboard`, { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } })
            .then(response => {
                setLB(response.data);
                setIsLoading(false)
            })
    }, [])

    if (lb === undefined) {
        return null
    }

    if (isLoading) {
        return null
    }

    return <aside className={`Leaderboard ${open ? 'open' : ''}`}>
        <button title="Lukk ledertavle" id="CloseLeaderboard" onClick={() => closeHandler()}>
            {/*X-icon svg*/}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path fill="#fff" d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" /></svg>
        </button>
        <h2>SNILLE BARN</h2>
        <Flourish className="flourish" />
        <table>
            <thead>
                <tr>
                    <th>LUKER LØST</th>
                    <th>BRUKERNAVN</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(lb).reverse()
                    .map((k) => <tr key={k}><td>{k}</td><td><ul>{lb[k as DoorKey]?.map(name => <li key={name}>{name}</li>)}</ul></td></tr>)}
            </tbody>
        </table>
    </aside>;
}

export default LeaderBoard;