import { Challenge } from "../Challenge"

export type File = {
  signed_id: string
  filename: string
}

export type AdminChallenge = Omit<Challenge, "content"> & {
  active_from?: string
  active_to?: string
  content?: string
  markdown_content: string
  files: Array<File>
}
export type AdminChallengeDict = Record<number, AdminChallenge & { content: string } | undefined>

export type AdminChallengePayload = Omit<AdminChallenge, "content" | "files", "active_from", "active_to"> & {
  files: string[]
}

export type ChallengePreview = {
  html: string
}
