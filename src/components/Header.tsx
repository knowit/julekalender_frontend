import { FC } from "react"
import clsx from "clsx"

import { ReactComponent as Logo } from "../img/knowitlogo.svg"






const Header: FC = () => (
  <header>
    <nav className="p-4 flex flex-cols space-x-2 md:space-x-8">
      <a className="inline-block" href="https://www.knowit.no/" target="_blank" rel="noopener noreferrer" tabIndex={1}>
        <Logo className="h-7 md:h-10 fill-current" />
      </a>
      {/* <div className="float-right h-10 mt-0.5 md:mt-1 flex flex-row-reverse flex-wrap space-x-reverse space-x-2 md:space-x-8 space-y-reverse space-y-2"> */}
      <div
        className={clsx(
          "float-right",
          "mt-0.5",
          "md:mt-1",
          "w-full",
          "flex",
          "flex-col",
          "gap-2",
          "md:gap-8",
          "md:flex-row-reverse",
          "children:flex",
          "children:flex-row-reverse",
          "children:gap-4",
          "md:children:gap-8",
          "children:items-center",
          "children:flex-wrap",
        )}
      >
      </div>
    </nav>
  </header>
)

export default Header
