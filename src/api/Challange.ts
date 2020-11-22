interface ForumPost {

}

interface Challenge {
    id: number,
    title: string,
    markdown: string,
    author: string,
    door: 1,
    answer: string,
    forumPosts: ForumPost[]
}



export default Challenge