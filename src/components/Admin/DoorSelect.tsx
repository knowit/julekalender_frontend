import { compact, map, sortBy, values } from "lodash"
import { VFC } from "react"

import { useChallenges } from "../../api/admin/requests"


type DoorSelectProps = {
  door: number
  setDoor: (door: number) => void
}

const DoorSelect: VFC<DoorSelectProps> = ({ door, setDoor }) => {
  const { data: challenges } = useChallenges()

  if (!challenges) return null

  return (
    <label className="block space-x-4">
      <select className="form-select" defaultValue={door} onChange={((e) => setDoor(parseInt(e.target.value)))}>
        {map(sortBy(compact(values(challenges)), "door"), ({ door, title }, i) =>
          <option key={i} value={door} label={`Luke ${door}: ${title}`} />
        )}
      </select>
    </label>
  )
}

export default DoorSelect
