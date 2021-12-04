import { useEffect, useRef, useState, VFC } from "react"
import { UseFormRegister, UseFormSetValue } from "react-hook-form"
import { map, reject } from "lodash"
import SparkMD5 from "spark-md5"
import clsx from "clsx"
import { FaTimes } from "react-icons/fa"

import { AdminChallenge, AdminChallengePayload, File as ChallengeFile } from "../../api/admin/Challenge"
import Button from "../Button"
import { useCreateBlob, useUploadFile } from "../../api/admin/requests"
import useIsMounted from "../../hooks/useIsMounted"
import FormElementCustom from "../form/FormElementCustom"



type AttachmentsInputProps = {
  challenge: AdminChallenge
  setValue: UseFormSetValue<AdminChallengePayload>
  register: UseFormRegister<AdminChallengePayload>
  className?: string
}

let fileIdCounter = 0

const AttachmentsInput: VFC<AttachmentsInputProps> = ({ challenge, register, setValue, className /*, register */ }) => {
  // Registers 'files' in form, otherwise useless
  register("files")

  const { mutateAsync: createBlob } = useCreateBlob()
  const { mutateAsync: uploadFile } = useUploadFile()

  // FileObjects is source of truth for form files
  const [fileObjects, setFileObjects] = useState<Array<ChallengeFile & { fileId: number }>>(map(challenge.files, (file) => ({ ...file, fileId: fileIdCounter++ })))
  useEffect(() => {
    setValue("files", map(fileObjects, "signed_id"))
  }, [setValue, fileObjects])

  const [fileProgress, setFileProgress] = useState<Record<number, { progress: number } | undefined>>({})

  const isMounted = useIsMounted()

  const handleFiles = async (inputFiles: FileList) => {
    await Promise.all(map(inputFiles, async (file) => {
      const fileId = fileIdCounter++
      setFileProgress((progress) => ({ ...progress, [fileId]: { progress: 0 } }))

      const payload = ({
        filename: file.name,
        content_type: file.type,
        byte_size: file.size,
        checksum: btoa(SparkMD5.ArrayBuffer.hash(await file.arrayBuffer(), true))
      })

      const { signed_id, direct_upload } = await createBlob({ blob: payload })
      if (!isMounted()) return

      setFileObjects((oldFileObjects) => [...oldFileObjects, { signed_id, filename: file.name, fileId }])

      const onUploadProgress = (event: ProgressEvent) => {
        if (!isMounted()) return

        setFileProgress((progress) => ({ ...progress, [fileId]: { progress: event.loaded / event.total } }))
      }

      await uploadFile({ upload: { file, directUpload: direct_upload }, config: { onUploadProgress } })

      if (!isMounted()) return
      setFileProgress((progress) => ({ ...progress, [fileId]: { progress: 1 } }))
    }))
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
        {map(fileObjects, ({ filename, signed_id, fileId }) => {
          const progress = fileProgress[fileId]?.progress ?? 1

          return (
            <span
              key={signed_id}
              className="relative overflow-hidden p-1 border-2 rounded-md border-lightbulb-yellow text-center"
            >
              {progress < 1 && (
                <div
                  style={{ width: `calc(${progress * 100}% + ${progress * 0.5}rem)` }}
                  className="absolute top-[-.25rem] left-[-.25rem] h-[calc(100%+.5rem)] bg-blue-400 bg-opacity-20"
                />
              )}
              <span className="inline-block w-[calc(100%-1.5rem)] line-clamp-1">{filename}</span>
              <FaTimes
                className="absolute top-0 right-2 h-full w-3 cursor-pointer"
                onClick={() => setFileObjects((oldFileObjects) => reject(oldFileObjects, { signed_id }))}
              />
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default AttachmentsInput
