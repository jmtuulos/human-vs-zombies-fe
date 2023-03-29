import { Paper } from "@mui/material";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAllBites } from "../../api/bite";
import { getGame } from "../../api/game";
import {  getFactionMissions } from "../../api/mission";
import { getPlayer } from "../../api/player";
import { getSquadCheckIns } from "../../api/squad";
import { getAllPlayersByUuid } from "../../api/user";
import { useAppUser } from "../../context/AppUserContext";
import { useUser } from "../../context/UserContext";
import { storageRead } from "../../utils/storage";
import { JoinGameButton } from "./JoinGame";
import Map from "./Map";

export const GameDetail = ({gameId}) => {

  const { user } = useUser()
  const { appUser } = useAppUser()

  const enableGameDetails = appUser.some((game) => game.gameId === gameId)
  const [game, bites, checkIns, missions] = useQueries({
    queries: [
      { queryKey: ['getgame'], queryFn: () => getGame(gameId), staleTime: 1000,},
      // { queryKey: ['getbites'], queryFn: () => getAllBites(gameId), staleTime: 1000, },
      // { queryKey: ['getcheckins'], queryFn: () => getSquadCheckIns(user.squadId), staleTime: 1000, enabled: !!user && !!user.squadId},
      // { queryKey: ['getmissionmarkers'], queryFn: () => getFactionMissions(), staleTime: 1000, enabled: enableGameDetails}

    ],
  })

  return (
  <Paper sx={{paddingBlock: 3, maxWidth: 1, backgroundColor: '#e9e3d6a3', borderRadius: 2}}>
    {game.data &&
    <>
      <div className="col-12 p-5">
        <h1>{game.data.name}</h1>
        <p>{game.data.description}</p>
        <div>
          <h3 className="text-muted">Rules</h3> Do not be overphysical and do not fight
        </div>
        {appUser != undefined && <div className="col-12 pt-3">
          <JoinGameButton />
        </div>}
      </div>
      <div className="p-2 h-50 w-100 d-inline-block">
        <Map
        />
      </div>
    </>
    }
  </Paper>
  )
}
