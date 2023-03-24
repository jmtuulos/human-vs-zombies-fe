import BiteCodeForm from "../components/Gamedetails/BiteCodeForm"
import ChatTabs from "../components/Gamedetails/Chat/ChatTabs"
import { GameDetail } from "../components/Gamedetails/GameDetail"
import { CreateSquadForm } from "../components/Gamedetails/squad/CreateSquad"
import { SquadList } from "../components/Gamedetails/squad/SquadList"
import { SquadDetails } from "../components/Gamedetails/squad/SquadDetails"
import { useUser } from "../context/UserContext"
import { storageRead } from "../utils/storage"
import { Paper } from "@mui/material"
import { MissionList } from "../components/Gamedetails/Mission/MissionList"

const GameDetails = () => {
  const { user } = useUser()
  const playerId = storageRead('userId') // Only needed for testing
  const gameId = storageRead('gameId')

  return (
    <div className="p-7">
      <div className="container p-3 my-3">
        <GameDetail gameId={gameId}/>
        { user !== null &&
          <>
            <div className="row pt-5">
                <MissionList gameId={gameId}/>
            </div>
            {user.isHuman === false &&
              <div className="row pt-5">
              <h3>Bit a Human?</h3>
              <BiteCodeForm />
              </div>}
            {user.isHuman === true &&
              <div className="row pt-5">
                <Paper sx={{paddingBlock: 3, maxWidth: 0.5}}><h3>Your bite code: <p>{user.biteCode}</p></h3></Paper>
              </div>}
            {user.squadId == null && <div className="row pt-5">
              <CreateSquadForm playerId={playerId}/>
            </div>}
            <div className="row pt-5">
              {user.squadId != null &&
                <SquadDetails playerId={playerId}/>}
            </div>
            {user.squadId == null && <div className="row pt-5">
              <SquadList/>
            </div>}
            <div className="row pt-5">
              <ChatTabs />
            </div>
          </>

        }

      </div>
    </div>

  )
}

export default GameDetails
