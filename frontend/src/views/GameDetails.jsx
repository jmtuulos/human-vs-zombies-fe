import BiteCodeForm from "../components/Gamedetails/BiteCodeForm"
import ChatTabs from "../components/Gamedetails/Chat/ChatTabs"
import { GameDetail } from "../components/Gamedetails/GameDetail"
import Map from "../components/Gamedetails/Map"
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

const GameDetails = () => {
  return (
    <div className="p-7">
      <div className="container p-3 my-3">
        <GameDetail/>
        <div className="row pt-5">
          <h3>Bit a Human?</h3>
          <BiteCodeForm />
        </div>
        <div>
          <ChatTabs />
        </div>



        <div className="card h-50 w-50 d-inline-block">
          <Map />
        </div>




      </div>

    </div>

  )
}

export default GameDetails
