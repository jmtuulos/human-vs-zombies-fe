import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet'
import { iconGraveStone } from '../../icons/gravestoneIcon'
import L from 'leaflet'
import { iconPlayer } from '../../icons/playericon'
import { useUser } from '../../context/UserContext'
import { iconZombie } from '../../icons/zombieicon'
import { iconMission } from '../../icons/mission'

const Map = ({coordinates, bites, checkins, missions}) => {
  const { user } = useUser()
  let filteredMissions = []
  // filter out missions that should not be visible to the user and
  // missions that do not have a location
  if (missions)
    filteredMissions = missions.filter((mission) =>
    mission.latitude &&
    mission.longitude &&
    mission.isHumanVisible == user.isHuman)

  const latlngs = coordinates.map((coordinate) => [coordinate.latitude, coordinate.longitude])
  const playerIcon = user.isHuman ? iconPlayer : iconZombie

  return (
    <MapContainer center={L.latLngBounds(latlngs).getCenter()} zoom={15} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {bites && bites.map((e, i) =>
        <Marker icon={iconGraveStone}
          key={i}
          position={[e.latitude, e.longitude]}>
          <Popup>
            <h6>description: {e.story}</h6>
            <p>Victim id: {e.victimId}</p>
            <p>Killed id: {e.biterId}</p>
          </Popup>
        </Marker>)}
      {checkins && checkins.map((e, i) =>
        <Marker icon={playerIcon}
          key={i}
          position={[e.latitude, e.longitude]}
        >
          <Popup>
            <h6>Checked in {e.story}</h6>
          </Popup>
        </Marker>)}
      {filteredMissions && filteredMissions.map((e, i) =>
        <Marker icon={iconMission}
          key={i}
          position={[e.latitude, e.longitude]}
        >
          <Popup>
            <h6>mission: {e.description}</h6>
            <h6>start: {e.startTime}</h6>
            <h6>end: {e.endTime}</h6>
          </Popup>
        </Marker>)}
      <Polygon positions={latlngs}></Polygon>
    </MapContainer>
  )
}

export default Map
