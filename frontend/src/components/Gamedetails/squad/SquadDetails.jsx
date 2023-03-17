import { useQuery } from "@tanstack/react-query"
import { getSquad } from "../../../api/squad"

export const SquadDetails = () => {
  const squadId = 1 // TODO: get from database before rendering this component
  const gameId = 1 // TODO: get from clicked game
  const { isError, isLoading, data, error} = useQuery(
    { queryKey: ["squad"],
    queryFn: () => getSquad(squadId, gameId),
    staleTime: 10000 // the element is refetched every 10 seconds
  })

  return (
    <div>
      <h3>Your squad</h3> <p>{data && data.name}</p>
      {/* TODO <p>Members: {data && data.members}</p> */}
    </div>
  )
}
