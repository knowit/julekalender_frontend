import React, { FC, useState } from 'react'; 
import { useRequests } from '../../api/requests';
import Checkmark, { WrongMark } from './Checkmark';

type InputProps = {
  isDoorSolved: boolean;
  isFirstSubmit: boolean;
  onSubmit(answer: string): void;
};

const Input: FC<InputProps> = ({ isDoorSolved, isFirstSubmit, onSubmit }) => {
  const { isAuthenticated } = useRequests();
  const [answer, setAnswer] = useState('');

  if (isDoorSolved) return <Checkmark/>;

  return (<>
    <div className="Input">
      {isAuthenticated
        ? <div>
            <div className="InputFieldContainer">
              <input placeholder='Ditt svar:' value={answer} onChange={(e) => setAnswer(e.target.value)} />
            </div>
            <div className="SubmitButtonContainer">
              <button disabled={!answer} onClick={() => onSubmit(answer)}>Send inn svar</button>
            </div>
            {!isFirstSubmit && <WrongMark/>}
          </div>
        : <p className="NotLoggedIn">Logg inn for å delta!</p>
      }
    </div>
    
    </>

  );
}

export default Input;
