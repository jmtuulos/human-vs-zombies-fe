import { useQueries, useQuery } from "@tanstack/react-query";
import { getAllBites } from "../../api/bite";
import { getGame } from "../../api/game";
import { getSquadCheckIns } from "../../api/squad";
import { useUser } from "../../context/UserContext";
import { storageRead } from "../../utils/storage";
import Map from "./Map";

export const GameDetail = () => {

  const gameId = storageRead("gameId")
  const { user } = useUser()

  const [game, bites, checkIns] = useQueries({
    queries: [
      { queryKey: ['getgame', gameId], queryFn: () => getGame(gameId), staleTime: 10000},
      { queryKey: ['getbites', gameId], queryFn: () => getAllBites(gameId), staleTime: 10000},
      { queryKey: ['getcheckins'], queryFn: () => getSquadCheckIns(user.squadId), staleTime: 10000}
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
        />
      </div>
    </>
    }
  </div>
  )
}
