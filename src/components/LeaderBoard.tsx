import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import { useRequests } from '../api/requests';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { ReactComponent as Flourish } from './svg/pointsdecor.svg';
import { ReactComponent as Close } from './svg/close.svg';
import Leaderboard from '../api/Leaderboard';

type LeaderBoardProps = {
  hidden: boolean;
  setIsLeaderboardHiding: (value: boolean) => void;
  closeHandler: () => void;
};

const LeaderBoard: FC<LeaderBoardProps> = ({ hidden, setIsLeaderboardHiding, closeHandler }) => {
  const { fetchLeaderboard } = useRequests();
  const [leaderboard, setLeaderboard] = useState<Leaderboard>();
  const clickableLeaderboardRef = useRef(null);

  useEffect(() => {
    fetchLeaderboard()
      .then((response) => {
        setLeaderboard(response.data);
      })
  }, [fetchLeaderboard])

  useOnClickOutside(clickableLeaderboardRef, useCallback(() => {
    if (hidden || !leaderboard) return;

    setIsLeaderboardHiding(true);
    setTimeout(() => setIsLeaderboardHiding(false), 200);
    closeHandler();
  }, [hidden, leaderboard, setIsLeaderboardHiding, closeHandler]));

  if (leaderboard === undefined) {
    return null;
  }

  const closeBoard = () => {
    setIsLeaderboardHiding(true);
    setTimeout(() => setIsLeaderboardHiding(false), 200);
    closeHandler();
  }

  const containerTransition = `transition duration-100 sm:duration-200 transform ${hidden ? 'ease-in translate-x-full sm:translate-x-102' : 'ease-out translate-x-0'}`;

  return (
    <aside className="absolute top-0 right-0 pt-14 w-full sm:w-102 sm:pr-6 overflow-hidden pointer-events-none">
      <div className={`${containerTransition} bg-leaderboard-green p-4 rounded-md sm:rounded-xl w-full h-full pointer-events-auto`} ref={clickableLeaderboardRef} >
        <div className="h-full overflow-hidden">
          <Close className='fill-current absolute top-0 right-0 m-2 cursor-pointer' onClick={closeBoard}/>
          <div className="h-24 pt-2">
            <div className="text-center p-a">
              <h2 className="text-2xl m-auto">Snille barn</h2>
            </div>
            <Flourish className="-mt-8 h-20 w-full transform rotate-2" />
          </div>
          <div className="h-96 xl:h-192 overflow-y-auto">
            {leaderboard.map(([solved, users]) => (
              <div key={solved}>
                <h3 className="sticky top-0 py-0.5 bg-lightbulb-green rounded-md text-lg text-center" key={solved}>{solved} luker løst</h3>
                <div className="pt-2 pb-4 space-y-1">
                  {users.map((user) => (
                    <p className="text-center" key={user}>{user}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default LeaderBoard;
