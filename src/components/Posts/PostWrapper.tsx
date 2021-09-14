import { FC } from "react"
import clsx, { ClassValue } from "clsx"
import { useLocation } from "react-router"

import { Post } from "../../api/Post"
import useIsOwnPost from "../../hooks/useIsOwnPost"
import { getTimeStamp } from "../../utils"
import Button from "../Button"


type PostWrapperProps = {
  post: Post
  deletePost: () => void

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
  className,
  wrapperClassName,
  contentClassName,
  proseClassName,
  children
}) => {
  const timestamp = getTimeStamp(post.created_at)
  const isOwnPost = useIsOwnPost(post)

  const { hash } = useLocation()
  const isDeepLinkedPost = hash === `#${post.uuid}`
  return (
    <article
      id={post.uuid}
      ref={(element) => isDeepLinkedPost && element?.scrollIntoView({ behavior: "smooth" })}
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
            {!post.deleted && isOwnPost && (
              <Button
                className="font-semibold sm:text-base"
                underline={false}
                onClick={deletePost}
                content="Slett innlegg"
              />
            )}
          </div>
          {!post.deleted && (
            <div
              className={clsx(
                "prose prose-sm md:prose max-w-none md:max-w-none break-words my-4 md:my-8",
                proseClassName
              )}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
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
