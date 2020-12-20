import React, { FC, useState } from 'react';
import { Redirect } from 'react-router-dom';
import BackToDoorsButton from '../components/BackToDoorsButton';
import CommentsSection from '../components/Comments/CommentsSection';
import Challenge from '../components/Door/Challenge';
import useRequestsAndAuth from '../hooks/useRequestsAndAuth';


interface AdminProps {

};

const Admin: FC<AdminProps> = () => {
  const { isAdmin } = useRequestsAndAuth();
  const [doorNumber, setDoorNumber] = useState('1');
  const doorOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].map(
    (door) => <option value={door}>{door}</option>
  );

  if (!isAdmin) return <Redirect to="/" />;

  return (
    <main className="max-w-kodekalender mx-auto mt-10">
      <BackToDoorsButton />
      <div className="py-12 px-8 md:px12 mx4 md:mx-8 text-gray-700 rounded-md">
        <div className="py-8 px-8 md:px-12 mx-4 md:mx-8 bg-gray-100 rounded-md">
          <select onChange={((e) => setDoorNumber(e.target.value))}>
            {doorOptions}
          </select>
          <Challenge
            doorNumber={doorNumber}
            isDoorSolved={true}
            setIsDoorSolved={() => {}}
          />
        </div>
        <CommentsSection doorNumber={doorNumber} />
      </div>
    </main>
  );
}

export default Admin;
