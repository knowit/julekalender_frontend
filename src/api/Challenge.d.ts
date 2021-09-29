export type Challenge = {
  door: number
  content: string
  markdown_content: string
  author: string
  title: string
  answer: string
}

export type ChallengeDict = Record<number, Challenge | undefined>

export type SolvedStatus = {
  [key: number]: boolean
}
