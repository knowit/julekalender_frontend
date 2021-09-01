import { useCallback, useState } from "react"
import clsx from "clsx"


const StarBackground  = () => {
  const [paused, setPaused] = useState(localStorage.getItem("stars-paused") === "true")

  const togglePaused = useCallback(() => {
    setPaused((state) => {
      localStorage.setItem("stars-paused", state ? "false" : "true")
      return !state
    })
  }, [setPaused])

  const animationClasses = clsx(
    "absolute",
    "h-screen",
    "w-screen",
    "before:absolute",
    "before:inset-0",
    "before:h-[200%]",
    { paused }
  )

  return <div className="absolute h-screen w-screen pointer-events-none overflow-hidden">
    <div
      className={clsx(
        animationClasses,
        "before:bg-stars-background",
        "before:z-[-300]",
        { "animate-stars-background": !paused }
      )}
    />
    <div
      className={clsx(
        animationClasses,
        "before:bg-stars-midground",
        "before:z-[-300]",
        { "animate-stars-midground": !paused }
      )}
    />
    <div
      className={clsx(
        animationClasses,
        "before:bg-stars-foreground",
        "before:z-[-300]",
        { "animate-stars-foreground": !paused }
      )}
    />
    <label
      title="Varm laptop? 🔥"
      className={clsx(
        "absolute",
        "bottom-0",
        "left-0",
        "p-1",
        "text-gray-500",
        "shadow",
        "text-xs",
        "pointer-events-auto",
        "cursor-pointer"
      )}
    >
      <input
        type="checkbox"
        className="mr-1 w-3 cursor-pointer"
        checked={paused}
        onClick={togglePaused} // Also triggered by click to surrounding label
        readOnly
      />
      Stopp bakgrunnsanimasjon
    </label>
  </div>
}

export default StarBackground
