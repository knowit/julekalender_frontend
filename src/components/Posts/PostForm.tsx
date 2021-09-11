import { Dispatch, FC, SetStateAction, useRef, useState } from "react"
import TextareaAutosize from "react-autosize-textarea/lib"

import useRequestsAndAuth from "../../hooks/useRequestsAndAuth"
import { ParentPost } from "../../api/Post"
import { squish } from "../../utils"


const FORM_PLACEHOLDER = squish(`
  Legg igjen en kommentar! Vi har støtte for markdown med
  syntax highlighting. Alle blokk-elementer (kode, lister,
  tabeller, etc.) krever en hel linje whitespace rundt seg.
`)

// husk å inkludere språk i kodeblokkene dine om du vil være
// sikker på ordentlig highlighting!


type PostFormProps = {
  doorNumber: string
  setPosts: Dispatch<SetStateAction<ParentPost[]>>
  hideForm: () => void
}

const PostForm: FC<PostFormProps> = ({ doorNumber, setPosts, hideForm }) => {
  const { isAuthenticated, isAdmin, createPost: createPostRequest } = useRequestsAndAuth()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [submitting, setSubmitting] = useState(false)

  const createPost = async () => {
    if (!inputRef.current) return

    setSubmitting(true)
    const { status, data } = await createPostRequest(doorNumber, inputRef.current.value)

    if (status === 200) {
      setPosts((posts) => [...posts, data])
      hideForm()
    }

    setSubmitting(false)
  }

  // Prevent admins from accidentially submitting posts without being logged in.
  if (isAdmin && !isAuthenticated) return null

  return (
    <div className="bg-gray-100 text-gray-700 rounded-md px-4 pt-4 pb-2 flex flex-col items-end">
      <TextareaAutosize
        className="block w-full h-20 p-0 outline-none bg-transparent border-b-2 border-gray-700"
        ref={inputRef}
        placeholder={FORM_PLACEHOLDER}
      />
      <div>
        <button className="bg-none border-none cursor-pointer ml-4 p-4 font-medium" disabled={submitting} onClick={createPost} value="Lagre">KOMMENTER</button>
      </div>
    </div>
  )
}

export default PostForm
