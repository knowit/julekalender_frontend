import { FC, useEffect, useRef, useState } from "react"
import TextareaAutosize from "react-autosize-textarea/lib"
import clsx, { ClassValue } from "clsx"

import useRequestsAndAuth from "../../hooks/useRequestsAndAuth"
import Button from "../Button"


type ChildPostFormProps = {
  showChildPostForm: boolean
  toggleShowForm: () => void
  refreshParentPost: () => void
  doorNumber: string
  parentId: string
  className?: ClassValue
}

const ChildPostForm: FC<ChildPostFormProps> = ({ showChildPostForm, toggleShowForm, refreshParentPost, doorNumber, parentId, className }) => {
  const { isAuthenticated, isAdmin, user, createChildPost } = useRequestsAndAuth()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [submitting, setSubmitting] = useState(false)

  const createPost = async () => {
    if (!inputRef.current) return

    setSubmitting(true)
    const { status } = await createChildPost(doorNumber, inputRef.current.value, parentId)

    if (status === 200) {
      refreshParentPost()
      toggleShowForm()
    }

    setSubmitting(false)
  }

  // Focus textarea on every render. Should in practice only happen once, when
  // the form is first shown.
  useEffect(() => {
    inputRef.current?.focus()
  })

  // Prevent admins from accidentially submitting posts without being logged in.
  if (!showChildPostForm || (isAdmin && !isAuthenticated)) return null

  return (
    <div className={clsx(className)}>
      <div className="flex flex-row">
        <img className="rounded-full h-12 w-12 flex items-center justify-center mr-2" loading="lazy" src={user?.picture} alt="Own user avatar" />
        <TextareaAutosize
          ref={inputRef}
          className="w-full p-2 text-base border-b-2 outline-none"
          placeholder="Svar på kommentar"
        />
      </div>
      <div className="flex flex-row-reverse space-x-reverse space-x-2">
        <Button className="text-sm sm:text-base" underline={false} disabled={submitting} onClick={createPost} content="Svar" />
        <Button className="text-sm sm:text-base" underline={false} onClick={toggleShowForm} content="Avbryt" />
      </div>
    </div>
  )
}

export default ChildPostForm
