import { Challenge } from "../Challenge"


export type AdminChallenge = Challenge & {
  markdown_content: string
}

export type AdminChallengePayload = Omit<AdminChallenge, "content" | "door">

export type ChallengePreview = {
  html: string
}
