import clsx from "clsx"
import { VFC } from "react"


type BackgroundPauseButtonProps = {
  paused: boolean
  onTogglePaused: () => void
}

const BackgroundPauseButton: VFC<BackgroundPauseButtonProps> = ({ paused, onTogglePaused }) => (
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
        onClick={onTogglePaused} // Also triggered by click to surrounding label
        readOnly
      />
    Stopp bakgrunnsanimasjon
  </label>
)

export default BackgroundPauseButton
