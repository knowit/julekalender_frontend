import { FC, PropsWithChildren } from "react"

import "./Checkmark.css"


type CheckmarkWrapperProps = {
  color: string
}

const CheckmarkWrapper: FC<PropsWithChildren<CheckmarkWrapperProps>> = ({ color, children }) => (
  <div className={`Checkmark block w-28 my-8 mx-auto ${color}`}>
    {children}
  </div>
)

type CheckmarkProps = {
  doorNumber: string
}

export const Checkmark: FC<CheckmarkProps> = ({ doorNumber }) => (
  <CheckmarkWrapper color="text-green-600">
    <svg className="stroke-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
      <circle
        cx="65.1"
        cy="65.1"
        r="62.1"
        fill="none"
        strokeMiterlimit="10"
        strokeWidth="6"
        className="path circle"
      />
      <path
        fill="none"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="6"
        d="M100.2 40.2L51.5 88.8 29.8 67.5"
        className="path check"
      />
    </svg>
    <p className="text-lg text-center mt-8">Bra jobba!{doorNumber === "24" && <><br/>Og god jul! 🥳</>}</p>
  </CheckmarkWrapper>
)

export const WrongMark: FC = () => (
  <CheckmarkWrapper color="text-red-700">
    <svg className="stroke-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
      <circle
        cx="65.1"
        cy="65.1"
        r="62.1"
        fill="none"
        strokeMiterlimit="10"
        strokeWidth="6"
        className="path circle"
      />
      <path
        fill="none"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="6"
        d="M34.4 37.9L95.8 92.3"
        className="path line"
      />
      <path
        fill="none"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="6"
        d="M95.8 38L34.4 92.2"
        className="path line"
      />
    </svg>
    <p className="text-lg text-center mt-8">Feil svar!</p>
  </CheckmarkWrapper>
)

export default Checkmark
