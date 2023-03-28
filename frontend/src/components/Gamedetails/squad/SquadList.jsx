import { Button, Paper } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { getAllSquads } from "../../../api/squad"
import UserProvider, { useUser } from "../../../context/UserContext"
import { storageRead } from "../../../utils/storage"
import { SquadItem } from "./SquadItem"

export const SquadList = () => {
  const gameId = storageRead('gameId')
  const { user } = useUser()

  const { isError, isLoading, data, error } = useQuery(
    { queryKey: ['squadlist', gameId],
    queryFn: () => getAllSquads(gameId),
    staleTime: 10000
  })

  return (
    <Paper sx={{ paddingBlock: 3, maxWidth: 1, backgroundColor: '#e9e3d6a3'}}>
      <h5>Squads: </h5>
      <ul className="list-group square list-group-flush">
        {data && data.map((squad, index) => {
          if (squad.isHuman == user.isHuman)
            return (<SquadItem
              key={index}
              squad={squad}
              gameId={gameId}
              />)
        })
      }
      </ul>
    </Paper>
  )
}
