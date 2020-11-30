import React from 'react'
import './stars.css'

type StarBackgroundProps = {
  paused: boolean;
};

const StarBackground  = ({ paused }: StarBackgroundProps) => {
  const classes = `background-animation ${paused ? 'paused' : ''}`;

    return <>
    <div className={classes} id="background" ></div>
    <div className={classes} id="midground" ></div>
    <div className={classes} id="foreground" ></div>
    </>
}

export default StarBackground
