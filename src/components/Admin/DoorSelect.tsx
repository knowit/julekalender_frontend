import { map, range } from "lodash"
import { VFC } from "react"


type DoorSelectProps = {
  door: number
  setDoor: (door: number) => void
}

const DoorSelect: VFC<DoorSelectProps> = ({ door, setDoor }) => (
  <label className="block space-y-1">
    <span>Luke</span>
    <select className="block form-select" defaultValue={door} onChange={((e) => setDoor(parseInt(e.target.value)))}>
      {map(range(1, 25), (door, i) =>
        <option key={i} value={door}>
          {door}
        </option>
      )}
    </select>
  </label>
)

export default DoorSelect
