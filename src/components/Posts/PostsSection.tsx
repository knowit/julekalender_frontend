import { FC, useCallback, useEffect, useState } from "react"
import { find, map, reject, sortBy } from "lodash"

import useRequestsAndAuth from "../../hooks/useRequestsAndAuth"
import { Post as PostType, ParentPost } from "../../api/Post"
import Like from "../../api/Like"
import Button from "../Button"
import useBoolean from "../../hooks/useBoolean"

import Post from "./Post"
import PostForm from "./PostForm"


type PostsSectionProps = {
  doorNumber: string
}

const PostsSection: FC<PostsSectionProps> = ({ doorNumber }) => {
  const { isAuthenticated, isAdmin, fetchPosts, fetchSinglePost, fetchLikes, deletePost: deletePostRequest } = useRequestsAndAuth()
  const [posts, setPosts] = useState<ParentPost[]>([])
  const [likes, setLikes] = useState<Like[]>([])
  // const [postsWithLikes, setPostsWithLikes] = useState<(ParentPost & { liked: boolean })[]>([])
  const [isFormVisible, showForm, hideForm] = useBoolean(true)

  useEffect(() => {
    if (!isAuthenticated && !isAdmin) return

    console.log({ isAdmin, isAuthenticated, fetchPosts, doorNumber, fetchLikes })

    fetchPosts(doorNumber)
      .then((response) => setPosts(response.data))
      .catch(() => { /* ... something ... */ })
    fetchLikes()
      .then((response) => setLikes(response.data))
      .catch(() => { /* ... something ... */ })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!isAuthenticated && !isAdmin, fetchPosts, doorNumber, fetchLikes])

  // Refresh an entire post chain from the backend. Use this when updating a
  // post to easily get the post tree into the correct state.
  // This is much easier than wrangling all of that state on the client.
  const refreshPost = useCallback(async (post: ParentPost) => {
    const { status, data } = await fetchSinglePost(doorNumber, post.uuid)

    if (status === 404) {
      // Post has been fully deleted or is otherwise nonexistent. Remove it from list.
      setPosts((posts) => reject(posts, { uuid: post.uuid }))
    } else if (status === 200) {
      // Post has been successfully refreshed. Replace it in the posts list.
      setPosts((posts) => {
        const filteredPosts = reject(posts, { uuid: post.uuid })
        return sortBy([...filteredPosts, data], "created_at")
      })
    }
  }, [doorNumber, fetchSinglePost, setPosts])

  return (
    <section className="mx-2 md:mx-8 lg:w-4/5 lg:mx-auto space-y-door-elements">
      {isFormVisible
        ? <PostForm doorNumber={doorNumber} setPosts={setPosts} hideForm={hideForm} />
        : (
          <div className="bg-gray-100 text-gray-700 rounded-md mx-auto mb-16 px-8 py-4 w-96 space-y-4 flex flex-col justify-center">
            <div className="text-center">Du finner kommentaren din nederst!</div>
            <Button onClick={showForm} content="Legg igjen ny kommentar?" />
          </div>
        )
      }
      <div className="space-y-4">
        {map(posts, (post) =>
          <Post
            key={post.uuid}
            doorNumber={doorNumber}
            post={post}
            myLikes={likes}
            refreshPost={refreshPost}
          />
        )}
      </div>
    </section>
  )
}

export default PostsSection
