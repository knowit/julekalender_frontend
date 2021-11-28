type BaseWhoami = {
  uuid: string | null
  email: string | null
  username: string | null

  is_guest: boolean
  is_admin: boolean
  is_user: boolean

  avatar: string | null
}

export type GuestWhoami = BaseWhoami & {
  is_guest: true
  is_admin: false
  is_user: false

  uuid: null
  email: null
  username: null
  avatar: null
}

export type LoggedInWhoami = BaseWhoami & {
  is_guest: false
  is_admin: boolean
  is_user: true

  uuid: string
  email: string
  username: string | null
  avatar: string | null
}

export type Whoami = GuestWhoami | LoggedInWhoami
