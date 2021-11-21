import { FC, useContext, useRef } from "react"
import TextareaAutosize from "react-autosize-textarea/lib"
import clsx from "clsx"

import Button from "../Button"
import { squish } from "../../utils"
import { useCreatePost } from "../../api/requests"
import { AuthContext } from "../../AuthContext"
import { useIsAdmin } from "../../hooks/useIsAdmin"
import usePostPreviewState from "../../hooks/usePostPreviewState"

import PostPreview from "./PostPreview"


const FORM_PLACEHOLDER = squish(`
  Legg igjen en kommentar! Vi har støtte for markdown med
  syntax highlighting. Alle blokk-elementer (kode, lister,
  tabeller, etc.) krever en hel linje whitespace rundt seg.
`)

type PostFormProps = {
  door: number
  hideForm: () => void
}

const PostForm: FC<PostFormProps> = ({ door, hideForm }) => {
  const { mutate: doCreatePost, isLoading } = useCreatePost()
  const { isAuthenticated } = useContext(AuthContext)

  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [preview, previewHtml, previewLoading, togglePreview, updatePreviewContent] = usePostPreviewState(inputRef)

  const isAdmin = useIsAdmin()

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
  if (isAdmin && !isAuthenticated) return null

  return (
    <div className="bg-gray-100 text-gray-700 rounded-md px-4 pt-4 pb-2 flex flex-col items-end">
      {preview && (
        <PostPreview
          html={previewHtml}
          isLoading={previewLoading}
          className="w-full min-h-[5rem] pb-2 rounded-b-none border-b-2 border-gray-700"
        />
      )}

      {/* If this element is unmounted, we must restore the current value. Easier to just hide. */}
      <TextareaAutosize
        className={clsx(
          "block w-full h-20 p-0 pb-2 outline-none bg-transparent border-b-2 border-gray-700",
          preview && "hidden"
        )}
        ref={inputRef}
        placeholder={FORM_PLACEHOLDER}
      />

      <div>
        <Button
          className="font-medium"
          underline={false}
          disabled={isLoading}
          onClick={togglePreview}
          onMouseEnter={updatePreviewContent}
          content={preview ? "Rediger" : "Forhåndsvis"}
        />
        <Button
          className="bg-none border-none cursor-pointer ml-4 p-4 font-medium uppercase"
          underline={false}
          disabled={isLoading}
          onClick={createPost}
          value="Lagre"
          content="Kommenter"
        />
      </div>
    </div>
  )
}

export default PostForm
