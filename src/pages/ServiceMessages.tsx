import clsx from "clsx"
import { isEmpty, map } from "lodash"

import { useServiceMessages } from "../api/requests"
import ServiceMessage from "../components/ServiceMessage"

import Page from "./Page"


const ServiceMessages = () => {
  const { data: serviceMessages, isLoading } = useServiceMessages()

  if (isLoading) return null

  return (
    <Page className="py-12 px-8 md:px-12 mx-4 md:mx-8 bg-gray-100 text-gray-700 rounded-md space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-semibold">Driftsmeldinger</h1>
      </div>
      <div className="space-y-4 grid grid-cols-1 justify-items-center">
        {isEmpty(serviceMessages)
          ? <div>🎄 Ingen driftsmeldinger. Livet er herlig! 🎄</div>
          : map(serviceMessages, (serviceMessage) => {
            const messageClasses = serviceMessage.resolved_at
              ? "border-lightbulb-green border-opacity-90 text-gray-700 text-opacity-80"
              : "border-lightbulb-yellow"

            return (
              <ServiceMessage
                key={serviceMessage.uuid}
                className={clsx("border-2 p-4 rounded-md w-full max-w-[40rem]", messageClasses)}
                serviceMessage={serviceMessage}
              />
            )
          })
        }
      </div>
    </Page>
  )
}

export default ServiceMessages
