export type ServiceMessage = {
  uuid: string
  content: string
  created_at: string

  resolution_content: string | null
  resolved_at: string | null
  resolved: boolean

  door: number | null
}
