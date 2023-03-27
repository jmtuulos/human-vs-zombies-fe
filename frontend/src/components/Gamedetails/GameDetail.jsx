import { useQueries, useQuery } from "@tanstack/react-query";
import { getAllBites } from "../../api/bite";
import { getGame } from "../../api/game";
import {  getFactionMissions } from "../../api/mission";
import { getSquadCheckIns } from "../../api/squad";
import { useAppUser } from "../../context/AppUserContext";
import { useUser } from "../../context/UserContext";
import { storageRead } from "../../utils/storage";
import { JoinGameButton } from "./JoinGame";
import Map from "./Map";

export const GameDetail = ({gameId}) => {

  const { user } = useUser()
  const { appUser } = useAppUser()

  console.log(appUser)

  const [game, bites, checkIns, missions] = useQueries({
    queries: [
      { queryKey: ['getgame'], queryFn: () => getGame(gameId), staleTime: 1000,},
      { queryKey: ['getbites'], queryFn: () => getAllBites(gameId), staleTime: 1000,},
      { queryKey: ['getcheckins'], queryFn: () => getSquadCheckIns(user.squadId), staleTime: 1000, enabled: !!user.squadId},
      { queryKey: ['getmissionmarkers'], queryFn: () => getFactionMissions(user.isHuman), staleTime: 1000,},
    ],
  })

  // const gameAvailableToJoin = () => {
  //   if (appUser){
  //     console.log(appUser)
  //     return appUser.some((game) => game.gameId === gameId) == false
  //   }
  //   return false
  // }

  return (
  <div className="row border">
    {game.data &&
    <>
      <div className="col-12 p-5">
        <h1>{game.data.name}</h1>
        <p>{game.data.description}</p>
        <div>
          <h3 className="text-muted">Rules</h3> Do not be overphysical and do not fight
        </div>
        {appUser && <div className="col-12 pt-3">
          <JoinGameButton />
        </div>}
      </div>
      <div className="pb-2 h-50 w-100 d-inline-block">
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
