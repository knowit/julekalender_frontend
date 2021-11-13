import { Popover } from "@headlessui/react"
import clsx from "clsx"
import { filter, isEmpty, map, some } from "lodash"
import { VFC } from "react"
import { FaExclamationTriangle } from "react-icons/fa"

import { useServiceMessages } from "../../api/requests"
import ServiceMessage from "../ServiceMessage"


type ServiceMessageAlertProps = {
  door: number
  className?: string
}

const ServiceMessageAlert: VFC<ServiceMessageAlertProps> = ({ door, className }) => {
  const { data: doorServiceMessages } = useServiceMessages({ select: (serviceMessages) => filter(serviceMessages, { door }) })

  if (isEmpty(doorServiceMessages)) return null

  const hasErrors = some(doorServiceMessages, { resolved: false })

  return (
    <div className={className}>
      <Popover className="relative">
        <Popover.Button
          as={FaExclamationTriangle}
          className={clsx(
            "text-opacity-70 h-full w-full cursor-pointer",
            hasErrors ? "text-red-700" : "text-lightbulb-yellow"
          )}
        />

        <Popover.Panel className="fixed left-[5%] min-w-[90%] md:absolute md:left-0 md:min-w-min">
          <div
            className={clsx(
              "grid place-items-center bg-gray-100 border-2 border-opacity-70 rounded-md shadow-lg",
              hasErrors ? "border-red-700" : "border-lightbulb-yellow"
            )}
          >
            {map(doorServiceMessages, (serviceMessage, idx) => (
              <>
                {idx > 0 && (
                  <div
                    className={clsx(
                      "w-11/12 h-[2px] bg-opacity-70 rounded-full",
                      hasErrors ? "bg-red-700" : "bg-lightbulb-yellow"
                    )}
                  />
                )}
                <ServiceMessage
                  key={serviceMessage.uuid}
                  className={clsx(
                    "text-gray-700 p-4 w-full pt-8 md:p-4 md:w-[36rem]",
                    serviceMessage.resolved && "text-opacity-70"
                  )}
                  serviceMessage={serviceMessage}
                />
              </>
            ))}
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  )
}

export default ServiceMessageAlert
