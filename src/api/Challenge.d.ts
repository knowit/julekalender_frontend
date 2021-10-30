export type Challenge = {
  door: number
  content: string
  author: string
  title: string
  answer: string
}

export type ChallengeDict = Record<number, Challenge | undefined>

export type SolvedStatus = {
  [key: number]: boolean
}

export type AdminChallenge = Challenge & {
  markdown_content: string
  id: string
}

export type ChallengePreview = {
  html: string
}
