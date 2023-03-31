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
import { useEffect } from "react"
import { getAllPlayersByUuid } from "../api/user"
import { getPlayer } from "../api/player"
import { useAppUser } from "../context/AppUserContext"
import { useNavigate } from "react-router-dom"
import keycloak from "../keycloak"

const GameDetails = () => {
  const navigate = useNavigate()
  const { user, setUser } = useUser()
  const { appUser } = useAppUser()
  const gameId = storageRead('gameId')
  const enableGameDetails = appUser && appUser.some((game) => game.gameId === gameId)

  useEffect(() => {
    const fetchUser = async () => {
      await getAllPlayersByUuid().then((data) => {
        return data.find(gameList => gameList.gameId == gameId)})
        .then(async (data) => {
          let currentPlayer = null
          if (data){
            currentPlayer = await getPlayer(data.playerId)
            setUser({...currentPlayer, playerId: data.playerId})
          }
        }).catch(
          (error) => {
            console.log(error)
          }
        )
      }
    if (!appUser)
      navigate("/")
    fetchUser()
  }, [])

  return (
    <div className="p-7">
      <div className="container p-3 my-3">
        <div className="row pt-5">
          <GameDetail gameId={gameId}/>
        </div>
        { enableGameDetails && user &&
          <>
            <div className="row pt-5">
              <MissionList gameId={gameId}/>
            </div>
            {user.isHuman === false && !keycloak.hasRealmRole('admin') &&
              <div className="row pt-5">
                <Paper sx={{paddingBlock: 3, maxWidth: 1, backgroundColor: '#e9e3d6f7'}}>
                  <h3>Bit a Human?</h3>
                  <BiteCodeForm gameId={gameId}/>
                </Paper>
              </div>}
            {user.isHuman === true && !keycloak.hasRealmRole('admin') &&
              <div className="row pt-5">
                <Paper sx={{paddingBlock: 3, maxWidth: 1, backgroundColor: '#e9e3d6f7'}}>
                  <h3>Your bite code: <p>{user.biteCode}</p></h3>
                </Paper>
              </div>}
            {user.squadId == null && !keycloak.hasRealmRole('admin') && <div className="row pt-5">
              <CreateSquadForm />
            </div>}
            <div className="row pt-5">
              {user.squadId != null && !keycloak.hasRealmRole('admin') &&
                <SquadDetails />}
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
