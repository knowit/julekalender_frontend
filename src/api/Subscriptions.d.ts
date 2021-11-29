type BaseSubscription = {
  uuid: string
}

type DoorSubscription = BaseSubscription & { door: number }
type PostSubscription = BaseSubscription & { postUuid: string }

export type Subscription = DoorSubscription | PostSubscription

export type Subscriptions = Array<Subscription>
