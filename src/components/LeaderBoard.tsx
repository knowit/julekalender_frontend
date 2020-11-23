import React, { FC } from 'react';
import './LeaderBoard.css';
import { ReactComponent as Flourish } from './svg/pointsdecor.svg';

type LeaderBoardProps = {
    closeHandler: () => void,
    open: boolean
};

const LeaderBoard: FC<LeaderBoardProps> = ({ closeHandler, open }) => {
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
                <tr>
                    <td>24</td>
                    <td>
                        <ul>
                            <li>Per</li>
                            <li>Kari</li>
                            <li>Per</li>
                            <li>Kari</li>
                            <li>Per</li>
                            <li>Kari</li>
                            <li>PerPerPerPerPerPerPerPer</li>
                            <li>Kari</li>
                            <li>Per</li>
                            <li>Kari</li>
                        </ul></td>
                </tr>
                <tr>
                    <td>23</td>
                    <td>
                        <ul>
                            <li>Ole</li>
                            <li>Siri</li>
                            <li>Donald</li>
                        </ul></td>
                </tr>
            </tbody>
        </table>
    </aside>;
}

export default LeaderBoard;