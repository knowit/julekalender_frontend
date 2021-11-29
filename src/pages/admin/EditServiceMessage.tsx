import { find } from "lodash"
import { useEffect, VFC } from "react"
import { useHistory, useParams } from "react-router-dom"

import { useUpdateServiceMessage } from "../../api/admin/requests"
import { AdminServiceMessagePayload } from "../../api/admin/ServiceMessage"
import { useServiceMessages } from "../../api/requests"
import ServiceMessageForm from "../../components/Admin/ServiceMessageForm"


const EditServiceMessage: VFC = () => {
  const { uuid } = useParams<{ uuid: string }>()
  const history = useHistory()

  const { data: serviceMessage, isLoading } = useServiceMessages({ select: (serviceMessages) => find(serviceMessages, { uuid }) })
  const { mutate: updateServiceMessage } = useUpdateServiceMessage()

  const submit = (serviceMessage: AdminServiceMessagePayload) => {
    updateServiceMessage({ uuid, service_message: serviceMessage }, { onSuccess: () => history.push("/admin/service_messages") })
  }

  useEffect(() => {
    if (!isLoading && !serviceMessage)
      history.push("/admin/service_messages/new")
  }, [isLoading, serviceMessage, history])

  if (isLoading || !serviceMessage) return null

  return (
    <div className="space-y-8">
      <div className="text-center">
        <span className="text-4xl font-semibold">Endre driftsmelding</span>
      </div>

      <ServiceMessageForm serviceMessage={serviceMessage} submit={submit} />
    </div>
  )
}

export default EditServiceMessage
