import { FC, useContext, useEffect, useRef } from "react"
import TextareaAutosize from "react-autosize-textarea/lib"
import clsx, { ClassValue } from "clsx"

import Button from "../Button"
import { AuthContext } from "../../AuthContext"
import { useCreateChildPost, useWhoami } from "../../api/requests"
import { useIsAdmin } from "../../hooks/useIsAdmin"
import { ParentPost } from "../../api"



type ChildPostFormProps = {
  showChildPostForm: boolean
  toggleShowForm: () => void
  door: number
  parent: ParentPost
  className?: ClassValue
}

const ChildPostForm: FC<ChildPostFormProps> = ({ showChildPostForm, toggleShowForm, door, parent, className }) => {
  const { data: whoami } = useWhoami()
  const { isFullyAuthenticated } = useContext(AuthContext)
  const { mutate: createChildPost, isLoading } = useCreateChildPost()
  const isAdmin = useIsAdmin()

  const inputRef = useRef<HTMLTextAreaElement>(null)

  const createPost = async () => {
    if (!inputRef.current) return

    createChildPost({ door, parentUuid: parent.uuid, content: inputRef.current.value }, { onSuccess: toggleShowForm })
  }

  // Focus textarea on every render. Should in practice only happen once, when
  // the form is first shown.
  useEffect(() => {
    inputRef.current?.focus()
  })

  // Prevent admins from accidentially submitting posts without being logged in.
  if (!showChildPostForm || (isAdmin && !isFullyAuthenticated)) return null

  return (
    <div className={clsx(className)}>
      <div className="flex flex-row">
        <img className="rounded-full h-12 w-12 flex items-center justify-center mr-2" loading="lazy" src={whoami?.picture} alt="Own user avatar" />
        <TextareaAutosize
          ref={inputRef}
          className="w-full p-2 text-base border-b-2 outline-none"
          placeholder="Svar på kommentar"
        />
      </div>
      <div className="flex flex-row-reverse space-x-reverse space-x-2">
        <Button className="text-sm sm:text-base" underline={false} disabled={isLoading} onClick={createPost} content="Svar" />
        <Button className="text-sm sm:text-base" underline={false} onClick={toggleShowForm} content="Avbryt" />
      </div>
    </div>
  )
}

export default ChildPostForm
