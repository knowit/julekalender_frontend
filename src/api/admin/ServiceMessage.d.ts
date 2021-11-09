import { ServiceMessage } from "../ServiceMessage"


export type AdminServiceMessagePayload = Omit<ServiceMessage, "uuid" | "created_at"> & {
  created_at?: string
}
