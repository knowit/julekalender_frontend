import React, { FC } from 'react';
import LoginButton from './LoginButton';
import { ReactComponent as Logo } from '../img/knowitlogo.svg';
import useRequestsAndAuth from '../hooks/useRequestsAndAuth';
import { Link } from 'react-router-dom';

interface HeaderProps {
  isLeaderboardHiding: boolean;
  setLeaderboardHidden: (state: boolean) => void;
};

const Header: FC<HeaderProps> = ({ isLeaderboardHiding, setLeaderboardHidden }) => {
  const { isAdmin } = useRequestsAndAuth();

  return (
    <header>
      <nav className="p-4">
        <a className="inline-block float-left" href="https://www.knowit.no/" target="_blank" rel="noopener noreferrer" tabIndex={1}>
          <Logo className="h-7 md:h-10 fill-current" />
        </a>
        <div className="float-right space-x-4 h-10 text-md mt-0.5 md:mt-1 md:text-xl">
          { isAdmin && <Link to="/admin" title="Super secret admin pages" />}
          <button className="hover:underline" onClick={() => !isLeaderboardHiding && setLeaderboardHidden(false)} tabIndex={2}>Ledertavle</button>
          <LoginButton />
        </div>
      </nav>
    </header>
  );
};

export default Header;
