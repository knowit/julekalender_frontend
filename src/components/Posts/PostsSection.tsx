import { FC } from "react"
import { map } from "lodash"

import { usePosts as useUserPosts } from "../../api/requests"

import Post from "./Post"
import PostForm from "./PostForm"


type PostsSectionProps = {
  door: number
  usePosts?: typeof useUserPosts
  withoutInput?: boolean
}

const PostsSection: FC<PostsSectionProps> = ({ door, usePosts = useUserPosts, withoutInput = false }) => {
  const { data: posts } = usePosts(door)

  if (!posts) return null

  return (
    <section className="mx-2 md:mx-8 lg:w-4/5 lg:mx-auto grid gap-door-elements justify-items-center">
      {!withoutInput && <PostForm door={door} />}

      {
        /*
        * Having min-w-0 (min-width: 0) prevents the content of the grid cells from growing outside of their cell:
        * https://stackoverflow.com/questions/43311943/prevent-content-from-expanding-grid-items
        */
      }
      <div className="space-y-4 w-full min-w-0">
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
