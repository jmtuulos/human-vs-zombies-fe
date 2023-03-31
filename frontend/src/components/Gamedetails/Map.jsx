import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet'
import { iconGraveStone } from '../../icons/gravestoneIcon'
import L from 'leaflet'
import { iconPlayer } from '../../icons/playericon'
import { useUser } from '../../context/UserContext'
import { iconZombie } from '../../icons/zombieicon'
import { iconMission } from '../../icons/mission'
import { useState } from 'react'
import { storageRead } from '../../utils/storage'
import { getMissions } from '../../api/mission'
import { useQueries } from '@tanstack/react-query'
import { getSquadCheckIns } from '../../api/squad'
import { getGame } from '../../api/game'
import { getAllBites } from '../../api/bite'

const Map = () => {
  const { user } = useUser()
  const [ latlngs, setLatlngs ] = useState()
  const [selectedMissions, setSelectedMissions] = useState(null)
  const [checkins, setCheckins] = useState()
  const gameId = storageRead('gameId')
  const [ biteList, setBites ] = useState()
  const gameCoord = storageRead('gameCoordinates')

  const [game, bites, checkIns, missions] = useQueries({
    queries: [
      { queryKey: ['getgame'], queryFn: () => getGame(gameId),
        onSuccess: (data) => {
          setLatlngs([data.mapCoordinates.map((coordinate) => [coordinate.latitude, coordinate.longitude])])
        }},
      { queryKey: ['getbites'], queryFn: () => getAllBites(gameId),
        onSuccess: (data) => {
          setBites(data)
        }},
      { queryKey: ['getcheckins'], queryFn: () => getSquadCheckIns(user.squadId), enabled: !!user && !!user.squadId,
        onSuccess: (data) => {
          setCheckins(data)
        }
        },
      { queryKey: ['getmissionmarkers'], queryFn: () => getMissions(gameId),
        onSuccess: (data) => {
          const filteredMissions = data.filter((mission) =>
            (mission.isHumanVisible === user.isHuman || (mission.isHumanVisible && mission.isZombieVisible)) &&
            mission.latitude &&
            mission.longitude
            )
          setSelectedMissions(filteredMissions)
      }
      }
    ],
  })

  const playerIcon = user && user.isHuman ? iconPlayer : iconZombie
  return (
    <>
    {game.data &&
    <MapContainer center={L.latLngBounds(gameCoord[gameId-1].map((coordinate) => [coordinate.latitude, coordinate.longitude])).getCenter()} zoom={15} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {bites.data && biteList && biteList.map((e, i) =>
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
      { selectedMissions && selectedMissions.map((e, i) => {
        return (
        <Marker icon={iconMission}
        key={i}
        position={[e.latitude, e.longitude]}
        >
          <Popup>
            <h6>mission: {e.description}</h6>
            <h6>start: {e.startTime}</h6>
            <h6>end: {e.endTime}</h6>
          </Popup>
        </Marker>)
      }
        )
        }
      {latlngs && <Polygon positions={latlngs}></Polygon>}
    </MapContainer>}
    </>
  )
}

export default Map
