import { Paper } from "@mui/material";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getGame } from "../../api/game";
import { useAppUser } from "../../context/AppUserContext";
import { JoinGameButton } from "./JoinGame";
import Map from "./Map";

export const GameDetail = ({gameId}) => {

  const { appUser } = useAppUser()

  const [game] = useQueries({
    queries: [
      { queryKey: ['getgame'], queryFn: () => getGame(gameId), staleTime: 1000,},
    ],
  })

  return (
  <Paper sx={{paddingBlock: 3, maxWidth: 1, backgroundColor: '#e9e3d6f7', borderRadius: 2}}>
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
