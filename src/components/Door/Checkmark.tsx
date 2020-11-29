import React from "react";

export const Checkmark = () => {
    return (
        <div className="Checkmark">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                <circle
                    cx="65.1"
                    cy="65.1"
                    r="62.1"
                    fill="none"
                    stroke="#6CAB85"
                    strokeMiterlimit="10"
                    strokeWidth="6"
                    className="path circle"
                ></circle>
                <path
                    fill="none"
                    stroke="#6CAB85"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    strokeWidth="6"
                    d="M100.2 40.2L51.5 88.8 29.8 67.5"
                    className="path check"
                ></path>
            </svg>
            <p>Bra jobba!</p>
        </div>
    );
}

export const WrongMark = () => {
    return (
        <div className="Checkmark Xmark">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                <circle
                    cx="65.1"
                    cy="65.1"
                    r="62.1"
                    fill="none"
                    stroke="#D06079"
                    strokeMiterlimit="10"
                    strokeWidth="6"
                    className="path circle"
                ></circle>
                <path
                    fill="none"
                    stroke="#D06079"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    strokeWidth="6"
                    d="M34.4 37.9L95.8 92.3"
                    className="path line"
                ></path>
                <path
                    fill="none"
                    stroke="#D06079"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    strokeWidth="6"
                    d="M95.8 38L34.4 92.2"
                    className="path line"
                ></path>
            </svg>
        </div>
    );
}

export default Checkmark;
