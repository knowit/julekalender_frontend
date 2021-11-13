import clsx from "clsx"
import { formatISO } from "date-fns"
import { isEmpty, keys, map, parseInt, toString } from "lodash"
import { VFC, memo } from "react"
import { useForm } from "react-hook-form"
import { FaTimes } from "react-icons/fa"

import { useChallenges } from "../../api/admin/requests"
import { AdminServiceMessagePayload } from "../../api/admin/ServiceMessage"
import { getTimestampForInputField } from "../../utils"
import Button from "../Button"

import FormElement from "./FormElement"
import FormElementCustom from "./FormElementCustom"


type ServiceMessageFormProps = {
  serviceMessage: AdminServiceMessagePayload
  newForm?: boolean
  submit: (data: AdminServiceMessagePayload) => void
}

const ServiceMessageForm: VFC<ServiceMessageFormProps> = ({ serviceMessage, newForm = false, submit }) => {
  const { register, handleSubmit, setValue } = useForm<AdminServiceMessagePayload>({
    defaultValues: {
      ...serviceMessage,
      ...(!newForm && ({ resolved_at: getTimestampForInputField(serviceMessage.resolved_at ?? formatISO(new Date)) }))
    }
  })

  const { data: doors } = useChallenges({ select: (challenges) => map(keys(challenges), parseInt) })

  return (
    <div className="space-y-8">
      <form className="space-y-4" onSubmit={handleSubmit(submit)}>
        <div className="space-x-4">
          <Button type="submit">Lagre</Button>
        </div>

        <div className={clsx("grid grid-cols-3 gap-4")}>
          <FormElement
            label="Innhold"
            type="text"
            labelClassName="col-span-3"
            className="w-full"
            defaultValue={serviceMessage.content}
            {...register("content", { required: true })}
          />

          {!newForm && (
            <FormElement
              label="Løsning"
              type="text"
              labelClassName="col-span-3"
              className="w-full"
              defaultValue={serviceMessage.resolution_content ?? ""}
              {...register("resolution_content", { setValueAs: (value: string) => isEmpty(value) ? null : value })}
            />
          )}

          <FormElementCustom label="Luke" className="col-span-3" defaultValue={serviceMessage.resolution_content ?? ""}>
            <select className="block form-select" defaultValue={serviceMessage.door ?? undefined} {...register("door", { setValueAs: (value: string) => isEmpty(value) ? undefined : parseInt(value) })}>
              <option label="-" value="" />
              {map(doors, (door) => <option key={door} label={toString(door)} value={door} />)}
            </select>
          </FormElementCustom>

          {!newForm && (
            <>
              <FormElement label="Opprettet" type="datetime-local" value={getTimestampForInputField(serviceMessage.created_at ?? "")} disabled />
              <div>
                <FormElement label="Løsningstidspunkt" type="datetime-local" {...register("resolved_at")} />
                <Button type="button" className="!text-xs" onClick={() => setValue("resolved_at", null)} content="Nullstill" />
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  )
}

export default memo(ServiceMessageForm)
