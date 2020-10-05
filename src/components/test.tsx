import React from "react";

type TestProps = {
    clickHandler: (doorNumber: number) => void
}; /* could also use interface */

const Test = ({ clickHandler }: TestProps) => {


    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 297 210"
        >
            <defs>
                <path d="M-370.417 -84.667H-276.679V6.046999999999997H-370.417z"></path>
            </defs>
            <g>
                <ellipse
                    cx="28.348"
                    cy="21.923"
                    fill="red"
                    fillRule="evenodd"
                    strokeWidth="0.265"
                    rx="13.229"
                    ry="13.607"
                ></ellipse>
                <ellipse
                    cx="80.509"
                    cy="34.774"
                    fill="red"
                    fillRule="evenodd"
                    strokeWidth="0.265"
                    rx="11.717"
                    ry="9.827"
                ></ellipse>
                <ellipse
                    cx="175.381"
                    cy="77.485"
                    fill="red"
                    fillRule="evenodd"
                    strokeWidth="0.265"
                    rx="15.875"
                    ry="13.229"
                ></ellipse>
                <ellipse
                    cx="227.164"
                    cy="26.836"
                    fill="red"
                    fillRule="evenodd"
                    strokeWidth="0.907"
                    rx="11.717"
                    ry="17.765"
                ></ellipse>
                <ellipse
                    cx="250.22"
                    cy="102.054"
                    fill="red"
                    fillRule="evenodd"
                    strokeWidth="0.265"
                    rx="18.899"
                    ry="30.994"
                ></ellipse>
                <ellipse
                    cx="140.229"
                    cy="162.908"
                    fill="red"
                    fillRule="evenodd"
                    strokeWidth="0.639"
                    rx="16.253"
                    ry="13.229"
                ></ellipse>
                <ellipse
                    cx="89.958"
                    cy="104.321"
                    fill="red"
                    fillRule="evenodd"
                    strokeWidth="0.265"
                    rx="13.607"
                    ry="26.458"
                ></ellipse>
                <ellipse
                    cx="152.702"
                    cy="117.173"
                    fill="red"
                    fillRule="evenodd"
                    strokeWidth="0.265"
                    rx="21.167"
                    ry="15.119"
                ></ellipse>
                <g onClick={() => clickHandler(12)} transform="translate(-3.024 -38.554)">
                    <ellipse
                        cx="27.97"
                        cy="115.283"
                        fill="red"
                        fillRule="evenodd"
                        strokeWidth="0.551"
                        rx="19.655"
                        ry="15.497"
                    ></ellipse>
                    <text
                        xmlSpace="preserve"
                        style={{ lineHeight: "1.25" }}
                        x="21.167"
                        y="118.685"
                        fill="#000"
                        fillOpacity="1"
                        stroke="none"
                        strokeWidth="0.265"
                        fontFamily="sans-serif"
                        fontSize="10.583"
                        fontStyle="normal"
                        fontWeight="normal"
                    >
                        <tspan x="21.167" y="118.685" strokeWidth="0.265">
                            12
            </tspan>
                    </text>
                </g>
            </g>
        </svg>
    );
}

export default Test;
