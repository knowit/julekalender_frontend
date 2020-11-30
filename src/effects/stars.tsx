import React from 'react'
import './stars.css'

type StarBackgroundProps = {
  paused: boolean;
};

const StarBackground  = ({ paused }: StarBackgroundProps) => {
  const classes = `background-animation ${paused ? 'paused' : ''}`;

    return <>
      <div className={`${classes} -z-40`} id="background" ></div>
      <div className={`${classes} -z-30`} id="midground" ></div>
      <div className={`${classes} -z-20`} id="foreground" ></div>
    </>
}

export default StarBackground
