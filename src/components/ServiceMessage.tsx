import clsx from "clsx"
import { VFC } from "react"

import { ServiceMessage as ServiceMessageType } from "../api/ServiceMessage"
import { getTimeStamp } from "../utils"


type ServiceMessageProps = {
  serviceMessage: ServiceMessageType
  className?: string
}

const ServiceMessage: VFC<ServiceMessageProps> = ({ serviceMessage: { content, resolution_content, created_at, resolved_at, door }, className }) => (
  <div className={clsx(className, "relative space-y-2")}>
    <h3 className="text-xl">{door ? `Feilmelding for luke ${door}` : "Feilmelding"}</h3>
    <time className="absolute top-1 right-3 text-xs">{getTimeStamp(created_at)}{resolved_at && ` — ${getTimeStamp(resolved_at)}`}</time>

    <p>{resolution_content ?? content}</p>
  </div>
)

export default ServiceMessage
