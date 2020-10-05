import React from 'react'

type DoorProps = { onClick: () => void,  number: number }; /* could also use interface */

const Door = ({ number, onClick}: DoorProps) => <div onClick={onClick}>{number}</div>;


export default Door;