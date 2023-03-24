import { useQueries, useQuery } from "@tanstack/react-query";
import { getAllBites } from "../../api/bite";
import { getGame } from "../../api/game";
import { getAllMissions } from "../../api/mission";
import { getSquadCheckIns } from "../../api/squad";
import { useUser } from "../../context/UserContext";
import { storageRead } from "../../utils/storage";
import Map from "./Map";

export const GameDetail = ({gameId}) => {

  const { user } = useUser()

  const [game, bites, checkIns, missions] = useQueries({
    queries: [
      { queryKey: ['getgame'], queryFn: () => getGame(gameId), staleTime: 1000,},
      { queryKey: ['getbites'], queryFn: () => getAllBites(gameId), staleTime: 1000,},
      { queryKey: ['getcheckins'], queryFn: () => getSquadCheckIns(user.squadId), staleTime: 1000},
      { queryKey: ['getmissionmarkers'], queryFn: () => getAllMissions(), staleTime: 1000,},
    ],
  })

  return (
  <div className="row border">
    {game.data &&
    <>
      <div className="col-12">
        <h1>{game.data.name}</h1>
        <p>{game.data.description}</p>
        <div>
          <h3 className="text-muted">Rules</h3> Do not be overphysical and do not fight
        </div>
      </div>
      <div className="row pt-5 h-50 w-100 d-inline-block">
        <Map
        coordinates={game.data.mapCoordinates}
        bites={bites.data}
        checkins={checkIns.data}
        missions={missions.data}
        />
      </div>
    </>
    }
  </div>
  )
}
