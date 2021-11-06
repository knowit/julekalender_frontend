import { useEffect, useRef, useState, VFC } from "react"
import { UseFormRegister, UseFormSetValue } from "react-hook-form"
import { map, reject } from "lodash"
import SparkMD5 from "spark-md5"
import clsx from "clsx"
import { FaTimes } from "react-icons/fa"

import { AdminChallenge, AdminChallengePayload } from "../../api/admin/Challenge"
import Button from "../Button"
import { useCreateBlob, useUploadFile } from "../../api/admin/requests"

import FormElementCustom from "./FormElementCustom"



type AttachmentsInputProps = {
  challenge: AdminChallenge
  setValue: UseFormSetValue<AdminChallengePayload>
  register: UseFormRegister<AdminChallengePayload>
  className?: string
}

const AttachmentsInput: VFC<AttachmentsInputProps> = ({ challenge, register, setValue, className /*, register */ }) => {
  // Registers 'files' in form, otherwise useless
  register("files")

  const { mutateAsync: createBlob } = useCreateBlob()
  const { mutateAsync: uploadFile } = useUploadFile()

  // FileObjects is source of truth for form files
  const [fileObjects, setFileObjects] = useState(challenge.files)
  useEffect(() => {
    setValue("files", map(fileObjects, "signed_id"))
  }, [setValue, fileObjects])

  const handleFiles = async (inputFiles: FileList) => {
    const uploadedFiles = await Promise.all(map(inputFiles, async (file) => {
      const payload = ({
        filename: file.name,
        content_type: file.type,
        byte_size: file.size,
        checksum: btoa(SparkMD5.ArrayBuffer.hash(await file.arrayBuffer(), true))
      })

      const { signed_id, direct_upload } = await createBlob(payload)
      await uploadFile({ file, directUpload: direct_upload })

      return { signed_id, filename: file.name }
    }))

    setFileObjects((oldFileObjects) => [...oldFileObjects, ...uploadedFiles])
  }

  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className={clsx("space-y-2", className)}>
      <FormElementCustom label="Filer" note="husk å dobbeltsjekke riktig filnavn i markdown">
        <input
          ref={fileInputRef}
          className="hidden"
          type="file"
          multiple
          onChange={({ target: { files } }) => files && handleFiles(files)}
        />
        <Button
          className="block form-input"
          type="button"
          underline={false}
          content="Velg filer..."
          onClick={() => fileInputRef.current?.click()}
        />
      </FormElementCustom>

      <div className="grid grid-cols-4 gap-2">
        {map(fileObjects, ({ filename, signed_id }) => (
          <span
            key={signed_id}
            className="p-1 border-2 rounded-md border-lightbulb-yellow text-center"
          >
            {filename}
            <FaTimes
              className="inline-block float-right h-full cursor-pointer"
              onClick={() => setFileObjects((oldFileObjects) => reject(oldFileObjects, { signed_id }))}
            />
          </span>
        ))}
      </div>
    </div>
  )
}

export default AttachmentsInput
