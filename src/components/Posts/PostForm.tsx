import { FC, useContext, useRef } from "react"
import TextareaAutosize from "react-autosize-textarea/lib"

import { squish } from "../../utils"
import { useCreatePost } from "../../api/requests"
import { AuthContext } from "../../AuthContext"
import { useIsAdmin } from "../../hooks/useIsAdmin"


const FORM_PLACEHOLDER = squish(`
  Legg igjen en kommentar! Vi har støtte for markdown med
  syntax highlighting. Alle blokk-elementer (kode, lister,
  tabeller, etc.) krever en hel linje whitespace rundt seg.
`)

// husk å inkludere språk i kodeblokkene dine om du vil være
// sikker på ordentlig highlighting!


type PostFormProps = {
  door: number
  hideForm: () => void
}

const PostForm: FC<PostFormProps> = ({ door, hideForm }) => {
  const { mutate: doCreatePost, isLoading } = useCreatePost()
  const { isFullyAuthenticated } = useContext(AuthContext)
  const isAdmin = useIsAdmin()
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const createPost = async () => {
    if (!inputRef.current) return

    doCreatePost(
      { door, content: inputRef.current.value },
      {
        onSuccess: ({ uuid }) => {
          hideForm()
          window.location.href = `#${uuid}`
        }
      }
    )
  }

  // Prevent admins from accidentially submitting posts without being logged in.
  if (isAdmin && !isFullyAuthenticated) return null

  return (
    <div className="bg-gray-100 text-gray-700 rounded-md px-4 pt-4 pb-2 flex flex-col items-end">
      <TextareaAutosize
        className="block w-full h-20 p-0 outline-none bg-transparent border-b-2 border-gray-700"
        ref={inputRef}
        placeholder={FORM_PLACEHOLDER}
      />
      <div>
        <button className="bg-none border-none cursor-pointer ml-4 p-4 font-medium" disabled={isLoading} onClick={createPost} value="Lagre">KOMMENTER</button>
      </div>
    </div>
  )
}

export default PostForm
