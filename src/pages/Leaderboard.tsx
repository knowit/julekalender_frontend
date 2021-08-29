import { FC } from "react"

import BackToDoorsButton from "../components/BackToDoorsButton"
import DoorBorder from "../components/Door/DoorBorder"
import LeaderBoardContent from "../components/LeaderboardContent"


const Leaderboard: FC = () => (
  <main className="max-w-kodekalender mx-auto mt-10">
    <BackToDoorsButton />
    <DoorBorder />
    <div className="pt-12 pb-8 px-8 mx-4 overflow-y-hidden bg-leaderboard-green rounded-md text-center">
      <h1 className="text-3xl h-16">Snille barn</h1>
      <div className="h-[calc(100vh-20.5rem)] overflow-y-auto">
        <LeaderBoardContent />
      </div>
    </div>
  </main>
)

export default Leaderboard
