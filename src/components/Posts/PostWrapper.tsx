import { FC, useState, useEffect, useRef, useCallback } from "react"
import clsx, { ClassValue } from "clsx"
import { useLocation } from "react-router"
import TextareaAutosize from "react-autosize-textarea/lib"

import { Post } from "../../api/Post"
import useIsOwnPost from "../../hooks/useIsOwnPost"
import { getTimestamp } from "../../utils"
import Button from "../Button"
import { useDeletePost, usePostMarkdown, usePrefetchPostMarkdown, useRefreshCsrfToken, useUpdatePost } from "../../api/requests"
import usePostPreviewState from "../../hooks/usePostPreviewState"

import PostProse from "./PostProse"
import PostPreview from "./PostPreview"


type PostWrapperProps = {
  post: Post
  deleteConfirmText: string

  // classes passed on to children, intuitive at call site
  className?: ClassValue

  // classes for overriding style of post sections mostly to allow different
  // styling of child posts
  wrapperClassName?: ClassValue
  contentClassName?: ClassValue
  proseClassName?: ClassValue
}

const PostWrapper: FC<PostWrapperProps> = ({
  post,
  deleteConfirmText,
  className,
  wrapperClassName,
  contentClassName,
  proseClassName,
  children
}) => {
  useRefreshCsrfToken()

  const timestamp = getTimestamp(post.created_at)
  const isOwnPost = useIsOwnPost(post)

  const [isEditing, setIsEditing] = useState(false)
  const { data: markdown, isLoading: isMarkdownLoading } = usePostMarkdown(post.uuid, { enabled: isEditing })
  const prefetchMarkdown = usePrefetchPostMarkdown()

  const editFieldRef = useRef<HTMLTextAreaElement>(null)
  const [preview, previewHtml, previewLoading, togglePreview, updatePreviewContent] = usePostPreviewState(editFieldRef)

  const { mutate: doUpdatePost, isLoading: isPostUpdating } = useUpdatePost()
  const { mutate: doDeletePost } = useDeletePost()

  const deletePost = useCallback(async () => {
    if (!window.confirm(deleteConfirmText)) return

    doDeletePost({ post })
  }, [deleteConfirmText, doDeletePost, post])

  const toggleEditing = useCallback(() => {
    setIsEditing((state) => !state)
  }, [setIsEditing])

  const { hash } = useLocation()
  const isDeepLinkedPost = hash === `#${post.uuid}`
  const scrollRef = useRef<HTMLElement>(null)

  // Scroll to deep linked post on mount
  useEffect(() => {
    if (!isDeepLinkedPost) return

    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  const updatePost = () => {
    if (!editFieldRef.current) return

    doUpdatePost({ post, content: editFieldRef.current.value, html: previewHtml })
    setIsEditing(false)
    togglePreview()
  }

  // TODO: Replace classname overrides with isChild
  return (
    <article
      id={post.uuid}
      ref={scrollRef}
      className={clsx(
        "relative rounded-md bg-gray-100 text-gray-700 py-4 px-2 md:px-4",
        isDeepLinkedPost && "ring-inset ring-4 ring-lightbulb-yellow",
        wrapperClassName
      )}
    >
      {!post.deleted && (
        <div className="absolute w-4 sm:w-8 lg:w-10 xl:w-avatar">
          <img
            className="rounded-full w-full flex items-center justify-center"
            src={post.author.avatar ?? ""} // TODO: Placeholder avatar
            alt="User avatar"
          />
        </div>
      )}
      <div className={clsx("mx-4 sm:mx-8 lg:mx-10 xl:mx-avatar", contentClassName)}>
        <div className="relative px-1 sm:px-2 md:px-4">
          <div className="font-semibold text-xl">
            {!post.deleted && post.author.username}
          </div>

          <div className="absolute top-0 right-0 flex flex-row-reverse space-x-reverse space-x-4">
            <time className="text-sm sm:text-base">{timestamp}</time>
            {!post.deleted && isOwnPost && !isEditing && (
              <div className="space-x-4 mt-[-2px]">
                <Button sm onClick={toggleEditing} onMouseEnter={() => prefetchMarkdown(post.uuid)}>Rediger</Button>
                <Button sm onClick={deletePost}>Slett</Button>
              </div>
            )}
          </div>

          {isEditing && !isMarkdownLoading && (
            <div className="space-y-2 my-4">
              {preview && (
                <PostPreview
                  html={previewHtml}
                  isLoading={previewLoading}
                  className="w-full min-h-[5rem] p-2 rounded-t border-b-2 border-gray-700 bg-gray-200"
                />
              )}

              <TextareaAutosize
                autoFocus
                ref={editFieldRef}
                className={clsx(
                  "block w-full min-h-[5rem] p-2 text-sm md:text-base outline-none rounded-t bg-gray-200 border-b-2 border-gray-700",
                  preview && "hidden"
                )}
                defaultValue={markdown}
              />

              <div className="flex justify-between">
                <Button sm underline={false} onClick={() => setIsEditing(false)} content="Avbryt" />

                <div className="space-x-4">
                  <Button sm underline={false} disabled={isPostUpdating} onClick={togglePreview} onMouseEnter={updatePreviewContent} content={preview ? "Rediger" : "Forhåndsvis"} />
                  <Button sm underline={false} disabled={isPostUpdating} onClick={updatePost} content="Lagre" />
                </div>
              </div>
            </div>
          )}

          {!isEditing && !post.deleted && (
            <PostProse html={post.content} className="my-4 md:my-8" />
          )}

          <div className={clsx(className)}>
            {children}
          </div>
        </div>
      </div>
    </article>
  )
}

export default PostWrapper
