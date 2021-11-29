import { FC } from "react"

import LeaderBoardContent from "../components/LeaderboardContent"

import Page from "./Page"


const Leaderboard: FC = () => (
  <Page className="pt-12 pb-8 px-8 mx-4 overflow-y-hidden bg-leaderboard-green rounded-md text-center">
    <h1 className="text-3xl h-16">Snille barn</h1>
    <div className="h-[calc(100vh-20.5rem)] overflow-y-auto">
      <LeaderBoardContent />
    </div>
  </Page>
)

export default Leaderboard
