import { FC } from "react"


type AnimationToggleProps = {
  backgroundPaused: boolean
  setBackgroundPaused: (state: boolean) => void
}

const AnimationToggle: FC<AnimationToggleProps> = ({ backgroundPaused, setBackgroundPaused }) => {
  const toggleBackground = () => {
    localStorage.setItem("bgPaused", String(!backgroundPaused))
    setBackgroundPaused(!backgroundPaused)
  }

  return (
    <div title="Varm laptop? 🔥" className="m-1 w-max">
      <input
        type="checkbox"
        id="animationToggle"
        className="mr-1 w-3 cursor-pointer"
        defaultChecked={backgroundPaused}
        onChange={toggleBackground} />
      <label className="text-gray-400 shadow text-xs cursor-pointer" htmlFor="animationToggle">Stopp bakgrunnsanimasjon</label>
    </div>
  )
}

export default AnimationToggle
