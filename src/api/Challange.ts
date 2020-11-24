interface ForumPost {

}

interface Challenge {
    id: number,
    title: string,
    content: string,
    author: string,
    door: number,
    answer: string,
    forumPosts: ForumPost[]
}


export default Challenge