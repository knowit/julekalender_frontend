import { FC } from "react"

import { ReactComponent as Border } from "../svg/mistletoeborder.svg"


const DoorBorder: FC = () => (
  <div className="-mb-20 z-10 relative overflow-hidden flex justify-center !pointer-events-none">
    <Border className="w-kodekalender flex-shrink-0" />
  </div>
)

export default DoorBorder
