import clsx, { ClassValue } from "clsx"
import { motion, useAnimation } from "framer-motion"
import { find } from "lodash"
import { FC, useState } from "react"
import { FaBellSlash, FaBell } from "react-icons/fa"
import { useDebounce } from "use-debounce"

import { ParentPost } from "../api"
import { useCreateSubscription, useDeleteSubscription, useSubscriptions } from "../api/requests"


type SubscribeButtonProps = {
  door?: number
  post?: ParentPost
  className?: ClassValue
}

const ANIMATION_DURATION = 700

const SubscribeButton: FC<SubscribeButtonProps> = ({ door, post, className }) => {
  const { data: subscriptions } = useSubscriptions()
  const { mutate: createSubscription } = useCreateSubscription()
  const { mutate: deleteSubscription } = useDeleteSubscription()

  const animationControl = useAnimation()
  const [animating, setAnimating] = useState(false)

  const subscription = find(subscriptions, door ? { door } : { postUuid: post?.uuid })
  const [debouncedSubscription] = useDebounce(subscription, ANIMATION_DURATION)

  if (!subscriptions) return null
  if (!door && !post) return null

  const subscribe = () => {
    if (door)
      createSubscription({ door })
    else if (post)
      createSubscription({ postUuid: post.uuid })
  }

  const unsubscribe = () => {
    if (subscription)
      deleteSubscription(subscription)
  }

  const onClick = () => {
    if (subscription)
      unsubscribe()
    else
      subscribe()

    setAnimating(true)
    animationControl.start({
      rotate: [-30, 20, -10, 7, -3, 0],
      transition: { ease: "easeIn", duration: ANIMATION_DURATION / 1000 }
    })

    setTimeout(() => setAnimating(false), ANIMATION_DURATION)
  }

  return (
    <motion.button
      className={clsx("text-gray-600 hover:text-gray-800", className)}
      title={
        subscription
          ? `Slutt å motta e-postvarsel om nye ${door ? "innlegg på denne luken" : "svar på dette innlegget"}`
          : `Motta varsel på e-post om nye ${door ? "innlegg på denne luken" : "svar på dette innlegget"}`
      }
      onClick={onClick}
      onMouseEnter={() => animationControl.start({ rotate: -10 })}
      onMouseLeave={() => !animating && animationControl.start({ rotate: 0 })}
    >
      <motion.div className="origin-top" animate={animationControl} >
        {debouncedSubscription ? <FaBellSlash /> : <FaBell />}
      </motion.div>
    </motion.button>
  )
}

export default SubscribeButton
