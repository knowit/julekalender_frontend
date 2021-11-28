import { FC, useCallback, useRef, useState } from "react"
import TextareaAutosize from "react-autosize-textarea/lib"
import clsx, { ClassValue } from "clsx"

import Button from "../Button"
import { useCreatePost, useRefreshCsrfToken } from "../../api/requests"
import { ParentPost } from "../../api"
import usePostPreviewState from "../../hooks/usePostPreviewState"

import PostPreview from "./PostPreview"


type ChildPostFormProps = {
  toggleShowForm: () => void
  door: number
  parent: ParentPost
  className?: ClassValue
}

const ChildPostForm: FC<ChildPostFormProps> = ({ toggleShowForm, door, parent, className }) => {
  useRefreshCsrfToken()

  const { mutate: doCreatePost, isLoading } = useCreatePost()

  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [isDirty, setIsDirty] = useState(false)
  const setDirty = useCallback(() => setIsDirty(true), [setIsDirty])
  const [preview, previewHtml, previewLoading, togglePreview, updatePreviewContent] = usePostPreviewState(inputRef)

  const createPost = async () => {
    if (!inputRef.current) return

    doCreatePost({ door, parent, content: inputRef.current.value }, { onSuccess: toggleShowForm })
    toggleShowForm()
  }

  return (
    <div className={clsx("space-y-2", className)}>
      {preview && (
        <PostPreview
          html={previewHtml}
          isLoading={previewLoading}
          className="w-full min-h-[5rem] p-2 rounded-t border-b-2 border-gray-700 bg-gray-200"
        />
      )}

      <TextareaAutosize
        autoFocus
        ref={inputRef}
        className={clsx(
          "block w-full min-h-[5rem] p-2 text-base rounded-t bg-gray-200 border-b-2 border-gray-700 outline-none",
          preview && "hidden"
        )}
        onChange={setDirty}
        placeholder="Svar på kommentar"
      />

      <div className="flex justify-between">
        <Button sm underline={false} onClick={toggleShowForm} content="Avbryt" />

        <div className="space-x-4">
          {isDirty && <Button sm underline={false} disabled={isLoading} onClick={togglePreview} onMouseEnter={updatePreviewContent} content={preview ? "Rediger" : "Forhåndsvis"} />}
          <Button sm underline={false} disabled={isLoading} onClick={createPost} content="Svar" />
        </div>
      </div>
    </div>
  )
}

export default ChildPostForm
