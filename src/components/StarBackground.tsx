import { VFC } from "react"
import clsx from "clsx"


type StarBackgroundProps = {
  paused: boolean
}

const StarBackground: VFC<StarBackgroundProps> = ({ paused }) => {
  const animationClasses = clsx(
    "fixed",
    "h-screen",
    "w-screen",
    "before:fixed",
    "before:inset-0",
    "before:h-[calc(100vh*2)]",
    { paused }
  )

  return (
    <div className="absolute h-screen w-screen pointer-events-none overflow-hidden">
      <div
        className={clsx(
          animationClasses,
          "before:bg-stars-background",
          "z-[-300]",
          { "animate-stars-background": !paused }
        )}
      />
      <div
        className={clsx(
          animationClasses,
          "before:bg-stars-midground",
          "z-[-200]",
          { "animate-stars-midground": !paused }
        )}
      />
      <div
        className={clsx(
          animationClasses,
          "before:bg-stars-foreground",
          "z-[-100]",
          { "animate-stars-foreground": !paused }
        )}
      />
    </div>
  )
}

export default StarBackground
