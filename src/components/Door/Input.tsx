import React, { FC, useState } from 'react';
import { useRequestsAndAuth } from '../../api/requests';
import Checkmark, { WrongMark } from './Checkmark';

type InputProps = {
  isDoorSolved: boolean;
  isFirstSubmit: boolean;
  isWaitingForSolutionResponse: boolean;
  onSubmit(answer: string): void;
};

const Input: FC<InputProps> = ({ isDoorSolved, isFirstSubmit, isWaitingForSolutionResponse, onSubmit }) => {
  const { isAuthenticated } = useRequestsAndAuth();
  const [answer, setAnswer] = useState('');
  const [submittedAnswer, setSubmittedAnswer] = useState('');

  const isWrongAnswer = !isDoorSolved && !isFirstSubmit && !isWaitingForSolutionResponse && submittedAnswer !== '' && answer === submittedAnswer;
  
  const submitAnswer = () => {
    onSubmit(answer)
    setSubmittedAnswer(answer)
  }

  return (
    <>
      <div className="w-56 py-3 px-6 mx-auto">
        {isDoorSolved
          ? <Checkmark />
          : isAuthenticated
            ? <>
              <input className={`h-8 w-full p-0 bg-transparent border-0 border-current border-b ${isWrongAnswer && 'text-red-700'}`}
                placeholder='Ditt svar:' value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyPress={e => { if (e.key === "Enter") { submitAnswer() }}}
                />
              <button className="block mx-auto mt-2" disabled={!answer} onClick={() => submitAnswer()}>Send inn svar</button>
              {isWrongAnswer && <WrongMark />}
            </>
            : <p>Logg inn for å delta!</p>
        }
      </div>
    </>
  );
}

export default Input;
