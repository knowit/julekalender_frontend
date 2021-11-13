import { FC, useState, Fragment, useEffect, useRef } from "react"
import { Menu, Transition } from "@headlessui/react"
import { BiDotsHorizontalRounded } from "react-icons/bi"
import { BsTrash, BsPen } from "react-icons/bs"
import clsx, { ClassValue } from "clsx"
import { useLocation } from "react-router"
import TextareaAutosize from "react-autosize-textarea/lib"

import { Post } from "../../api/Post"
import useIsOwnPost from "../../hooks/useIsOwnPost"
import { getTimestamp } from "../../utils"
import Button from "../Button"
import { UpdatePostParameters } from "../../api/requests"


type PostWrapperProps = {
  post: Post
  deletePost: () => void
  updatePost: (data: UpdatePostParameters) => void
  markdown?: string
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
  deletePost,
  updatePost,
  markdown,
  className,
  wrapperClassName,
  contentClassName,
  proseClassName,
  children
}) => {
  const timestamp = getTimestamp(post.created_at)
  const isOwnPost = useIsOwnPost(post)
  const [isEditPostMode, setIsEditPostMode] = useState(false)
  const editFieldRef = useRef<HTMLTextAreaElement>(null)

  const toggleEditCommentMode = () => {
    setIsEditPostMode(!isEditPostMode)
  }

  const menuItemStyle = "group flex rounded-md items-center w-full px-2 py-2 text-sm"
  const Dropdown = () => (
    <div className="w-56 text-right">
      <Menu as="div" className=" inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-3 py-1 text-sm font-medium text-black ">
            <BiDotsHorizontalRounded
                className="w-5 h-5"
                aria-hidden="true"
              />
          </Menu.Button>
        </div>
        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <Button
                      className={clsx(active && "bg-gray-500 text-white", menuItemStyle)}
                      underline={false}
                      onClick={toggleEditCommentMode}
                    >
                    <BsPen
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />
                    Rediger
                  </Button>
                  )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Button
                      className={clsx(active && "bg-gray-500 text-white", menuItemStyle)}
                      underline={false}
                      onClick={deletePost}
                    >
                    <BsTrash
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />
                    Slett innlegg
                  </Button>
                  )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )

  const { hash } = useLocation()
  const isDeepLinkedPost = hash === `#${post.uuid}`
  const scrollRef = useRef<HTMLElement>(null)

  // Scroll to deep linked post on mount
  useEffect(() => {
    if (!isDeepLinkedPost) return

    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  const handleEditComment = () => {
    setIsEditPostMode(false)
    if (!editFieldRef.current) return

    updatePost({ content: editFieldRef.current.value, uuid: post.uuid })
  }

  // TODO: Replace classname overrides with isChild
  return (
    <article
      id={post.uuid}
      ref={scrollRef}
      className={clsx(`
        relative
        rounded-md
        bg-gray-100
        text-gray-700
        py-4
        px-2
        md:px-4
        `,
        isDeepLinkedPost && `
          ring-inset
          ring-4
          ring-lightbulb-yellow
        `,
        wrapperClassName
      )}
    >
      {!post.deleted && (
        <div className="absolute w-4 sm:w-8 lg:w-10 xl:w-avatar">
          <img
            className="rounded-full w-full flex items-center justify-center"
            src={post.author.picture}
            alt="User avatar"
          />
        </div>
      )}
      <div className={clsx("mx-4 sm:mx-8 lg:mx-10 xl:mx-avatar", contentClassName)}>
        <div className="relative px-1 sm:px-2 md:px-4">
          <div className="font-semibold text-xl">
            {!post.deleted && post.author.nickname}
          </div>
          <div className="absolute top-0 right-0 flex flex-row-reverse space-x-reverse space-x-4">
            <time className="text-sm sm:text-base">{timestamp}</time>
            {!post.deleted && isOwnPost && <Dropdown />}
          </div>
          {!post.deleted && (
            <div
              onBlur={handleEditComment}
              className={clsx(
                "prose prose-sm md:prose max-w-none md:max-w-none break-words my-4 md:my-8",
                proseClassName
              )}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}
          {isEditPostMode && (
            <>
              <TextareaAutosize
                ref={editFieldRef}
                className="w-full p-2 text-base border-b-2 outline-none"
                defaultValue={markdown}
              />
              <Button
                className="bg-green-600 text-white px-4 py-1 border-none cursor-pointer mb-4 font-medium"
                onClick={handleEditComment}
                content="Lagre"
              />
            </>
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
