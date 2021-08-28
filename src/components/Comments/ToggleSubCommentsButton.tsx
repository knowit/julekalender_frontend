import { FC } from 'react';

import { ReactComponent as Chevron } from '../svg/expand_more.svg';


type ToggleSubCommentsButtonProps = {
  className?: string;
  showSubComments: boolean;
  toggleShowSubComments: () => void;
  numSubComments: number;
};

const ToggleSubCommentsButton: FC<ToggleSubCommentsButtonProps> = ({ className, showSubComments, toggleShowSubComments, numSubComments }) => {
  if (numSubComments === 0) return null;

  return (
    <button className={className || ''} onClick={toggleShowSubComments}>
      <span className="w-4/5">{`${showSubComments ? "Skjul" : "Vis"} ${numSubComments} svar`}</span>
      <Chevron className={`ml-1 inline w-4 transition-all duration-500 ${showSubComments ? 'transform -rotate-180' : ''}`} />
    </button>
  );
};

export default ToggleSubCommentsButton;
