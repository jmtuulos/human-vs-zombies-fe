import { Button } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { getAllSquads } from "../../../api/squad"
import { SquadItem } from "./SquadItem"

export const SquadList = () => {
  const gameId = 1
  const { isError, isLoading, data, error } = useQuery(
    { queryKey: ['squadlist', gameId],
    queryFn: () => getAllSquads(gameId),
    staleTime: 10000
  })
  console.log(isError)
  console.log(isLoading)
  console.log(error)
  console.log(data)
  return (
    <div class="card-body">
      <h5 class="card-title">Squads</h5>
      <ul class="list-group list-group-flush">
        {data && data.map((squad) => <SquadItem squad={squad} gameId={gameId}/>)}
      </ul>
    </div>
  )
}
