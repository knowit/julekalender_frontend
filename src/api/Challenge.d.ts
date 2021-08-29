export type Challenge = {
  door: number
  content: string
  author: string
  title: string
  answer: string
}

export type SolvedStatus = {
  [key: string]: boolean
}

export default Challenge
