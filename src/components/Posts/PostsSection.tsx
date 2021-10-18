import { FC } from "react"
import {  map } from "lodash"
import clsx from "clsx"
import { FaSort } from "react-icons/fa"

import Button from "../Button"
import useBoolean from "../../hooks/useBoolean"
import { usePosts } from "../../api/requests"

import Post from "./Post"
import PostForm from "./PostForm"



type PostsSectionProps = {
  door: number
}

const PostsSection: FC<PostsSectionProps> = ({ door }) => {
  const { data: posts } = usePosts(door)

  // const [postsWithLikes, setPostsWithLikes] = useState<(ParentPost & { liked: boolean })[]>([])
  const [isFormVisible, showForm, hideForm] = useBoolean(true)
  const getFilters = () => (
    /***
       *
       */
    <div className="flex align-middle text-gray-600 font-light text-center p-2 rounded-md sm:p-6 bg-gray-100">
      <span
        className={clsx(
          "hover:underline hover:cursor-pointer", "flex flex-row justify-center items-center",
          "uppercase text-sm sm:text-lg sm:"
        )}>
        <FaSort />
        Sorter etter dato

      </span>
      <span
        className={clsx(
          "hover:underline hover:cursor-pointer", "flex flex-row justify-center items-center",
          "uppercase mx-8 sm:tracking-wider text-sm sm:text-lg"
        )}>
        <FaSort />
        Sorter etter likerklikk
      </span>
    </div>
  )

  return (
    <section className="mx-2 md:mx-8 lg:w-4/5 lg:mx-auto space-y-door-elements">
      {isFormVisible
        ? <PostForm door={door} hideForm={hideForm} />
        : (
            <div className="bg-gray-100 text-gray-700 rounded-md mx-auto px-8 py-4 w-96 space-y-4 flex flex-col justify-center">
            <div className="text-center">Du finner kommentaren din nederst!</div>
            <Button onClick={showForm} content="Legg igjen ny kommentar?" />
          </div>
          )
      }
      <div className="space-y-4">
        {getFilters()}
        {map(posts, (post) =>
          <Post
            key={post.uuid}
            door={door}
            post={post}
          />
        )}
      </div>
    </section>
  )
}

export default PostsSection
