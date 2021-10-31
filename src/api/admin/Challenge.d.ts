import { Challenge } from "../Challenge"


export type AdminChallenge = Omit<Challenge, "content"> & {
  active_from?: string
  active_to?: string
  content?: string
  markdown_content: string
}
export type AdminChallengeDict = Record<number, AdminChallenge & { content: string } | undefined>

export type AdminChallengePayload = Omit<AdminChallenge, "content">

export type ChallengePreview = {
  html: string
}
