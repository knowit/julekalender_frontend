import { FC } from "react"

import { ReactComponent as Logo } from "../img/knowitlogo.svg"


const Header: FC = () => {
  return (
    <header>
      <nav className="p-4 flex flex-cols space-x-2 md:space-x-8">
        <a className="inline-block" href="https://www.knowit.no/" target="_blank" rel="noopener noreferrer" tabIndex={1}>
          <Logo className="h-7 md:h-10 fill-current" />
        </a>
      </nav>
    </header>
  )
}

export default Header
