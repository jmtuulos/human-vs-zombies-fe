import { Button } from "@mui/material"
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
    <div className="card-body">
      <h5 className="card-title">Squads</h5>
      <ul className="list-group list-group-flush">
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
    </div>
  )
}
