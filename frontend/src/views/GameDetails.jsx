import BiteCodeForm from "../components/Gamedetails/BiteCodeForm"
import ChatTabs from "../components/Gamedetails/Chat/ChatTabs"
import { GameDetail } from "../components/Gamedetails/GameDetail"
import Map from "../components/Gamedetails/Map"
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { CreateSquadForm } from "../components/Gamedetails/squad/CreateSquad"
import { SquadList } from "../components/Gamedetails/squad/SquadList"
import { SquadDetails } from "../components/Gamedetails/squad/SquadDetails"
import UserProvider, { useUser } from "../context/UserContext"
import GlobalChat from "../components/Gamedetails/Chat/GlobalChat"
import { Container } from "@mui/system"

const GameDetails = () => {
  const { user } = useUser()
  console.log("Gamedetails user: ", user)
  console.log("user is human", !user.isHuman)
  return (
    <div className="p-7">
      <div className="container p-3 my-3">
        <GameDetail/>
        {user.isHuman === false &&  <div className="row pt-5">
          <h3>Bit a Human?</h3>
          <BiteCodeForm />
        </div>}
        <div className="row pt-5 h-50 w-50 d-inline-block">
          <Map />
        </div>
        {user.squadId === -1 && <div className="row pt-5">
          <CreateSquadForm/>
        </div>}
        <div className="row pt-5">
          <SquadDetails/>
        </div>
        {user.squadId === -1 && <div className="row pt-5">
          <SquadList/>
        </div>}
        <div className="row pt-5">
          <ChatTabs />
       </div>
      </div>
    </div>

  )
}

export default GameDetails
