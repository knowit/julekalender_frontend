import clsx, { ClassValue } from "clsx"
import { FC } from "react"

import BackToDoorsButton from "../components/BackToDoorsButton"
import DoorBorder from "../components/Door/DoorBorder"


type PageProps = {
  className?: ClassValue
  wrapperClassName?: ClassValue
}

const Page: FC<PageProps> = ({ className, wrapperClassName, children }) => (
  <main className={clsx(
    "max-w-kodekalender",
    "mx-auto",
    "pointer-events-none", // Allow click through to animation toggle
    "children:pointer-events-auto",
    "pb-4",
    wrapperClassName
  )}>
    <BackToDoorsButton />
    <DoorBorder />

    <div className={clsx(className)}>
      {children}
    </div>
  </main>
)

export default Page
