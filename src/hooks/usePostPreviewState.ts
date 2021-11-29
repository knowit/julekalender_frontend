import { isEmpty } from "lodash"
import { RefObject, useCallback, useState } from "react"

import { usePostPreview } from "../api/requests"


const usePostPreviewState = (inputRef: RefObject<HTMLTextAreaElement>): [boolean, string | undefined, boolean, () => void, () => void] => {
  const [preview, setPreview] = useState(false)
  const [previewContent, setPreviewContent] = useState<string>()

  const { data, isLoading } = usePostPreview(previewContent)

  const updatePreviewContent = useCallback(() => {
    if (inputRef.current)
      setPreviewContent(inputRef.current.value)
  }, [inputRef, setPreviewContent])

  const togglePreview = useCallback(() => {
    updatePreviewContent()

    // Toggle state to ON only if there is content to preview
    setPreview((state) => !state && !!inputRef.current && !isEmpty(inputRef.current.value))
  }, [inputRef, updatePreviewContent, setPreview])

  return [
    preview,
    data?.html,
    isLoading,
    togglePreview,
    updatePreviewContent
  ]
}

export default usePostPreviewState
