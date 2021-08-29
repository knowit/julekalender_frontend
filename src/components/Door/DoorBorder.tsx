import { FC } from "react"

import { ReactComponent as Border } from "../svg/mistletoeborder.svg"


const DoorBorder: FC = () => (
  <div className="-mb-20 overflow-hidden flex justify-center">
    <Border className="w-kodekalender flex-shrink-0" />
  </div>
)

export default DoorBorder
