import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet'
import { iconGraveStone } from '../../icons/gravestoneIcon'
import L from 'leaflet'
import { iconPlayer } from '../../icons/playericon'
import { useUser } from '../../context/UserContext'
import { iconZombie } from '../../icons/zombieicon'

const Map = ({coordinates, bites, checkins}) => {
  const latlngs = coordinates.map((coordinate) => [coordinate.latitude, coordinate.longitude])
  const { user } = useUser()
  const playerIcon = user.isHuman ? iconPlayer : iconZombie

  return (
    <MapContainer center={L.latLngBounds(latlngs).getCenter()} zoom={15} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {bites && bites.map((e, i) =>
       <Marker icon={ iconGraveStone }
          key={i}
          position={[e.latitude, e.longitude]}>
        <Popup>
          <h6>description: {e.story}</h6>
          <p>Victim id: {e.victimId}</p>
          <p>Killed id: {e.biterId}</p>
        </Popup>
        </Marker>)}
        {checkins && checkins.map((e, i) =>
          <Marker icon={ playerIcon }
          key={i}
          position={[e.latitude, e.longitude]}
        >
        <Popup>
          <h6>Checked in {e.story}</h6>
        </Popup>
      </Marker>)}
      <Polygon positions={latlngs}></Polygon>

    </MapContainer>
  )
}

export default Map
