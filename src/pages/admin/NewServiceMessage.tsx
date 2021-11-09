import { VFC } from "react"
import { useHistory } from "react-router-dom"

import { useCreateServiceMessage } from "../../api/admin/requests"
import { AdminServiceMessagePayload } from "../../api/admin/ServiceMessage"
import ServiceMessageForm from "../../components/Admin/ServiceMessageForm"


const NewServiceMessage: VFC = () => {
  const history = useHistory()

  const { mutate: createServiceMessage } = useCreateServiceMessage()

  const submit = (serviceMessage: AdminServiceMessagePayload) => {
    createServiceMessage({ service_message: serviceMessage }, { onSuccess: () => history.push("/admin/service_messages") })
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <span className="text-4xl font-semibold">Ny driftsmelding</span>
      </div>

      <ServiceMessageForm newForm serviceMessage={{ content: "", resolution_content: null, resolved_at: null }} submit={submit} />
    </div>
  )
}

export default NewServiceMessage
