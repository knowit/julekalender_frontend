import clsx from "clsx"
import { isEmpty, map } from "lodash"
import { Link } from "react-router-dom"
import { useDeleteServiceMessage } from "../../api/admin/requests"

import { useServiceMessages } from "../../api/requests"
import Button from "../../components/Button"
import ServiceMessage from "../../components/ServiceMessage"


const ServiceMessages = () => {
  const { data: serviceMessages, isLoading } = useServiceMessages()

  const { mutate: doDeleteServiceMessage } = useDeleteServiceMessage()

  const deleteServiceMessage = (uuid: string) => {
    if (!window.confirm("Sikker på at du vil slette driftsmelding?")) return

    doDeleteServiceMessage({ uuid })
  }

  if (isLoading) return null

  return (
    <>
      <div className="text-center">
        <h1 className="text-4xl font-semibold">Driftsmeldinger</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 justify-items-center">
        {isEmpty(serviceMessages)
          ? <div>🎄 Ingen driftsmeldinger. Livet er herlig! 🎄</div>
          : map(serviceMessages, (serviceMessage) => {
            const messageClasses = serviceMessage.resolved_at
              ? "border-lightbulb-green border-opacity-90 text-gray-700 text-opacity-80"
              : "border-lightbulb-yellow"

            return (
              <div key={serviceMessage.uuid} className="w-full max-w-[40rem]">
                <div className="m-2 space-x-4">
                  <Link to={`/admin/service_messages/${serviceMessage.uuid}/edit`}>
                    <Button content="Rediger" />
                  </Link>
                  <Button content="Slett" onClick={() => deleteServiceMessage(serviceMessage.uuid)} />
                </div>
                <ServiceMessage
                  className={clsx("border-2 p-4 rounded-md w-full", messageClasses)}
                  serviceMessage={serviceMessage}
                />
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default ServiceMessages
